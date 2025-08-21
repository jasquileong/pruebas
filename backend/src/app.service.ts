import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import OpenAI from 'openai';

@Injectable()
export class AppService {
  private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  constructor(
    @InjectRepository(Company)
    private companyRepo: Repository<Company>,
  ) {}

  async getCompany() {
    let company = await this.companyRepo.findOne({ where: { id: 1 } });
    if (!company) {
      company = this.companyRepo.create({
        id: 1,
        name: 'Automaite',
        tagline: 'AI-driven automation',
      });
      await this.companyRepo.save(company);
    }
    return company;
  }

  async chat(messages: { role: string; content: string }[]) {
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-5',
      messages: [
        {
          role: 'system',
          content: 'You are an expert assistant who provides helpful travel tips.',
        },
        ...messages,
      ],
    });
    return { reply: completion.choices[0].message.content };
  }
}

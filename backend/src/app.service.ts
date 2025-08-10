import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';

@Injectable()
export class AppService {
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
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Company } from './company.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'automaite.db',
      entities: [Company],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Company]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

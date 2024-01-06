import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from './entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>
  ) {}
  async create(createCompanyDto: CreateCompanyDto, email: string) {
    const company = await this.companyRepository.findOneBy({ user: email });
    if (!company) {
      const newCompany = this.companyRepository.create({
        ...createCompanyDto,
        user: email,
      });
      const saveCompany = await this.companyRepository.save(newCompany);
      return saveCompany;
    } else {
      const newCompany = { ...company, ...createCompanyDto };
      console.log({ newCompany });

      const updateCompany = await this.companyRepository.save(newCompany);
      return updateCompany;
    }
  }

  findAll() {
    return `This action returns all company`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }
  async findByEmail(email: string) {
    const company = await this.companyRepository.findOneBy({ user: email });
    return company;
  }
  async updateImage(file: Express.Multer.File, email: string) {
    console.log(file);
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return updateCompanyDto;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}

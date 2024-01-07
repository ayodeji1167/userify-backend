import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from './entities/company.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/shared/cloudinary/cloudinary.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>,
    private cloudinaryService: CloudinaryService
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
    const company = await this.findByEmail(email);

    if (!company) {
      throw new BadRequestException('Company does not exist');
    }

    const imageRes = await this.cloudinaryService.uploadSingleImage(
      file,
      'COMPANY/IMAGE'
    );
    const newCompany = { ...company, companyLogo: imageRes.url };
    const updateCompany = await this.companyRepository.save(newCompany);
    return updateCompany;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return updateCompanyDto;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}

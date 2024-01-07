import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { FirebaseGuard } from 'src/auth/guard/firebase.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageOptions } from 'src/shared/multer';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/auth/decorators/role.decorator';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(FirebaseGuard)
  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto, @Req() req) {
    return await this.companyService.create(createCompanyDto, req.user.email);
  }

  @UseGuards(FirebaseGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('update/image')
  @UseInterceptors(FileInterceptor('file', imageOptions))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('email') email: string
  ) {
    return await this.companyService.updateImage(file, email);
  }

  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':email')
  async findbyEmail(@Param('email') email: string) {
    return await this.companyService.findByEmail(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}

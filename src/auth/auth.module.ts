import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FirebaseGuard } from './guard/firebase.guard';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, FirebaseGuard],
  exports: [AuthService, FirebaseGuard],
})
export class AuthModule {}

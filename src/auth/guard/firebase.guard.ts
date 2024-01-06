import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class FirebaseGuard implements CanActivate {
  constructor(
    private firebaseService: AuthService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService
  ) {}

  private extractTokenFromHeader(request: any): string | null {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
      return authHeader.split(' ')[1];
    }
    return null;
  }
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      return false;
    }
    const user = await this.validateToken(token);
    if (!user) {
      return false;
    }
    const dbUser = await this.userService.findByEmail(user.email);

    request.user = { ...user, ...dbUser };
    return true;
  }

  async validateToken(token: string) {
    const decodedToken = await this.firebaseService.verifyToken(token);
    const user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
    };
    return user;
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  private firebaseAdmin: admin.app.App;

  constructor(private config: ConfigService) {
    const serviceAccount = config.get('firebase');
    this.firebaseAdmin = admin.initializeApp({
      credential: admin.credential.cert({
        privateKey: serviceAccount.private_key,
        clientEmail: serviceAccount.client_email,
        projectId: serviceAccount.project_id,
      }),
    });
  }
  async verifyToken(token: string): Promise<admin.auth.DecodedIdToken> {
    try {
      const decodedToken = await this.firebaseAdmin.auth().verifyIdToken(token);
      console.log('i am verified');
      return decodedToken;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}

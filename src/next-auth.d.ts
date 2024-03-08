import { DefaultSession } from 'next-auth';
import { UserEntity } from './domain/use-cases/auth/login.use-case';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken: string;
    user: UserEntity;
  }

  interface User extends UserEntity {
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    expiresAt: string;
    user: UserEntity;
  }
}

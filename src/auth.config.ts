import NextAuth, { type NextAuthConfig } from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
import { loginUseCase } from './domain/use-cases/auth/login.use-case';
import { loginSchema } from './presentation/schemas/login.schema';


export const authConfig: NextAuthConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ user, account, token, trigger }) {
      switch (trigger) {
        case 'signIn':
          if (!account) break;
          switch (account.type) {
           case 'credentials':
              token.user = token.user || user;
              token.accessToken = user.accessToken;
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }

      return token;
    },
    session({ session, token }: any) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.expires = token.expiresAt;
      return session;
    }
  },
  providers: [
    CredentialsProvider({
      name: 'Inicio de Sesión',
      credentials: {
        username: {
          label: 'Correo Electrónico o Teléfono',
          type: 'email',
          placeholder: 'Ingresa tu correo electrónico o teléfono',
          value: ''
        },
        password: {
          label: 'Contraseña',
          type: 'password',
          placeholder: '',
          value: ''
        },
      },
      async authorize(credentials) {
        const parsedCredentials = loginSchema.safeParse(credentials);
        if (!parsedCredentials.success) return null;
        const { email, password } = parsedCredentials.data;
        try {
          const { token,user  } = await loginUseCase(email, password);
          return {
            ...user,
            accessToken: token
          };
        } catch (error) {
          throw new Error("Invalid credentials" );
        }
      }
    })
  ]
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);

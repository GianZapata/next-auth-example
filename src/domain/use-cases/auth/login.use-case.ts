
export interface LoginResponse {
   id:       string;
   email:    string;
   fullName: string;
   isActive: boolean;
   roles:    string[];
   token:    string;
}

export interface UserEntity {
   id:       string;
   email:    string;
   fullName: string;
   isActive: boolean;
   roles:    string[];
}

export interface AuthResponse {
   user : UserEntity;
   token: string;
}

const url = 'http://localhost:3000/api/auth/login';

export const loginUseCase = async ( email: string, password: string ): Promise<AuthResponse> => {

   const response = await fetch(url, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         email,
         password,
      }),
   });

   if (response.ok) {
      const data = await response.json() as LoginResponse;
      console.log("🚀 ~ loginUseCase ~ data:", data)
      return {
         user: {
            id: data.id,
            email: data.email,
            fullName: data.fullName,
            isActive: data.isActive,
            roles: data.roles,
         },
         token: data.token,
      }
   }

   throw new Error('Invalid credentials');

}
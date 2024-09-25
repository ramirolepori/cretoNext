// actions.ts
'use server';

import { signIn } from '../../../auth';
import { AuthError } from 'next-auth';
import { AuthFormData, AuthErrorType } from '../lib/types';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
): Promise<string | null> {
  try {
    // Simulación del proceso de autenticación
    await signIn('credentials', formData);
    return null; // Retornar null si la autenticación es exitosa
  } catch (error) {
    if (error instanceof AuthError) {
      const authError: AuthErrorType = {
        type: error.type,
        message: 'Something went wrong.'
      };

      switch (error.type) {
        case 'CredentialsSignin':
          authError.message = 'Invalid credentials.';
          break;
        default:
          authError.message = 'Something went wrong.';
          break;
      }
      return authError.message; // Retornar mensaje de error específico
    }
    throw error;
  }
}

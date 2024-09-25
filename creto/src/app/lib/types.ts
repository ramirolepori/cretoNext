// types.ts
export interface AuthFormData {
  email: string;
  password: string;
}

export interface AuthErrorType {
  type: string;
  message: string;
}
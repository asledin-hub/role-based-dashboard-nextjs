export type Register = {
  id: number;
  fullName: string;
  email: string;
  password: string;
  confirm_password: string;
  role: string;
};
export type Login = {
  email: string;
  password: string;
  isVerified: boolean;
  role: string;
  forgetPasswordToken?: string;
  forgetPasswordTokenExpiry?: Date;
  verificationToken?: string;
  verificationTokenExpiry?: Date;
};

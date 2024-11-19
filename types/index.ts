// users type

export type User = {
  id: number;
  name: string;
  phone: string;
  role: string;
  email: string;
  password: string;
  confirmationPassword: string;
};

export type userRegister = {
  name: string;
  phone: string;
  email: string;
  password: string;
  parainCode: string;
};

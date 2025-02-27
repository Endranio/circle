import { UserEntity } from '@/entities/user-entitiy';

type User = UserEntity & {
  fullname: string;
};

export type RegisterDTO = Pick<User, 'fullname' | 'email' | 'password'>;
export type LoginDTO = Pick<User, 'email' | 'password'>;

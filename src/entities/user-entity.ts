import { ProfileEntity } from './profile-entity';

export interface UserEntity {
  id: string;
  email: string;
  username: string;
  password: string;
  profile?: ProfileEntity;
  followersCount: number;
  followingsCount: number;
  createdAt: string;
  updatedAt: string;
}

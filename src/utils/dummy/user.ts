interface User {
  email: string;
  password: string;
  fullname: string;
  username: string;
  followersCount: number;
  followingsCount: number;
  avatarUrl: string;
  background: string;
  bio: string;
}

export const userDatas: User[] = [
  {
    email: 'test@gmail.com',
    password: '123456',
    fullname: 'Endranio Palupi',
    username: 'endra',
    followersCount: 2000,
    followingsCount: 100,
    avatarUrl:
      'https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Endranio%20Palupi',
    background: 'https://api.dicebear.com/9.x/glass/svg?seed=Endranio%20Palupi',
    bio: "don't forget to touch the grass ",
  },
];

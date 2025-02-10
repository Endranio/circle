export const IsLogin = true;

interface userSession {
  fullname: string;
  username: string;
  followersCount: number;
  followingsCount: number;
  imageUrl: string;
  background: string;
}

export const userSession: userSession = {
  fullname: 'Endranio Palupi',
  username: '@endra',
  followersCount: 2000,
  followingsCount: 100,
  imageUrl:
    'https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Endranio%20Palupi',
  background: 'https://api.dicebear.com/9.x/glass/svg?seed=Endranio%20Palupi',
};

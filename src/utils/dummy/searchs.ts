import { SearchUser } from '@/features/search/type/search-user';

export const SearchUserDatas: SearchUser[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    email: 'luffy@onepiece.com',
    username: 'luffy_gear5',
    password: 'dummyPassword', // Karena wajib di UserEntity
    createdAt: '2025-02-28T10:00:00Z',
    updatedAt: '2025-02-28T10:00:00Z',
    profile: {
      id: '550e8400-e29b-41d4-a716',
      fullname: 'Monkey D. Luffy',
      avatarUrl:
        'https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Monkey%20D.%20Luffy',
      bannerUrl: null,
      bio: 'Pirate King',
      createdAt: '2025-02-28T10:00:00Z',
      updatedAt: '2025-02-28T10:00:00Z',
    },
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    email: 'zoro@onepiece.com',
    username: 'zoro_santoryu',
    password: 'dummyPassword',
    createdAt: '2025-02-28T10:00:00Z',
    updatedAt: '2025-02-28T10:00:00Z',
    profile: {
      id: '550e8400-e29b-41d4-a717',
      fullname: 'Roronoa Zoro',
      avatarUrl:
        'https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Roronoa%20Zoro',
      bannerUrl: null,
      bio: 'Future Greatest Swordsman',
      createdAt: '2025-02-28T10:00:00Z',
      updatedAt: '2025-02-28T10:00:00Z',
    },
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    email: 'nami@onepiece.com',
    username: 'nami_catburglar',
    password: 'dummyPassword',
    createdAt: '2025-02-28T10:00:00Z',
    updatedAt: '2025-02-28T10:00:00Z',
    profile: {
      id: '550e8400-e29b-41d4-a718',
      fullname: 'Nami',
      avatarUrl:
        'https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Nami',
      bannerUrl: null,
      bio: 'Navigator of the Straw Hats',
      createdAt: '2025-02-28T10:00:00Z',
      updatedAt: '2025-02-28T10:00:00Z',
    },
  },
];

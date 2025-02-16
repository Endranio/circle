import { InputGroup } from '@/components/ui/input-group';
import { Box, Image, Input } from '@chakra-ui/react';
import { SearchOutline } from '@/assets/icons/index';
import { SearchUserCard } from './search-user-card';
import { SearchUserDatas } from '@/utils/dummy/searchs';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { UserCardSkeleton } from '@/components/skeletons/user-card-skeleton';
import { SearchUser } from '../type/search-user';

export function SearchUsers() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');
  const [searchTextDebounce] = useDebounce(searchText, 1000);
  const [searchUserInterval, setSearchUserInterval] = useState<SearchUser[]>(
    []
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

  function getSearchUser() {
    setTimeout(() => {
      setSearchUserInterval(SearchUserDatas);
      setIsLoading(false);
    }, 3000);
  }

  useEffect(() => {
    getSearchUser();
  }, []);

  return (
    <Box>
      <InputGroup
        width={'100%'}
        startElement={<Image src={SearchOutline} width={'20px'} />}
      >
        <Input
          placeholder="Username"
          backgroundColor={'border'}
          borderRadius={'xl'}
          _focus={{ borderColor: 'brand.500' }}
          onChange={handleChange}
        />
      </InputGroup>

      {isLoading &&
        Array(SearchUserDatas.length)
          .fill(0)
          .map((_, index) => <UserCardSkeleton key={index} />)}

      {searchUserInterval
        .filter((SearchUserData) => {
          const searchQuery = searchTextDebounce.toLowerCase().trim();
          return (
            SearchUserData.fullname
              .toLowerCase()
              .trim()
              .includes(searchQuery) ||
            SearchUserData.username.toLowerCase().trim().includes(searchQuery)
          );
        })
        .map((SearchUserData) => (
          <SearchUserCard
            SearchUserData={SearchUserData}
            key={SearchUserData.id}
          />
        ))}
    </Box>
  );
}

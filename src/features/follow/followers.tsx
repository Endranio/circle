import { Tabs } from '@chakra-ui/react';

import { SearchUserDatas } from '@/utils/dummy/searchs';
import { Followers } from './follower-list';
import { Following } from './following-list';

export function Follow() {
  return (
    <Tabs.Root defaultValue="members">
      <Tabs.List display={'flex'}>
        <Tabs.Trigger
          flex={'1'}
          fontSize={'16px'}
          justifyContent={'center'}
          value="members"
        >
          Following
        </Tabs.Trigger>
        <Tabs.Trigger
          flex={'1'}
          fontSize={'16px'}
          justifyContent={'center'}
          value="projects"
        >
          Followers
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="members">
        {SearchUserDatas.map((SearchUserData) => (
          <Followers key={SearchUserData.id} SearchUserData={SearchUserData} />
        ))}
      </Tabs.Content>
      <Tabs.Content value="projects">
        {' '}
        {SearchUserDatas.map((SearchUserData) => (
          <Following key={SearchUserData.id} SearchUserData={SearchUserData} />
        ))}
      </Tabs.Content>
    </Tabs.Root>
  );
}

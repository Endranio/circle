import { api } from '@/libs/api';
import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { CardThread } from './card-thread';
import CreateThread from './create-thread';

export function Home() {
  const [threads, setThreads] = useState([]);

  async function getThreads() {
    const response = await api.get('/threads');
    setThreads(response.data);
  }
  useEffect(() => {
    getThreads();
  }, []);

  return (
    <Box>
      <CreateThread />
      <Box>
        {threads?.map((postData, index) => (
          <CardThread postData={postData} key={index} />
        ))}
      </Box>
    </Box>
  );
}

import { Box } from '@chakra-ui/react';

interface AppLayoutProps extends React.PropsWithChildren {
  width: string;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <Box>
      <LeftBar />
      {children}
      <RightBar />
    </Box>
  );
}

function LeftBar() {
  return <h1>Left</h1>;
}

function RightBar() {
  return <h1>Right</h1>;
}

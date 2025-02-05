import { Link, Tabs } from '@chakra-ui/react';
export function DashboardPage() {
  return (
    <div>
      <Tabs.Root defaultValue="members">
        <Tabs.List>
          <Tabs.Trigger value="members" asChild>
            <Link unstyled href="#members">
              Members
            </Link>
          </Tabs.Trigger>
          <Tabs.Trigger value="projects" asChild>
            <Link unstyled href="#projects">
              Projects
            </Link>
          </Tabs.Trigger>
          <Tabs.Trigger value="endrA" asChild>
            <Link unstyled href="#endrA">
              endrA
            </Link>
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="members">Manage your team members</Tabs.Content>
        <Tabs.Content value="projects">Manage your projects</Tabs.Content>
        <Tabs.Content value="endrA">Manage your oo</Tabs.Content>
      </Tabs.Root>
    </div>
  );
}

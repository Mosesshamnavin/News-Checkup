import {
  Calendar,
  Home,
  Inbox,
<<<<<<< HEAD
  Search,
  Settings,
  User2,
=======
  ListChecks,
  NewspaperIcon,
  User2,
  LogOutIcon,
  UserCircle,
>>>>>>> added
  ChevronUp,
} from 'lucide-react';
import React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from './components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu';

<<<<<<< HEAD
// Menu items.
const items = [
  {
    title: 'Home',
    url: '/test',
    icon: Home,
  },
  {
    title: 'Inbox',
    url: '#',
    icon: Inbox,
  },
  {
    title: 'Calendar',
    url: '#',
    icon: Calendar,
  },
  {
    title: 'Search',
    url: '#',
    icon: Search,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
=======
const items = [
  {
    title: 'Profile',
    path: "./profile",
    icon: User2,
  },
  {
    title: 'News Check',
    path: "./news-check",
    icon: NewspaperIcon,
  },
  {
    title: 'News Checked List',
    path: "./news-checked-list",
    icon: ListChecks,
  }
>>>>>>> added
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
<<<<<<< HEAD
          <SidebarGroupLabel>Application</SidebarGroupLabel>
=======
          <SidebarGroupLabel><b>Application</b></SidebarGroupLabel>
>>>>>>> added
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
<<<<<<< HEAD
                    <a href={item.url}>
=======
                    <a href={item.path}>
>>>>>>> added
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
<<<<<<< HEAD
                  <User2 /> Username
=======
                  <User2 /> User's Settings
>>>>>>> added
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
<<<<<<< HEAD
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
=======
                className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem><LogOutIcon></LogOutIcon>
                  <span>Sign out</span>
                </DropdownMenuItem>
                <DropdownMenuItem><UserCircle></UserCircle>
                  <span>Profile</span>
                </DropdownMenuItem>
>>>>>>> added
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

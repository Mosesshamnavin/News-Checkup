import {
  Calendar,
  Home,
  Inbox,
  ListChecks,
  NewspaperIcon,
  User2,
  LogOutIcon,
  UserCircle,
  ChevronUp,
} from 'lucide-react';

import React from 'react';
import Authorization from "./helpers/Authorization";

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

// Menu items.
const items = [
  {
    title: 'Profile',
    url: '/profile',
    icon: User2,
  },
  {
    title: 'New Check',
    url: '/news-check',
    icon: NewspaperIcon,
  },
  {
    title: 'Checked News List',
    url: '/news-list',
    icon: ListChecks,
  }
];

export function AppSidebar() {

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
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
                  <User2 /> User's Settings
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem onClick={() => {  Authorization.logout(); window.location.href = '/news-check'; }}>
                  <span>Sign out</span>
                </DropdownMenuItem>
                <DropdownMenuItem><UserCircle></UserCircle>
                <a href='/profile'>
                      <span>Profile</span>
                </a>                
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

"use client";

import * as React from "react";
import {
  Camera,
  ChartBar,
  LayoutDashboard,
  Database,
  FileCode,
  FileText,
  FileType,
  Folder,
  CircleQuestionMark,
  LayoutList,
  ClipboardClock,
  Search,
  Settings,
  Users,
  NotebookText,
  Calendar,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/components/ui/sidebar";
import Logout from "./sidebar/logout";
import { usePathname, useRouter } from "next/navigation";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: LayoutList,
    },
    {
      title: "Analytics",
      url: "#",
      icon: ChartBar,
    },
    {
      title: "Projects",
      url: "#",
      icon: Folder,
    },
    {
      title: "Team",
      url: "#",
      icon: Users,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: Camera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: FileText,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: FileCode,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: CircleQuestionMark,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: Database,
    },
    {
      name: "Reports",
      url: "#",
      icon: ClipboardClock,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: FileType,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();
  const goTo = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    router.push(url);
  };
  return (
    <Sidebar collapsible="offcanvas" {...props} className="bg-slate-50">
      <SidebarHeader className="pt-5 bg-slate-50 ">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <span className="text-base font-semibold">Malika Lkhabir</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-slate-50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className={`truncate font-medium flex items-center cursor-pointer ${
                pathname === "/clients"
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : ""
              }`}
              onClick={(e) => goTo(e, "/clients")}
            >
              <LayoutList />
              Clients
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              className={`truncate font-medium flex items-center cursor-pointer ${
                pathname === "/calendar"
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : ""
              }`}
              onClick={(e) => goTo(e, "/calendar")}
            >
              <Calendar />
              Calendrier
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              className={`truncate font-medium flex items-center cursor-pointer ${
                pathname === "/notes"
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : ""
              }`}
              onClick={(e) => goTo(e, "/notes")}
            >
              <NotebookText />
              Notes
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              className={`truncate font-medium flex items-center cursor-pointer ${
                pathname === "/settings"
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : ""
              }`}
              onClick={(e) => goTo(e, "/settings")}
            >
              <Settings />
              Paramètres
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="bg-slate-50">
        <Logout />
      </SidebarFooter>
    </Sidebar>
  );
}

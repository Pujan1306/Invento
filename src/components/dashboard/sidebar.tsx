import Image from 'next/image';
import { Settings2, HelpCircle, LogOut, PanelsTopLeft, Archive, Package, CircleDollarSign } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  className?: string;
}

const navItems: NavItem[] = [
  {
    icon: PanelsTopLeft,
    label: "Dashboard",
    href: "./"
  },
  {
    icon: Archive,
    label: "Inventory",
    href: "./inventory"
  },
  {
    icon: Package,
    label: "Product",
    href: "./product"
  },
  {
    icon: CircleDollarSign,
    label: "Expenses",
    href: "./expenses"
  },
  {
    icon: Settings2,
    label: "Settings",
    href: "./userSettings"
  }
];

const footerItems: NavItem[] = [
  {
    icon: HelpCircle,
    label: "Help & Support",
    href: "#"
  },
  {
    icon: LogOut,
    label: "Logout",
    href: "#",
    className: "text-destructive hover:text-destructive"
  }
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground">
                <Image src="/logo1.png" alt="Logo" width={24} height={24} />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Invento</span>
                <span className="truncate text-xs">Dashboard</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <a href={item.href} className={item.className}>
                      <item.icon />
                      <span>{item.label}</span>
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
          {footerItems.map((item, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton asChild>
                <a href={item.href} className={item.className}>
                  <item.icon />
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
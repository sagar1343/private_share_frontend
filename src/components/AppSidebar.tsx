import logo from "@/assets/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuthContext } from "@/context/AuthContext";
import { useDashboardSummary } from "@/context/DashboardContext";
import clsx from "clsx";
import {
  Bell,
  ChevronUp,
  Folder,
  FolderOpen,
  Home,
  LayoutDashboard,
  Library,
  LogIn,
  LogOut,
  Settings2,
  Shield,
  Star,
  Upload,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import CreateCollectionDialog from "./CreateCollectionDialog";
import FileUploadAction from "./FileUploadAction";
import ThemeToggle from "./ThemeToggle";
import { Badge } from "./ui/badge";

export function AppSidebar() {
  const { authenticatedUser, isAuthenticated, logout } = useAuthContext();
  const navigate = useNavigate();
  const { open } = useSidebar();
  const [data] = useDashboardSummary();

  const navigationItems = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Dashboard",
      url: "dashboard/overview",
      icon: LayoutDashboard,
    },
    {
      title: "My Collections",
      url: "dashboard/collections",
      icon: FolderOpen,
      badge: data?.total_collection,
    },
    {
      title: "Shared Files",
      url: "dashboard/shared-files",
      icon: Library,
      badge: data?.total_shared_files,
    },
    {
      title: "Notifications",
      url: "dashboard/notifications",
      icon: Bell,
    },
    {
      title: "Starred",
      url: "dashboard/starred",
      icon: Star,
      badge: data?.starred_files,
    },
  ];
  const quickActions = [
    {
      title: "Upload File",
      component: (
        <FileUploadAction
          customTrigger={
            <SidebarMenuItem>
              <SidebarMenuButton className="cursor-pointer">
                <Upload /> File Upload
              </SidebarMenuButton>
            </SidebarMenuItem>
          }
        />
      ),
    },
    {
      title: "New Collection",
      component: (
        <CreateCollectionDialog
          customTrigger={
            <SidebarMenuItem>
              <SidebarMenuButton className="cursor-pointer">
                <Folder /> New Collection
              </SidebarMenuButton>
            </SidebarMenuItem>
          }
        />
      ),
    }
  ];
  const managementItem = [
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
    },
  ];

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarContent>
        <SidebarHeader>
          <Link to="/" className="flex items-center gap-2">
            <Button size="icon" variant="secondary">
              <img src={logo} alt="logo" className="w-8" />
            </Button>
            <div>
              <h1 className="whitespace-nowrap font-semibold">Private Share</h1>
              <p className="text-xs text-nowrap">Share Files Privately & Securely</p>
            </div>
          </Link>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                      {typeof item.badge === "number" && item.badge > 0 && (
                        <Badge className="ml-auto bg-primary/10 text-primary">{item.badge}</Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {quickActions.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>{item.component}</SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {managementItem.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <ThemeToggle />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className={clsx("min-h-12", open ? "" : "flex items-center justify-center")}
                >
                  <SidebarMenuButton className="cursor-pointer data-[state=open]:bg-sidebar-accent">
                    <Avatar className="rounded-md h-8 w-8">
                      <AvatarImage src={authenticatedUser?.profile_pic} />
                      <AvatarFallback className="bg-primary/10 hover:bg-primary/20 rounded-md text-primary">
                        {authenticatedUser?.first_name?.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={clsx(
                        "grow flex items-center justify-between",
                        open ? "" : "hidden"
                      )}
                    >
                      <div className="w-full flex flex-col items-start text-left min-w-0">
                        <span className="truncate text-sm font-medium">
                          {authenticatedUser?.first_name} {authenticatedUser?.last_name}
                        </span>
                        <span className="truncate text-xs text-sidebar-foreground/70">
                          {authenticatedUser?.email}
                        </span>
                      </div>
                      <ChevronUp className="ml-auto h-4 w-4" />
                    </div>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  align="end"
                  className="w-[--radix-popper-anchor-width] min-w-[17rem] bg-sidebar-accent"
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="size-8 rounded-md">
                        <AvatarImage src={authenticatedUser?.profile_pic} />
                        <AvatarFallback className="bg-primary/10 hover:bg-primary/20 rounded-md text-primary">
                          {authenticatedUser?.first_name?.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {authenticatedUser?.first_name} {authenticatedUser?.last_name}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">
                          {authenticatedUser?.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/privacy-policy" className="cursor-pointer">
                      <Shield className="h-4 w-4" />
                      Privacy Policy
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <SidebarMenuButton asChild>
                <Button variant="link" onClick={() => navigate("/login")} className="">
                  <LogIn />
                  <span>Login to Your Account</span>
                </Button>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

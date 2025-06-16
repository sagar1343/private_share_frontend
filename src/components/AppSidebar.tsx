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
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuthContext } from "@/context/AuthContext";
import clsx from "clsx";
import { Bell, ChevronUp, FolderClosed, Home, Library, LogIn, LogOut, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Collections",
    url: "/collections",
    icon: FolderClosed,
  },
  {
    title: "Received Files",
    url: "/share",
    icon: Library,
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: Bell,
  },
];

export function AppSidebar() {
  const { authenticatedUser, isAuthenticated, logout } = useAuthContext();
  const navigate = useNavigate();
  const { open } = useSidebar();
  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarContent>
        <SidebarHeader>
          <Link to="/" className="flex items-center gap-2">
            <img src={logo || "/placeholder.svg"} alt="logo" className="w-10" />
            <h1 className="whitespace-nowrap">Private Share</h1>
          </Link>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
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
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className={clsx("min-h-12", open ? "" : "flex items-center justify-center")}
                >
                  <SidebarMenuButton className="cursor-pointer data-[state=open]:bg-sidebar-accent">
                    <Avatar className="rounded-none h-6 w-6">
                      <AvatarImage src={authenticatedUser?.profile_pic} />
                      <AvatarFallback className="bg-primary">
                        {authenticatedUser?.first_name?.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className={clsx("flex items-center", open ? "" : "hidden")}>
                      <div className="flex flex-col items-start text-left min-w-0">
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
                  align="start"
                  className="w-[--radix-popper-anchor-width] min-w-56 bg-sidebar-accent"
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="size-8">
                        <AvatarImage src={authenticatedUser?.profile_pic} />
                        <AvatarFallback className="bg-primary">
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

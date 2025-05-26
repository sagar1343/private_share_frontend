import logo from "@/assets/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
} from "@/components/ui/sidebar";
import { useAuthContext } from "@/context/AuthContext";
import {
  FolderClosed,
  Home,
  Library,
  LogIn,
  LogOut,
  Settings,
  Shield,
} from "lucide-react";
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
];

export function AppSidebar() {
  const { authenticatedUser, isAuthenticated, logout } = useAuthContext();
  const navigate = useNavigate();

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarContent>
        <SidebarHeader>
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="size-8" />
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="cursor-pointer">
                  <Settings />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {isAuthenticated && (
                  <>
                    <DropdownMenuLabel className="flex gap-2 items-center">
                      <Avatar>
                        <AvatarImage src={authenticatedUser?.profile_pic} />
                        <AvatarFallback>
                          {authenticatedUser?.first_name
                            .slice(0, 2)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <p>{authenticatedUser?.email}</p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem>
                  <Link
                    to="/privacy-policy"
                    className="flex items-center flex-nowrap gap-2"
                  >
                    <Shield className="h-4 w-4" /> Privacy Policy
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {isAuthenticated ? (
                    <button
                      className="flex items-center flex-nowrap gap-2 cursor-pointer w-full text-left"
                      onClick={() => {
                        logout();
                        navigate("/");
                      }}
                    >
                      <LogOut /> Log out
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="flex items-center flex-nowrap gap-2"
                    >
                      <LogIn /> Log in
                    </Link>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

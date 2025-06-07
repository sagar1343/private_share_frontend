import { AppSidebar } from "@/components/AppSidebar";
import ThemeToggle from "@/components/ThemeToggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import useNotifications from "@/hooks/useNotifications";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [notifications, setNotifications] = useNotifications();
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="my-12 w-full">
        <div className="fixed top-2">
          <SidebarTrigger className="cursor-pointer" />
        </div>
        <div className="mx-4 sm:mx-8">
          <Outlet context={{ notifications, setNotifications }} />
        </div>
        <div className="fixed top-2 right-2 sm:right-8">
          <ThemeToggle />
        </div>
      </main>
    </SidebarProvider>
  );
}

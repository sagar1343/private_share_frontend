import { AppSidebar } from "@/components/AppSidebar";
import ThemeToggle from "@/components/ThemeToggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="my-2 w-full">
        <div className="fixed top-2">
          <SidebarTrigger className="cursor-pointer" />
        </div>
        <div className="mx-4 sm:mx-8">
          <Outlet />
        </div>
        <div className="fixed top-2 right-2 sm:right-8">
          <ThemeToggle />
        </div>
      </main>
    </SidebarProvider>
  );
}

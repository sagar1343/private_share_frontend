import { AppSidebar } from "@/components/AppSidebar";
import ThemeToggle from "@/components/ThemeToggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="my-2 w-full">
        <SidebarTrigger className="cursor-pointer" />
        <div className="mx-8">
          <Outlet />
        </div>
        <div className="fixed top-8 right-8">
          <ThemeToggle />
        </div>
      </main>
      <Toaster />
    </SidebarProvider>
  );
}

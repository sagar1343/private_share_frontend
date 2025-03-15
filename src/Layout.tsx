import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="my-2 w-full">
        <SidebarTrigger className="cursor-pointer" />
        <div className="mx-8">
          <Outlet />
        </div>
        <div className="fixed top-2 right-8">
          <ThemeToggle />
        </div>
      </main>
    </SidebarProvider>
  );
}

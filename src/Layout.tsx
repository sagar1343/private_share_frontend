import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="my-2">
        <SidebarTrigger />
        <div className="mx-8">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}

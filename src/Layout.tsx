import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <Header />
        <main>
          <div className="mx-4 mt-4">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const [breadcrumbItems, setBreadcrumbItems] = useState<string[]>([]);
  useEffect(() => {
    if (location.pathname) setBreadcrumbItems(() => location.pathname.substring(1).split("/"));
  }, [location]);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-5!" />
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.length > 1 &&
            breadcrumbItems
              .filter((_item, index) => index < breadcrumbItems.length - 1)
              .map((item, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      className="capitalize"
                      href={
                        item === "dashboard"
                          ? "/dashboard/overview"
                          : `/${breadcrumbItems.filter((_item, i) => i <= index).join("/")}`
                      }
                    >
                      {item}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </React.Fragment>
              ))}
          <BreadcrumbItem>
            <BreadcrumbPage className="capitalize">
              {breadcrumbItems[breadcrumbItems.length - 1]}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}

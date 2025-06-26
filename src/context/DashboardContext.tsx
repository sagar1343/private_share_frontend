import useFetch from "@/hooks/useFetch";
import { DashboardResponse } from "@/types/DashboardResponse";
import { createContext, PropsWithChildren, useContext } from "react";

type Context = [DashboardResponse | undefined, boolean];

const dashboardSummaryContext = createContext<Context | null>(null);

export default function SummaryProvider({ children }: PropsWithChildren) {
  const { data, isLoading } = useFetch<DashboardResponse>(["dashboard"], "api/dashboard");

  return (
    <dashboardSummaryContext.Provider value={[data, isLoading]}>
      {children}
    </dashboardSummaryContext.Provider>
  );
}

export function useDashboardSummary() {
  const context = useContext(dashboardSummaryContext);
  if (!context) throw new Error("Dashboard context is not defined");
  return context;
}

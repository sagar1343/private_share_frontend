import Heading from "@/components/Heading";
import MatricsGrid from "@/components/MetricsGrid";
import { Button } from "@/components/ui/button";
import { Folder, Upload } from "lucide-react";

export default function Dashboard() {
  return (
    <div>
      <div className="flex flex-wrap gap-y-4 items-center justify-between">
        <div>
          <Heading heading="Dashboard" content="Manage your collections and files efficiently" />
        </div>
        <div className="flex gap-3">
          <Button>
            <Folder /> New Collection
          </Button>
          <Button>
            <Upload /> File Upload
          </Button>
        </div>
      </div>
      <section className="mt-8 space-y-8">
        <MatricsGrid />
      </section>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ReadyToStart() {
  const navigate = useNavigate();
  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to Share Securely?</h2>
            <p className="max-w-[700px] text-slate-500 dark:text-slate-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">Join thousands of professionals who trust Private Share for their secure file sharing needs.</p>
          </div>
          <div>
            <Button onClick={() => navigate("/dashboard/collections")} className="bg-[#008CFC] hover:bg-[#008CFC]/90">
              Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

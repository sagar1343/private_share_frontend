import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function Testimonials() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge className="bg-[#008CFC]/10 text-[#008CFC] border-[#008CFC]/20 hover:bg-[#008CFC]/20">
              Testimonials
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Trusted by Professionals
            </h2>
            <p className="max-w-[700px] text-slate-500 dark:text-slate-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See what our users are saying about PrivateShare.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-slate-200 dark:border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-20 h-20 bg-[#008CFC]/10 rounded-br-full"></div>
            <div className="absolute top-2 left-2 text-[#008CFC]">"</div>
            <CardContent className="pt-10">
              <div className="flex flex-col space-y-4">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  "PrivateShare has revolutionized how our team shares sensitive
                  documents with clients. The password protection and expiration
                  features give us peace of mind."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#008CFC]/30 to-[#008CFC]/10 flex items-center justify-center">
                    <span className="text-[#008CFC] font-bold">SJ</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Sarah Johnson</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Financial Advisor
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-slate-200 dark:border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-20 h-20 bg-[#008CFC]/10 rounded-br-full"></div>
            <div className="absolute top-2 left-2 text-[#008CFC]">"</div>
            <CardContent className="pt-10">
              <div className="flex flex-col space-y-4">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  "The access logs feature is a game-changer. I can see exactly
                  who viewed my files and when, which is crucial for my work in
                  legal services."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#008CFC]/30 to-[#008CFC]/10 flex items-center justify-center">
                    <span className="text-[#008CFC] font-bold">MC</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Michael Chen</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Attorney
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-slate-200 dark:border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-20 h-20 bg-[#008CFC]/10 rounded-br-full"></div>
            <div className="absolute top-2 left-2 text-[#008CFC]">"</div>
            <CardContent className="pt-10">
              <div className="flex flex-col space-y-4">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  "As a photographer, I need to share high-resolution files with
                  clients while maintaining control. PrivateShare's download
                  limits are perfect for this."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#008CFC]/30 to-[#008CFC]/10 flex items-center justify-center">
                    <span className="text-[#008CFC] font-bold">ER</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Emma Rodriguez</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Professional Photographer
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

import heroImage from "@/assets/hero.jpg";
import FeatureCard from "@/components/FeatureCard";
import Footer from "@/components/Footer";
import ReadyToStart from "@/components/ReadToStart";
import StepCard from "@/components/StepCard";
import Testimonials from "@/components/Testimonials";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Eye, FileText, Lock, Share2, Shield, Users } from "lucide-react";
import { Element, Link as ScrollLink } from "react-scroll";

const features = [
  {
    Icon: Lock,
    title: "Password Protection",
    description: "Add an extra layer of security by protecting your shared files with a password.",
  },
  {
    Icon: Clock,
    title: "Expiration Timer",
    description: "Set an expiration time for your shared files to automatically revoke access.",
  },
  {
    Icon: FileText,
    title: "Download Limits",
    description: "Limit the number of downloads to maintain control over your content.",
  },
  {
    Icon: Users,
    title: "User Permissions",
    description: "Grant specific permissions to control who can access your files.",
  },
  {
    Icon: Share2,
    title: "Easy Sharing",
    description: "Generate shareable links and distribute them however you want.",
  },
  {
    Icon: Eye,
    title: "Access Logs",
    description: "Monitor who accessed your files and when with detailed access logs.",
  },
];

const steps = [
  {
    step: 1,
    title: "Upload Your File",
    description: "Upload any file type to PrivateShare with our drag-and-drop interface.",
  },
  {
    step: 2,
    title: "Set Controls",
    description: "Add password, set download limit, or choose expiration timer.",
  },
  {
    step: 3,
    title: "Share Securely",
    description: "Get a secure link and share with anyone, anywhere.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#0A0A0A] text-slate-900 dark:text-slate-50">
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="container px-4 md:px-6 relative">
          <div className="grid lg:grid-cols-[1fr_400px] gap-12 xl:grid-cols-[1fr_500px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge className="inline-flex bg-[#008CFC]/10 text-[#008CFC] border-[#008CFC]/20 hover:bg-[#008CFC]/20">Secure File Sharing</Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Share Files Privately & Securely</h1>
                <p className="mt-6 max-w-[600px] text-slate-500 dark:text-slate-400 md:text-xl">PrivateShare gives you complete control with password protection, expiration timers, and download limits.</p>
              </div>
              <div className="mt-4">
                <ScrollLink smooth to="features-section">
                  <Button size="lg" className="cursor-pointer">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </ScrollLink>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[500px] aspect-square">
                <div className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl border border-slate-200 drop-shadow-lg dark:border-slate-800">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008CFC]/5 to-[#008CFC]/10 dark:from-[#008CFC]/10 dark:to-[#008CFC]/20" />
                  <img src={heroImage} alt="PrivateShare Dashboard" width={500} height={500} className="rounded-xl object-cover" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white dark:bg-[#0A0A0A] p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-[#008CFC]" />
                    <span className="text-sm font-medium">100% Secure Sharing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Element name="features-section" className="py-20 bg-slate-50 dark:bg-slate-900/30">
        <div className="container px-4 md:px-6 text-center">
          <Badge className="bg-[#008CFC]/10 text-[#008CFC] border-[#008CFC]/20 hover:bg-[#008CFC]/20">Features</Badge>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight my-2">Everything You Need for Secure File Sharing</h2>
          <p className="max-w-[700px] mx-auto text-slate-500 dark:text-slate-400 md:text-xl/relaxed">Powerful tools to ensure your files are shared securely with only the people you choose.</p>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <FeatureCard key={i} {...f} />
            ))}
          </div>
        </div>
      </Element>

      <section className="py-20">
        <div className="container px-4 md:px-6 text-center">
          <Badge className="bg-[#008CFC]/10 text-[#008CFC] border-[#008CFC]/20 hover:bg-[#008CFC]/20">How It Works</Badge>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight my-2">Simple, Secure File Sharing in 3 Steps</h2>
          <p className="max-w-[700px] mx-auto text-slate-500 dark:text-slate-400 md:text-xl/relaxed">PrivateShare makes it easy to share files securely with anyone, anywhere.</p>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
            {steps.map((s, i) => (
              <StepCard key={i} {...s} />
            ))}
          </div>
        </div>
      </section>
      <section>
        <Testimonials />
      </section>
      <section>
        <ReadyToStart />
      </section>
      <Footer />
    </div>
  );
}

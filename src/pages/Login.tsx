import heroImage from "@/assets/hero.webp";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthContext } from "@/context/AuthContext";
import { Clock, Lock, Users } from "lucide-react";
import { lazy, Suspense, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const GoogleLoginButton = lazy(() => import("@/components/GoogleLoginButton"));

export default function Login() {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (isAuthenticated) {
      const next = searchParams.get("next");
      navigate(next ?? "/dashboard/overview");
    }
  }, [isAuthenticated]);

  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-3">
      <div className="max-lg:hidden col-span-2 bg-background flex flex-col justify-center items-center gap-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="relative w-full max-w-[500px] aspect-square">
            <div className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl border border-slate-200 drop-shadow-lg dark:border-slate-800">
              <div className="absolute inset-0 bg-gradient-to-br from-[#008CFC]/5 to-[#008CFC]/10 dark:from-[#008CFC]/10 dark:to-[#008CFC]/20" />
              <img
                src={heroImage}
                loading="eager"
                alt="Private Share"
                width={500}
                height={500}
                className="rounded-xl object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-background p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">100% Secure Sharing</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 w-full max-w-[500px]">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="p-3 rounded-full bg-primary/10">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium">Password Protection</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="p-3 rounded-full bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium">Expiration Timer</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="p-3 rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium">User Permissions</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-8 py-12 px-4">
        <div className="w-full max-w-sm space-y-6">
          <div className="flex flex-col items-center gap-4">
            <img src={logo} alt="logo" className="w-20" />
            <div className="text-center space-y-2">
              <h1 className="font-semibold">Private Share</h1>
            </div>
          </div>

          <div className="space-y-4">
            <Suspense fallback={<Skeleton className="w-full h-10" />}>
              <div className="w-full flex justify-center">
                <GoogleLoginButton />
              </div>
            </Suspense>
          </div>

          <div className="text-center space-y-4">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              By continuing, you agree to our{" "}
              <Link to="/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
            <Link to="/">
              <Button className="w-full max-w-[256px]" variant="ghost">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

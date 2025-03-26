import fileIllustration from "@/assets/side-image.png";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";

const GoogleLoginButton = lazy(() => import("@/components/GoogleLoginButton"));

export default function Login() {
  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-3">
      <div className="max-lg:hidden col-span-2 bg-black/80 dark:bg-white/80  flex flex-col justify-center items-center gap-10">
        <img src={fileIllustration} alt="file-illustration" className="" />
      </div>
      <div className="flex flex-col items-center justify-center gap-12 py-12 px-4">
        <figure className="flex flex-col items-center gap-4">
          <img src={logo} alt="logo" className="size-20" />
          <figcaption className="font-semibold">Private Share</figcaption>
        </figure>
        <div className="space-y-4">
          <Suspense fallback={<Skeleton className="w-3xs h-10" />}>
            <GoogleLoginButton />
          </Suspense>
          <Link to="/">
            <Button className="w-full cursor-pointer" variant="ghost">
              Back
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

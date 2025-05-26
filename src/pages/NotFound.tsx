import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Oops! Page Not Found</h2>
            <p className="text-slate-500 dark:text-slate-400">The page you're looking for doesn't exist or has been moved.</p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-4 -left-4 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => navigate(-1)} variant="outline" className="w-full sm:w-auto">
            Go Back
          </Button>
          <Button onClick={() => navigate("/")} className="w-full sm:w-auto bg-primary hover:bg-primary/90">
            Return Home
          </Button>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          Need help?{" "}
          <a href="mailto:sagarchakrawarti25@gmail.com" className="text-primary hover:underline">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}

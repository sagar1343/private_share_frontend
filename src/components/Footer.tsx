import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="py-6 border-t border-slate-200 dark:border-slate-800">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4">
          <p className="text-center text-sm text-slate-500 dark:text-slate-400">© {new Date().getFullYear()} Private Share. All rights reserved.</p>
          <div className="flex gap-4 text-sm text-slate-500 dark:text-slate-400">
            <Link to="/privacy-policy" className="hover:text-slate-900 dark:hover:text-slate-100">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

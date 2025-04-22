export default function Footer() {
  return (
    <footer className="py-6 border-t border-slate-200 dark:border-slate-800">
      <div className="container px-4 md:px-6">
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} PrivateShare. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

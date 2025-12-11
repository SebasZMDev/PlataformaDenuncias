export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-100 dark:bg-black">
      {children}
    </div>
  );
}

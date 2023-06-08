import { Appbar } from "../core";

interface LoggedLayoutProps {
  children: React.ReactNode;
}

export default function LoggedLayout({ children }: LoggedLayoutProps) {
  return (
    <>
      <Appbar />
      <main className="relative min-h-screen w-screen bg-gray-100">
        {children}
      </main>
    </>
  );
}

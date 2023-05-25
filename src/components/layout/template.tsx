import { Appbar } from "../core";

interface LoggedLayoutProps {
  children: React.ReactNode;
}

export default function LoggedLayout({ children }: LoggedLayoutProps) {
  return (
    <>
      <Appbar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 bg-gradient-to-b">
        {children}
      </main>
    </>
  );
}

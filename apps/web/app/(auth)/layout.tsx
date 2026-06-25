import { requireUnauth } from "~/features/auth/actions";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUnauth();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center ">
      <div className="w-full max-w-md rounded-lg  p-8 shadow-md">
        {children}
      </div>
    </div>
  );
}

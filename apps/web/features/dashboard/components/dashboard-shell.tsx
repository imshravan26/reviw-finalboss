import { TooltipProvider } from "~/components/ui/tooltip";
import { DashboardSidebar } from "~/features/dashboard/components/dashboard-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { UserMenuUser } from "~/features/auth/components/user-menu";
import { ModeToggle } from "~/components/mode-toggle";

type DashboardShellProps = {
  children: React.ReactNode;
  user: UserMenuUser;
  plan?: string;
};

export function DashboardShell({ children, user, plan }: DashboardShellProps) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <DashboardSidebar user={user} plan={plan} />
        <SidebarInset className="min-h-svh">{children}</SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}

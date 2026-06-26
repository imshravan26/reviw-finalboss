"use client";
import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar";
import { UserMenu, UserMenuUser } from "~/features/auth/components/user-menu";

type SidebarUserButtonProps = {
  user: UserMenuUser;
  plan?: string;
  size?: "default" | "sm" | "lg";
};

export function SidebarUserButton({ user, plan }: SidebarUserButtonProps) {
  const { open } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <UserMenu
          user={user}
          plan={plan}
          variant={open ? "profile" : "compact"}
          className="w-full [&_button]:h-12 [&_button]:w-full [&_button]:justify-start [&_button]:gap-2 [&_button]:px-2"
        />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

import React from "react";
import { UserMenuWithSession } from "~/features/auth/components/user-menu";

const DashboardPage = () => {
  return (
    <div>
      dashbaord page
      <UserMenuWithSession variant="compact" />
    </div>
  );
};

export default DashboardPage;

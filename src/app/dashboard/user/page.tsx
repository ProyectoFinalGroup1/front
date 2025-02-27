import UserDashboardLayout from "@/app/dashboard/user/UserDashboardLayout";
import DashboardUserView from "@/app/dashboard/views/DashboardUserView";

const UserDashboard = () => {
  return (
    <UserDashboardLayout>
      <DashboardUserView />
    </UserDashboardLayout>
  );
};

export default UserDashboard;

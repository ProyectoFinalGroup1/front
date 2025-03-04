import AdminDashboardLayout from "@/app/dashboard/admin/AdminDashboardLayout";
import DashboardAdminView from "../views/DashboardAdminView";

const AdminDashboard = () => {
  return (
    <AdminDashboardLayout>
      <DashboardAdminView />
    </AdminDashboardLayout>
  );
};

export default AdminDashboard;

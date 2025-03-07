import AdminSidebar from "@/components/AdminSidebar";


const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default AdminDashboardLayout;

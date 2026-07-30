import Header from "../landing page/Navbar/Header";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";

export const metadata = {
  title: "Dashboard | MY Bharat",
  description: "Manage your MY Bharat profile and account details",
};

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-[#F3F5FC]">
        <Header />
        <DashboardLayout />
      </div>
    </ProtectedRoute>
  );
}

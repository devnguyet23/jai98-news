import Link from "next/link";
import { LayoutDashboard, FileText, Plus, Settings, Home } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Admin Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-8">
                <Link href="/admin" className="flex items-center gap-2">
                  <LayoutDashboard className="w-6 h-6 text-blue-600" />
                  <span className="font-bold text-xl">Admin Dashboard</span>
                </Link>
                
                <nav className="hidden md:flex items-center gap-4">
                  <Link
                    href="/admin"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                  
                  <Link
                    href="/admin/posts"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Posts</span>
                  </Link>
                  
                  <Link
                    href="/admin/posts/new"
                    className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Post</span>
                  </Link>
                </nav>
              </div>
              
              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Home className="w-4 h-4" />
                  <span className="hidden md:inline">View Site</span>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}

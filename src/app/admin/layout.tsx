"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard" },
  { name: "Projects", href: "/admin/projects" },
  { name: "About Me", href: "/admin/about" },
  { name: "Skills", href: "/admin/skills" },
  { name: "Blogs", href: "/admin/blog" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuthPage =
    pathname === "/admin/login" || pathname === "/admin/register";

  const handleLogout = () => {
    // Clear cookie
    document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";

    // Clear localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }

    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen flex bg-gray-900">
      {!isAuthPage && (
        <aside className="w-64 bg-gray-800 text-white p-6">
          <div className="text-2xl font-bold mb-8">
            <Link href="/admin/dashboard" className="text-white">
              Admin Panel
            </Link>
          </div>
          <nav className="space-y-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-2 rounded-lg text-lg font-medium transition-all duration-200 hover:bg-gray-700 ${
                  pathname === item.href
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <button
            onClick={handleLogout}
            className="absolute bottom-8 left-6 w-[200px] py-2 bg-red-600 text-white rounded-lg font-medium transition-all duration-200 hover:bg-red-500"
          >
            Logout
          </button>
        </aside>
      )}

      <div className="flex-1 bg-gray-100 dark:bg-gray-900 p-8">
        <main
          className={`${
            isAuthPage ? "" : "max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

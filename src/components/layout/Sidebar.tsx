"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

const adminLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/admin/employees", label: "Employees", icon: "👥" },
  { href: "/admin/departments", label: "Departments", icon: "🏢" },
  { href: "/admin/leave-requests", label: "Leave Requests", icon: "📅" },
];

const managerLinks = [
  { href: "/manager/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/manager/team", label: "My Team", icon: "👥" },
  { href: "/manager/leave", label: "Approve Leave", icon: "📅" },
  { href: "/manager/department", label: "My Department", icon: "🏢" },
];

const employeeLinks = [
  { href: "/employee/profile", label: "My Profile", icon: "👤" },
  { href: "/employee/leave", label: "My Leave", icon: "📅" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const router = useRouter();

  const links =
    user?.role === "ADMIN"
      ? adminLinks
      : user?.role === "MANAGER"
        ? managerLinks
        : user?.role === "EMPLOYEE"
          ? employeeLinks
          : [];

  return (
    <aside
      className="w-52 min-h-screen flex flex-col border-r"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-2 px-4 py-4 border-b"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div
          className="w-8 h-8 rounded-md flex items-center justify-center text-white text-xs font-medium"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          EMS
        </div>
        <span
          className="text-sm font-medium"
          style={{ color: "var(--color-ink)" }}
        >
          EMS Portal
        </span>
      </div>

      {/* Role badge */}
      <div
        className="px-4 py-3 border-b"
        style={{ borderColor: "var(--color-border)" }}
      >
        <span
          className="text-xs font-medium px-2 py-1 rounded-full"
          style={{
            backgroundColor: "var(--color-primary-light)",
            color: "var(--color-primary)",
          }}
        >
          {user?.role}
        </span>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-2 py-3 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors"
              style={{
                backgroundColor: isActive
                  ? "var(--color-primary-light)"
                  : "transparent",
                color: isActive
                  ? "var(--color-primary)"
                  : "var(--color-ink-secondary)",
                fontWeight: isActive ? 500 : 400,
              }}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div
        className="px-2 py-3 border-t"
        style={{ borderColor: "var(--color-border)" }}
      >
        <button
          onClick={() => {
            useAuthStore.getState().logout();
            router.push("/dashboard");
          }}
          className="flex items-center gap-2 px-3 py-2 rounded-md text-sm w-full"
          style={{ color: "var(--color-ink-secondary)" }}
        >
          <span>🚪</span>
          Sign out
        </button>
      </div>
    </aside>
  );
}

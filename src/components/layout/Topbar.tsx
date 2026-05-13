"use client";

import useAuthStore from "@/store/authStore";

interface TopbarProps {
  title: string;
}

export default function Topbar({ title }: TopbarProps) {
  const { user } = useAuthStore();

  return (
    <header
      className="h-12 flex items-center justify-between px-6 border-b"
      style={{
        backgroundColor: "white",
        borderColor: "var(--color-border)",
      }}
    >
      {/* Page title */}
      <h1 className="text-sm font-medium" style={{ color: "var(--color-ink)" }}>
        {title}
      </h1>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Username */}
        <span
          className="text-sm"
          style={{ color: "var(--color-ink-secondary)" }}
        >
          {user?.username}
        </span>

        {/* Avatar */}
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium"
          style={{
            backgroundColor: "var(--color-primary-light)",
            color: "var(--color-primary)",
          }}
        >
          {user?.username?.slice(0, 2).toUpperCase()}
        </div>
      </div>
    </header>
  );
}

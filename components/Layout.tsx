import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Activity, Bell, LayoutDashboard, Inbox, LogIn, Menu, X } from "lucide-react";
import { useRole } from "@/contexts/RoleContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { role, roleConfig } = useRole();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLink = (href: string, label: string, Icon: typeof Activity) => {
    const active = router.pathname === href;
    return (
      <Link
        href={href}
        onClick={() => setMenuOpen(false)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          active
            ? "bg-[var(--nav-item-active)] text-white"
            : "text-[var(--nav-text)] hover:text-white hover:bg-[var(--nav-item-hover)]"
        }`}
      >
        <Icon size={16} />
        {label}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="sticky top-0 z-50 bg-nav-bg/80 backdrop-blur border-b border-nav-border">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="text-cyan-400" size={22} />
            <span className="font-bold text-lg tracking-tight text-white">
              PostOp Monitor
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            {navLink("/", "Dashboard", Activity)}
            {navLink("/alerts", "Alerts", Bell)}
            {role !== null && (
              <>
                {navLink("/provider", "My Dashboard", LayoutDashboard)}
                {navLink("/provider/inbox", "Inbox", Inbox)}
              </>
            )}
            {role !== null ? (
              <div className="flex items-center gap-2 ml-3 pl-3 border-l border-[var(--nav-border)]">
                <span className="text-xs text-[var(--nav-text)] bg-[var(--nav-item-active)] px-2.5 py-1 rounded-full">
                  {roleConfig?.label}
                </span>
                <Link
                  href="/login"
                  className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Switch
                </Link>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[var(--nav-text)] hover:text-white hover:bg-[var(--nav-item-hover)] transition-colors ml-2"
              >
                <LogIn size={16} />
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-[var(--nav-text)] hover:text-white hover:bg-[var(--nav-item-hover)] transition-colors"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-nav-border px-4 py-3 space-y-1 bg-nav-bg/95 backdrop-blur">
            {navLink("/", "Dashboard", Activity)}
            {navLink("/alerts", "Alerts", Bell)}
            {role !== null && (
              <>
                {navLink("/provider", "My Dashboard", LayoutDashboard)}
                {navLink("/provider/inbox", "Inbox", Inbox)}
              </>
            )}
            {role !== null ? (
              <div className="flex items-center gap-2 pt-2 mt-2 border-t border-nav-border">
                <span className="text-xs text-[var(--nav-text)] bg-[var(--nav-item-active)] px-2.5 py-1 rounded-full">
                  {roleConfig?.label}
                </span>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Switch Role
                </Link>
              </div>
            ) : (
              navLink("/login", "Sign In", LogIn)
            )}
          </div>
        )}
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}

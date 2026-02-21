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
            ? "bg-slate-700 text-white"
            : "text-slate-400 hover:text-white hover:bg-slate-800"
        }`}
      >
        <Icon size={16} />
        {label}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="text-cyan-400" size={22} />
            <span className="font-bold text-lg tracking-tight">
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
              <div className="flex items-center gap-2 ml-3 pl-3 border-l border-slate-700">
                <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full">
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
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-2"
              >
                <LogIn size={16} />
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-800 px-4 py-3 space-y-1 bg-slate-900/95 backdrop-blur">
            {navLink("/", "Dashboard", Activity)}
            {navLink("/alerts", "Alerts", Bell)}
            {role !== null && (
              <>
                {navLink("/provider", "My Dashboard", LayoutDashboard)}
                {navLink("/provider/inbox", "Inbox", Inbox)}
              </>
            )}
            {role !== null ? (
              <div className="flex items-center gap-2 pt-2 mt-2 border-t border-slate-800">
                <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full">
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

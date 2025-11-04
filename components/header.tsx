'use client';

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Search, User, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const { user, signOut } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowMenu(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-5xl">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Jainews
          </span>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400"
          >
            Trang chủ
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400"
          >
            Blog
          </Link>
          <Link
            href="/search"
            className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Tìm kiếm</span>
          </Link>
          <ThemeToggle />
          
          {/* User Menu */}
          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-medium">
                  {user.displayName?.[0] || user.email?.[0] || 'U'}
                </div>
                <span className="hidden md:inline text-sm font-medium">
                  {user.displayName || 'User'}
                </span>
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium truncate">{user.displayName}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  
                  <Link
                    href="/admin"
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setShowMenu(false)}
                  >
                    <Settings className="w-4 h-4" />
                    Admin Dashboard
                  </Link>
                  
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <User className="w-4 h-4" />
              Đăng nhập
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

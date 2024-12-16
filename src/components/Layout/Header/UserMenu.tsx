import React from 'react';
import { LogOut, User } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';

export function UserMenu() {
  const { user, logout } = useAuthStore();

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-700 dark:text-gray-300">
        {user?.username}
      </span>
      <button
        onClick={logout}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        aria-label="Logout"
      >
        <LogOut className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>
    </div>
  );
}
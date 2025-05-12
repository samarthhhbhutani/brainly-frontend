import { ReactElement } from "react";

interface SidebarItemProps {
  text: string;
  icon: ReactElement;
  onClick: () => void;
  isActive?: boolean;
}

export function SidebarItem({ text, icon, onClick, isActive }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors ${
        isActive
          ? 'bg-purple-50 text-purple-600'
          : 'text-white hover:bg-gray-100 hover:text-purple-600'
      }`}
    >
      <div className="p-2">{icon}</div>
      <span className="font-medium">{text}</span>
    </button>
  );
}
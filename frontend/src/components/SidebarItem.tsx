import type { ReactElement } from "react";

interface SidebarItemTypes {
  text: string;
  icon: ReactElement;
}
export const SidebarItem = (props: SidebarItemTypes) => {
  return (
    <div className="flex items-center text-slate-600 mt-4 cursor-pointer hover:text-blue-700 py-2 pr-4 rounded-full hover:bg-blue-50 transition-colors duration-150">
      <div className="pr-3 flex items-center text-lg">{props.icon}</div>
      <div className="font-medium text-sm tracking-tight">{props.text}</div>
    </div>
  );
};

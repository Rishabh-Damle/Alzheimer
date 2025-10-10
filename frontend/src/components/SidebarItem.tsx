import type { ReactElement } from "react";

interface SidebarItemTypes {
  text: string;
  icon: ReactElement;
}
export const SidebarItem = (props: SidebarItemTypes) => {
  return (
    <div className="flex text-gray-700 mt-8 cursor-pointer hover:text-purple-600 py-1 transition-all duration-100">
      <div className="pr-4">{props.icon}</div>
      <div className=" font-sans">{props.text}</div>
    </div>
  );
};

import type { ReactElement } from "react";

interface SidebarItemTypes {
  text: string;
  icon: ReactElement;
}
export const SidebarItem = (props: SidebarItemTypes) => {
  return (
    <div className="flex text-gray-800 mt-5">
      <div className="p-2 cursor-pointer">{props.icon}</div>
      <div className="p-2 cursor-pointer font-sans">{props.text}</div>
    </div>
  );
};

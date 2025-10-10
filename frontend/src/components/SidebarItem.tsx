import type { ReactElement } from "react";

interface SidebarItemTypes {
  text: string;
  icon: ReactElement;
}
export const SidebarItem = (props: SidebarItemTypes) => {
  return (
    <div className="flex text-gray-700 mt-8 cursor-pointer hover:bg-gray-200 hover:rounded hover:max-w-32 py-1">
      <div className="pr-4">{props.icon}</div>
      <div className=" font-sans">{props.text}</div>
    </div>
  );
};

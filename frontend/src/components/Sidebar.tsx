import { DocumentsIcon } from "./icons/DocumentsIcon";
import { Logo } from "./icons/Logo";
import { TwitterIcon } from "./icons/TwitterIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
export const Sidebar = () => {
  return (
    <div className="h-screen bg-white w-72 fixed left-0 top-0 border-r border-white shadow pl-4">
      <div className="text-3xl font-bold p-2 pt-6 flex items-center">
        <div className="pr-4 text-purple-600 text-shadow-xs">
          <Logo></Logo>
        </div>
        <div className="text-purple-600 text-shadow-xs">Alzheimer</div>
      </div>
      <div className="pt-4 pl-4">
        <SidebarItem
          icon={<TwitterIcon></TwitterIcon>}
          text="Tweets"
        ></SidebarItem>
        <SidebarItem
          icon={<YoutubeIcon></YoutubeIcon>}
          text="Videos"
        ></SidebarItem>
        <SidebarItem
          icon={<DocumentsIcon></DocumentsIcon>}
          text="Documents"
        ></SidebarItem>
      </div>
    </div>
  );
};

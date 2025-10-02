import { DocumentsIcon } from "./icons/DocumentsIcon";
import { TwitterIcon } from "./icons/TwitterIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
export const Sidebar = () => {
  return (
    <div className="h-screen bg-white w-64 fixed border-4 border-white pl-4 ">
      <h1 className="text-2xl font-bold font-mono p-2 ">🧠 Alzheimer</h1>
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
  );
};

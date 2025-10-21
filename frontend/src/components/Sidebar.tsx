import { AllContentsIcon } from "./icons/AllContentIcon";
import { DocumentsIcon } from "./icons/DocumentsIcon";
import { GithubIcon } from "./icons/GithubIcon";
import { InstagramIcon } from "./icons/InstagramIcon";
import { Logo } from "./icons/Logo";
import { TwitterIcon } from "./icons/TwitterIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

interface SidebarProps {
  setTypeFilter: (type: string | null) => void;
}
export const Sidebar = ({ setTypeFilter }: SidebarProps) => {
  return (
    <div className="h-screen bg-white w-72 fixed left-0 top-0 border-r border-white shadow pl-4">
      <div className="text-3xl font-bold p-2 pt-6 flex items-center">
        <div className="pr-4 text-purple-600 text-shadow-xs">
          <Logo></Logo>
        </div>
        <div className="text-purple-600 text-shadow-xs">Alzheimer</div>
      </div>
      <div className="pt-4 pl-4">
        <div onClick={() => setTypeFilter(null)}>
          <SidebarItem
            icon={<AllContentsIcon></AllContentsIcon>}
            text="All contents"
          ></SidebarItem>
        </div>
        <div
          onClick={() => {
            setTypeFilter("Youtube");
          }}
        >
          <SidebarItem
            icon={<YoutubeIcon></YoutubeIcon>}
            text="Youtube"
          ></SidebarItem>
        </div>
        <div
          onClick={() => {
            setTypeFilter("Twitter");
          }}
        >
          {" "}
          <SidebarItem
            icon={<TwitterIcon></TwitterIcon>}
            text="Twitter"
          ></SidebarItem>
        </div>
      </div>
    </div>
  );
};

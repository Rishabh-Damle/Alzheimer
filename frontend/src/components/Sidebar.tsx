import { AllContentsIcon } from "./icons/AllContentIcon";
import { Logo } from "./icons/Logo";
import { TwitterIcon } from "./icons/TwitterIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { CrossIcon } from "./icons/CrossIcon";

interface SidebarProps {
  setTypeFilter: (type: string | null) => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}
export const Sidebar = ({
  setTypeFilter,
  mobileOpen = false,
  onMobileClose,
}: SidebarProps) => {
  const content = (
    <>
      <div className="text-2xl font-semibold px-2 pt-6 flex items-center justify-between">
        <div className="flex items-center">
          <div className="pr-3 text-purple-600">
            <Logo></Logo>
          </div>
          <div className="text-purple-700 tracking-tight">Alzheimer</div>
        </div>
        {mobileOpen && (
          <button
            className="md:hidden text-gray-400 hover:text-gray-600 transition"
            onClick={onMobileClose}
          >
            <CrossIcon />
          </button>
        )}
      </div>
      <div className="pt-6 pl-4 pb-6 overflow-y-auto">
        <div
          onClick={() => {
            setTypeFilter(null);
            onMobileClose?.();
          }}
        >
          <SidebarItem
            icon={<AllContentsIcon></AllContentsIcon>}
            text="All contents"
          ></SidebarItem>
        </div>
        <div
          onClick={() => {
            setTypeFilter("Youtube");
            onMobileClose?.();
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
            onMobileClose?.();
          }}
        >
          <SidebarItem
            icon={<TwitterIcon></TwitterIcon>}
            text="Twitter"
          ></SidebarItem>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col h-screen bg-white/80 w-64 md:w-72 fixed left-0 top-0 border-r border-purple-100 shadow-sm backdrop-blur-sm pl-4">
        {content}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm md:hidden"
            onClick={onMobileClose}
          />
          <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-white shadow-xl border-r border-purple-100 backdrop-blur-sm pl-4 md:hidden">
            {content}
          </aside>
        </>
      )}
    </>
  );
};

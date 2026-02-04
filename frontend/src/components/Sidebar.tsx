import { Brain, Layout, Twitter, Youtube, X } from "lucide-react";
import { SidebarItem } from "./SidebarItem";

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
        <div className="flex items-center gap-2">
          <Brain className="w-8 h-8 text-blue-600" />
          <div className="text-slate-900 tracking-tight">Alzheimer</div>
        </div>
        {mobileOpen && (
          <button
            className="md:hidden text-slate-400 hover:text-slate-600 transition"
            onClick={onMobileClose}
          >
            <X className="w-6 h-6" />
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
            icon={<Layout className="w-5 h-5" />}
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
            icon={<Youtube className="w-5 h-5" />}
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
            icon={<Twitter className="w-5 h-5" />}
            text="Twitter"
          ></SidebarItem>
        </div>
      </div>
    </>
  );

  return (
    <>

      <aside className="hidden md:flex md:flex-col h-screen bg-white w-64 md:w-72 fixed left-0 top-0 border-r border-slate-200 shadow-sm pl-4">
        {content}
      </aside>


      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm md:hidden"
            onClick={onMobileClose}
          />
          <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-white shadow-xl border-r border-slate-200 pl-4 md:hidden">
            {content}
          </aside>
        </>
      )}
    </>
  );
};

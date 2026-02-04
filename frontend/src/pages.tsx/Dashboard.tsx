import { SwitchButton } from "../components/SwitchButton";
import { Plus, Share2, Filter } from "lucide-react";
import { Card } from "../components/card";
import { AddContentModel } from "../components/AddContentModel";
import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL, SITE_URL } from "../config";
export function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { contents, refresh, deleteContent } = useContent();
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const filteredContents = contents.filter((c) =>
    typeFilter === null ? true : c.type === typeFilter
  );

  const [shareLink, setShareLink] = useState<string | null>(null);
  const [shareLoading, setShareLoading] = useState(false);

  useEffect(() => {
    refresh();
  }, [modelOpen]);
  useEffect(() => {
    async function fetchShareStatus() {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/content/getShareLink`, {
          headers: { Authorization: localStorage.getItem("Token") || "" },
        });
        const hash = (response as any)?.data?.hash;
        setShareLink(hash ? `${SITE_URL}/share/${hash}` : null);
      } catch {
        setShareLink(null);
      }
    }
    fetchShareStatus();
  }, []);

  async function handleShareOn() {
    setShareLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/content/shareYourContent`,
        {
          share: true,
        },
        { headers: { Authorization: localStorage.getItem("Token") || "" } }
      );
      const hash =
        (response as any)?.data?.hash || (response as any)?.data?.link;
      if (hash) setShareLink(`${SITE_URL}/share/${hash}`);
      else {
        const check = await axios.get(`${BACKEND_URL}/api/v1/content/getShareLink`, {
          headers: { Authorization: localStorage.getItem("Token") || "" },
        });
        const currentHash = (check as any)?.data?.hash;
        setShareLink(currentHash ? `${SITE_URL}/share/${currentHash}` : null);
      }
    } finally {
      setShareLoading(false);
    }
  }

  async function handleShareOff() {
    setShareLoading(true);
    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/content/shareYourContent`,
        { share: false },
        { headers: { Authorization: localStorage.getItem("Token") || "" } }
      );
      setShareLink(null);
    } finally {
      setShareLoading(false);
    }
  }
  return (
    <div className="min-h-screen bg-transparent">
      <Sidebar
        setTypeFilter={setTypeFilter}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      <div className="min-h-screen bg-gray-50/80 ml-0 md:ml-72 p-4 sm:p-6">
        <AddContentModel
          open={modelOpen}
          onClose={() => {
            setModelOpen(false);
          }}
        ></AddContentModel>
        <div className="mb-8 flex items-center justify-between md:hidden">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">Your Brain</h1>
          </div>
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm hover:bg-blue-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
        <div className="flex flex-wrap justify-end gap-3 mb-8">
          <SwitchButton
            onClick={() => {
              setModelOpen(true);
            }}
            variant="primary"
            text="Add Content"
            startIcon={<Plus className="w-4 h-4" />}
          ></SwitchButton>
          {shareLink ? (
            <>
              <SwitchButton
                onClick={handleShareOff}
                variant="secondary"
                text="Stop sharing"
                startIcon={<Share2 className="w-4 h-4" />}
                loading={shareLoading}
              />
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-blue-200 text-xs sm:text-sm max-w-full overflow-x-auto">
                <span className="text-slate-500 font-medium">Link:</span>
                <a
                  href={shareLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 underline truncate max-w-[200px] hover:text-blue-800 transition-colors"
                >
                  {shareLink}
                </a>
                <SwitchButton
                  onClick={() => {
                    if (shareLink) {
                      navigator.clipboard.writeText(shareLink);
                    }
                  }}
                  variant="primary"
                  text="Copy"
                />
              </div>
            </>
          ) : (
            <SwitchButton
              onClick={handleShareOn}
              variant="secondary"
              text="Share brain"
              startIcon={<Share2 className="w-4 h-4" />}
              loading={shareLoading}
            />
          )}
        </div>

        <div className="mt-10 flex flex-wrap gap-5">
          {filteredContents.map(({ _id, type, link, title }) => (
            <Card
              type={
                type as
                  | "Twitter"
                  | "Youtube"
                  | "Document"
                  | "Github"
                  | "Instagram"
              }
              title={title}
              link={link}
              key={_id}
              id={_id}
              onDelete={(id) => deleteContent(id)}
            />
          ))}
        </div>
        {filteredContents.length === 0 && (
          <div className="text-center py-20 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200 mt-10">
            <p className="text-slate-500">No content found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

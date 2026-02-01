import { SwitchButton } from "../components/SwitchButton";
import { PlusIcon } from "../components/icons/PlusIcon";
import { ShareIcon } from "../components/icons/ShareIcon";
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
        const response = await axios.get(`${BACKEND_URL}/api/v1/share`, {
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
        `${BACKEND_URL}/api/v1/share`,
        {
          share: true,
        },
        { headers: { Authorization: localStorage.getItem("Token") || "" } }
      );
      const hash =
        (response as any)?.data?.hash || (response as any)?.data?.link;
      if (hash) setShareLink(`${SITE_URL}/share/${hash}`);
      else {
        // Fallback: re-fetch current status if response shape unexpected
        const check = await axios.get(`${BACKEND_URL}/api/v1/share`, {
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
        `${BACKEND_URL}/api/v1/share`,
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
        <div className="mb-4 flex items-center justify-between md:hidden">
          <h1 className="text-lg font-semibold text-gray-900">Your brain</h1>
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="inline-flex items-center rounded-full border border-purple-200 bg-white px-3 py-1 text-xs font-medium text-purple-700 shadow-sm hover:bg-purple-50"
          >
            Filters
          </button>
        </div>
        <div className="flex flex-wrap justify-end gap-3">
          <SwitchButton
            onClick={() => {
              setModelOpen(true);
            }}
            variant="primary"
            text="Add Content"
            startIcon={<PlusIcon size="md"></PlusIcon>}
          ></SwitchButton>
          {shareLink ? (
            <>
              <SwitchButton
                onClick={handleShareOff}
                variant="secondary"
                text="Stop sharing"
                startIcon={<ShareIcon size="md" />}
                loading={shareLoading}
              />
              <div className="flex items-center gap-2 bg-white/90 px-3 py-1.5 rounded-full shadow-sm border border-purple-200 text-xs sm:text-sm max-w-full overflow-x-auto">
                <span className="text-gray-600">Share link:</span>
                <a
                  href={shareLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-700 underline truncate max-w-[200px]"
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
              startIcon={<ShareIcon size="md" />}
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
      </div>
    </div>
  );
}

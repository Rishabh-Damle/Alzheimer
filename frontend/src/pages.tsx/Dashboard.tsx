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
          headers: { Authorization: localStorage.getItem("Token") },
        });
        if ((response as any).data.hash) {
          setShareLink(`${SITE_URL}/share/${(response as any).data.hash}`);
        } else {
          setShareLink(null);
        }
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
        { headers: { Authorization: localStorage.getItem("Token") } }
      );
      setShareLink(`${SITE_URL}/share/${(response as any).data.hash}`);
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
        {
          headers: { Authorization: localStorage.getItem("Token") },
        }
      );
      setShareLink(null);
    } finally {
      setShareLoading(false);
    }
  }
  return (
    <div>
      <Sidebar setTypeFilter={setTypeFilter} />

      <div className="p-4 ml-72 min-h-screen bg-gray-100 ">
        <AddContentModel
          open={modelOpen}
          onClose={() => {
            setModelOpen(false);
          }}
        ></AddContentModel>
        <div className="flex justify-end gap-4 ">
          {" "}
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
              <div className="flex items-center gap-2 bg-white px-2 py-1 rounded shadow border border-purple-600 text-sm max-w-full overflow-x-auto">
                <span>Share link:</span>
                <a
                  href={shareLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline truncate max-w-[200px]"
                >
                  {shareLink}
                </a>
                <SwitchButton
                  onClick={() => {
                    navigator.clipboard.writeText(shareLink);
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

        <div className="flex flex-wrap gap-4 m-10">
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

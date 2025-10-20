import { SwitchButton } from "../components/SwitchButton";
import { PlusIcon } from "../components/icons/PlusIcon";
import { ShareIcon } from "../components/icons/ShareIcon";
import { Card } from "../components/card";
import { AddContentModel } from "../components/AddContentModel";
import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import { title } from "process";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { ContentType } from "../enums/ContentType";
export function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);
  const { contents, refresh, deleteContent } = useContent();
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const filteredContents = contents.filter((c) =>
    typeFilter === null ? true : c.type === typeFilter
  );

  useEffect(() => {
    refresh();
  }, [modelOpen]);
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
          <SwitchButton
            variant="secondary"
            text="Share Brain"
            startIcon={<ShareIcon size="md"></ShareIcon>}
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/brain/share`,
                {
                  share: true,
                },
                {
                  headers: {
                    Authorization: localStorage.getItem("Token"),
                  },
                }
              );
              const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
              console.log(shareUrl);
              alert(shareUrl);
            }}
          ></SwitchButton>
        </div>

        <div className="flex flex-wrap gap-4 m-10">
          {filteredContents.map(({ _id, type, link, title }) => (
            <Card
              type={type}
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

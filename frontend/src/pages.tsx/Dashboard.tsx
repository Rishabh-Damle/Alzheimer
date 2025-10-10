import { SwitchButton } from "../components/SwitchButton";
import { PlusIcon } from "../components/icons/PlusIcon";
import { ShareIcon } from "../components/icons/ShareIcon";
import { Card } from "../components/card";
import { AddContentModel } from "../components/AddContentModel";
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";

export function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);
  return (
    <div>
      <Sidebar></Sidebar>

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
          ></SwitchButton>
        </div>

        <div className="flex gap-4 m-10">
          <div>
            <Card
              type="twitter"
              title="First tweet"
              link="https://x.com/GautamGambhir/status/1972387249368318462"
            ></Card>
          </div>
          <div>
            <Card
              type="youtube"
              title="Primagen's vedio"
              link="https://www.youtube.com/embed/F1KgHCSpT_0?si=QCS2r7fxNWRerXhC"
            ></Card>
          </div>
        </div>
      </div>
    </div>
  );
}

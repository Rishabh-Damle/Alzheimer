import "./App.css";
import { SwitchButton } from "./components/SwitchButton";
import { PlusIcon } from "./components/icons/PlusIcon";
import { ShareIcon } from "./components/icons/ShareIcon";
import { Card } from "./components/card";
function App() {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 h-screen">
      <div className="flex justify-end gap-4 ">
        {" "}
        <SwitchButton
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

      <div className="flex justify-center gap-4 m-10">
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
  );
}

export default App;

import "./App.css";
import { SwitchButton } from "./components/SwitchButton";
import { PlusIcon } from "./components/icons/PlusIcon";
import { ShareIcon } from "./components/icons/ShareIcon";
function App() {
  return (
    
      <div><SwitchButton variant="secondary" text="Share Brain" startIcon={<ShareIcon size="md"></ShareIcon>}></SwitchButton>
      <SwitchButton variant="primary" text="Add Content" startIcon={<PlusIcon size="md"></PlusIcon>}></SwitchButton></div>
  );
}

export default App;

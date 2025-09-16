import "./App.css";
import { Button } from "./components/ui/Button";
import { PlusIcon } from "./components/icons/PlusIcon";
import { ShareIcon } from "./components/icons/ShareIcon";
function App() {
  return (
    <div className="flex justify-center align-middle ">
      <div className="mt-10 mx-2">
        <Button
          variant="primary"
          text="Share"
          size="md"
          startIcon={<PlusIcon size="lg"></PlusIcon>}
        ></Button>
      </div>

      <div className="mt-10 mx-2">
        <Button
          variant="secondary"
          text="Add content"
          size="md"
          startIcon={<ShareIcon size="lg"></ShareIcon>}
        ></Button>
      </div>
    </div>
  );
}

export default App;

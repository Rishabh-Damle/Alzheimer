//controlled component
import { CrossIcon } from "./icons/CrossIcon";
import { Button } from "./ui/Button";
import { Input } from "./Input";
interface EventType {
  open: Boolean;
  onClose?: () => void;
}
export const AddContentModel = ({ open, onClose }: EventType) => {
  return (
    <div>
      {open && (
        <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-80 flex justify-center items-center">
          <div className="flex flex-col justify-center">
            <span className="bg-white opacity-100 p-4 rounded">
              <div className="flex justify-end" onClick={onClose}>
                <CrossIcon></CrossIcon>
              </div>
              <div className="p-2.5">
                <Input placeholder={"Title"}></Input>
                <Input placeholder={"Link"}></Input>
              </div>
              <div className="flex justify-center p-2.5">
                <Button variant="primary" text="Submit" size="md"></Button>
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

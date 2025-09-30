//controlled component
import { CrossIcon } from "./icons/CrossIcon";
import { InputBox } from "./InputBox";
import { SwitchButton } from "./SwitchButton";
interface OpenAndClose {
  open: boolean;
  onclose: ;
}
export const AddContentModel = (props: OpenAndClose) => {
  return (
    <div>
      {props.open && (
        <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-80 flex justify-center items-center">
          <div className="flex flex-col justify-center">
            <span className="bg-white opacity-100 p-4 rounded">
              <div className="flex justify-end" onClick={onclose}>
                <CrossIcon></CrossIcon>
              </div>
              <div>
                <InputBox placeholder={"Title"}></InputBox>
                <InputBox placeholder={"Link"}></InputBox>
                <div className="flex justify-center items-center">
                  <SwitchButton variant="primary" text="Submit"></SwitchButton>
                </div>
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

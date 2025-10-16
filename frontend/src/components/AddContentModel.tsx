//controlled component
import { CrossIcon } from "./icons/CrossIcon";
import { Button } from "./ui/Button";
import { Input } from "./Input";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { ContentType } from "../enums/ContentType";
interface EventType {
  open: Boolean;
  onClose?: () => void;
}

export const AddContentModel = ({ open, onClose }: EventType) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<ContentType>(ContentType.Youtube);
  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/content/createYourContent`,
      {
        link,
        title,
        type,
      },
      {
        headers: {
          Authorization: localStorage.getItem("Token"),
          timeout: 5000,
        },
      }
    );

    console.log(response.data);
    onClose();
  }
  return (
    <div>
      {open && (
        <div>
          <div className="w-screen h-screen bg-slate-500 opacity-80 fixed top-0 left-0 flex  justify-center items-center"></div>
          <div>
            <div className="w-screen h-screen  opacity-100 fixed top-0 left-0 flex  justify-center items-center">
              <div className="flex flex-col justify-center ">
                <span className="bg-neutral-100 opacity-100 p-4 rounded-lg">
                  <div className="flex justify-end" onClick={onClose}>
                    <CrossIcon></CrossIcon>
                  </div>
                  <div className="p-2.5">
                    <Input reference={titleRef} placeholder={"Title"}></Input>
                    <Input reference={linkRef} placeholder={"Link"}></Input>
                  </div>
                  <div>
                    <h1 className="text-center font-bold text-xl text-neutral-600">
                      [Type]
                    </h1>
                    <div className="flex gap-1 p-4 justify-center pb-2">
                      <Button
                        text="Youtube"
                        variant={
                          type === ContentType.Youtube ? "primary" : "secondary"
                        }
                        size="sm"
                        onClick={() => {
                          setType(ContentType.Youtube);
                        }}
                      ></Button>
                      <Button
                        text="Twitter"
                        variant={
                          type === ContentType.Twitter ? "primary" : "secondary"
                        }
                        size="sm"
                        onClick={() => {
                          setType(ContentType.Twitter);
                        }}
                      ></Button>
                    </div>
                  </div>
                  <div className="flex justify-center p-2.5">
                    <Button
                      variant="primary"
                      text="Submit"
                      size="md"
                      onClick={addContent}
                    ></Button>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

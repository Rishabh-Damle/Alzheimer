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
      `${BACKEND_URL}/api/v1/createYourContent`,
      { link, title, type },
      {
        headers: {
          Authorization: localStorage.getItem("Token") || "",
          "Content-Type": "application/json",
        },
        withCredentials: false,
        timeout: 5000,
      }
    );

    console.log(response.data);
    onClose?.();
  }
  return (
    <div>
      {open && (
        <div className="fixed inset-0 z-30 flex items-center justify-center">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
          <div className="relative z-10 mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-purple-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Add content
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <CrossIcon></CrossIcon>
              </button>
            </div>
            <div className="space-y-3">
              <Input reference={titleRef} placeholder={"Title"}></Input>
              <Input reference={linkRef} placeholder={"Link"}></Input>
            </div>
            <div className="mt-5">
              <h3 className="text-sm font-medium text-neutral-700 mb-2">
                Type
              </h3>
              <div className="flex gap-3">
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
            <div className="mt-6 flex justify-end">
              <Button
                variant="primary"
                text="Submit"
                size="md"
                onClick={addContent}
              ></Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

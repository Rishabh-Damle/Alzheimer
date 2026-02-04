import { X } from "lucide-react";
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
          <div className="relative z-10 mx-4 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                Add New Content
              </h2>
              <button
                onClick={onClose}
                className="p-1 text-slate-400 hover:text-slate-600 transition-colors rounded-lg hover:bg-slate-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              <Input reference={titleRef} placeholder={"Title"}></Input>
              <Input reference={linkRef} placeholder={"Link"}></Input>
            </div>
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">
                Select Type
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

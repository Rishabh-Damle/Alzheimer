import { useEffect, useRef } from "react";
import { DocumentsIcon } from "./icons/DocumentsIcon";
import { GithubIcon } from "./icons/GithubIcon";
import { ShareIcon } from "./icons/ShareIcon";
import { TwitterIcon } from "./icons/TwitterIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";
import { DeleteIcon } from "./icons/DeleteIcon";
declare global {
  interface Window {
    twttr?: any;
  }
}
interface CardProps {
  title: string;
  link: string;
  type: "Twitter" | "Youtube" | "Document" | "Github";
  id: string;
  onDelete?: (id: string) => void;
}
const getTypeIcon = (type: string) => {
  if (type === "Youtube") return <YoutubeIcon />;
  if (type === "Twitter") return <TwitterIcon />;
  if (type === "Document") return <DocumentsIcon />;
  if (type === "Github") return <GithubIcon />;
  return null;
};
export function Card(props: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (props.type === "Twitter" && window.twttr && window.twttr.widgets) {
      window.twttr.widgets.load(cardRef.current);
    }
  }, [props.type, props.link]);
  return (
    <div ref={cardRef}>
      <div className="bg-white rounded-md p-4 max-w-72 min-h-48 min-w-72 border-gray-200 border font-sans">
        <div className="flex justify-between items-center ">
          <div className="flex items-center text-md">
            <div className="text-gray-500 pr-4">{getTypeIcon(props.type)}</div>
            <div className="text-md font-bold">{props.title}</div>
          </div>
          <div className="flex items-center">
            <div className="text-gray-500 pr-4 cursor-pointer flex items-center">
              <a href={props.link} target="_blank">
                <ShareIcon size="md"></ShareIcon>
              </a>
            </div>
            <div className="text-gray-500 cursor-pointer flex">
              <button
                className="cursor-pointer "
                onClick={() => props.onDelete?.(props.id)}
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        </div>
        <div className="pt-4">
          {props.type === "Youtube" && (
            <iframe
              className="w-full rounded"
              src={props.link.replace("watch", "embed").replace("/v=", "/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}

          {props.type == "Twitter" && (
            <blockquote className="twitter-tweet">
              <a href={props.link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
}

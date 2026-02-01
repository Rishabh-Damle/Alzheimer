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
export interface CardProps {
  title: string;
  link: string;
  type: "Twitter" | "Youtube" | "Document" | "Github" | "Instagram";
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
      <div className="bg-white/90 rounded-2xl p-4 sm:p-5 w-full max-w-xs min-h-48 border border-gray-100 shadow-sm hover:shadow-md transition-shadow font-sans">
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm sm:text-base">
            <div className="text-gray-400 pr-3">{getTypeIcon(props.type)}</div>
            <div className="font-semibold text-gray-900 line-clamp-2">
              {props.title}
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-gray-400 pr-3 cursor-pointer flex items-center">
              <a href={props.link} target="_blank">
                <ShareIcon size="md"></ShareIcon>
              </a>
            </div>
            <div className="text-gray-400 cursor-pointer flex">
              <button
                className="cursor-pointer"
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
              className="w-full aspect-video rounded-xl border border-gray-100"
              src={props.link.replace("watch", "embed").replace("?v=", "/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}

          <div className="w-full rounded pt-4">
            {props.type === "Twitter" && (
              <blockquote
                className="twitter-tweet"
                style={{ maxWidth: "100%" }}
              >
                <a href={props.link.replace("x.com", "twitter.com")}></a>
              </blockquote>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

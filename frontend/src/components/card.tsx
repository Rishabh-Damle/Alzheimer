import { useEffect, useRef } from "react";
import {
  Twitter,
  Youtube,
  FileText,
  Trash2,
  ExternalLink,
  Github,
  Instagram,
} from "lucide-react";
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
  if (type === "Youtube") return <Youtube className="w-5 h-5 text-red-600" />;
  if (type === "Twitter") return <Twitter className="w-5 h-5 text-blue-400" />;
  if (type === "Document")
    return <FileText className="w-5 h-5 text-blue-600" />;
  if (type === "Github") return <Github className="w-5 h-5 text-slate-800" />;
  if (type === "Instagram")
    return <Instagram className="w-5 h-5 text-pink-600" />;
  return <FileText className="w-5 h-5 text-slate-400" />;
};
const getYoutubeEmbedUrl = (url: string) => {
  try {
    const urlObj = new URL(url);
    let videoId = "";

    if (urlObj.hostname === "youtu.be") {
      videoId = urlObj.pathname.slice(1);
    } else if (
      urlObj.hostname.includes("youtube.com") &&
      urlObj.pathname === "/watch"
    ) {
      videoId = urlObj.searchParams.get("v") || "";
    } else if (
      urlObj.hostname.includes("youtube.com") &&
      urlObj.pathname.startsWith("/embed/")
    ) {
      videoId = urlObj.pathname.split("/")[2];
    }

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  } catch (e) {
  }
  return "";
};

export function Card(props: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const embedUrl =
    props.type === "Youtube" ? getYoutubeEmbedUrl(props.link) : "";

  useEffect(() => {
    if (props.type === "Twitter" && window.twttr && window.twttr.widgets) {
      window.twttr.widgets.load(cardRef.current);
    }
  }, [props.type, props.link]);
  return (
    <div ref={cardRef}>
      <div className="bg-white rounded-2xl p-5 w-full border border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden">
        <div className="flex justify-between items-center mb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
              {getTypeIcon(props.type)}
            </div>
            <h3 className="font-semibold text-slate-900 line-clamp-1">
              {props.title}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={props.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={() => props.onDelete?.(props.id)}
              className="p-2 text-slate-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {props.type === "Youtube" && embedUrl && (
            <iframe
              className="w-full aspect-video rounded-xl border border-slate-100"
              src={embedUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}

          <div className="w-full rounded">
            {props.type === "Twitter" && (
              <blockquote
                className="twitter-tweet"
                style={{ maxWidth: "100%", margin: 0 }}
              >
                <a
                  href={props.link
                    .replace("x.com", "twitter.com")
                    .split("?")[0]}
                ></a>
              </blockquote>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { ShareIcon } from "./icons/ShareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}
export function Card({ title, link, type }: CardProps) {
  return (
    <div>
      <div className="bg-white rounded-md p-4 max-w-72 min-h-48 min-w-72 border-gray-200 border">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-gray-500 pr-4">
              <ShareIcon size="md"></ShareIcon>
            </div>
            <div className="text-md">{title}</div>
          </div>
          <div className="flex items-center">
            <div className="text-gray-500 pr-4 cursor-pointer">
              <a href={link} target="_blank">
                <ShareIcon size="md"></ShareIcon>
              </a>
            </div>
            <div className="text-gray-500 cursor-pointer">
              <ShareIcon size="md"></ShareIcon>
            </div>
          </div>
        </div>
        <div className="pt-4">
          {type == "youtube" && (
            <iframe
              className="w-full rounded"
              src={link.replace("watch", "embed").replace("/v=", "/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}

          {type == "twitter" && (
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
}

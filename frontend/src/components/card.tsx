import { ShareIcon } from "./icons/ShareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "Twitter" | "Youtube";
}
export function Card(props: CardProps) {
  return (
    <div>
      <div className="bg-white rounded-md p-4 max-w-72 min-h-48 min-w-72 border-gray-200 border font-sans">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-gray-500 pr-4">
              <ShareIcon size="md"></ShareIcon>
            </div>
            <div className="text-md font-bold">{props.title}</div>
          </div>
          <div className="flex items-center">
            <div className="text-gray-500 pr-4 cursor-pointer">
              <a href={props.link} target="_blank">
                <ShareIcon size="md"></ShareIcon>
              </a>
            </div>
            <div className="text-gray-500 cursor-pointer">
              <ShareIcon size="md"></ShareIcon>
            </div>
          </div>
        </div>
        <div className="pt-4">
          {props.type == "Youtube" && (
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

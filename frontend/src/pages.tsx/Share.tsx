import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { Card } from "../components/card";
export function Share() {
  const { shareId } = useParams();
  const [contents, setContents] = useState([]);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSharedContent() {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/share/${shareId}`
        );
        setContents((response as any).data.content || []);
        setUsername((response as any).data.username || "");
      } catch (error) {
        setError("Invalid or expired share link.");
      }
      setLoading(false);
    }
    if (shareId) fetchSharedContent();
  }, [shareId]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-600">
        Loading shared content...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-red-500">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-transparent px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            {username ? `${username}'s Shared Content` : "Shared Content"}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            A snapshot of saved links shared with you.
          </p>
        </div>
        <div className="flex gap-5 flex-wrap">
          {contents.length === 0 && (
            <div className="text-sm text-gray-500">No content found.</div>
          )}
          {contents.map(({ _id, title, type, link }, idx) => (
            <Card
              key={_id || idx}
              id={_id}
              title={title}
              type={type}
              link={link}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

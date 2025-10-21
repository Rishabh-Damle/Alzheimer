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
          `${BACKEND_URL}/api/v1/brain/share/${shareId}`
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

  if (loading) return <div>Loading shared content...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">
        {username ? `${username}'s Shared Content` : "Shared Content"}
      </h2>
      <div className="flex gap-5 flex-wrap">
        {contents.length === 0 && <div>No content found.</div>}
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
  );
}

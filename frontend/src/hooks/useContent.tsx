import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

type Content = {
  _id: string;
  type: string;
  title: string;
  link: string;
};

export const useContent = () => {
  const [contents, setContents] = useState<Content[]>([]);

  const refresh = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/getYourContent`, {
        headers: { Authorization: localStorage.getItem("Token") || "" },
      });
      setContents(response.data.content);
    } catch (err) {
      console.error("Failed to fetch content:", err);
    }
  };

  const deleteContent = async (id: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/deleteYourContent`, {
        headers: { Authorization: localStorage.getItem("Token") || "" },
        data: { contentId: id },
      });
      setContents((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Failed to delete content:", err);
    }
  };

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 10000);
    return () => clearInterval(interval);
  }, []);

  return { contents, refresh, deleteContent };
};

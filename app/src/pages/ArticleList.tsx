import React, { useEffect, useState } from "react";
import { client } from "../api/microcmsClient";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

interface Content {
  id: string;
  title: string;
}

const ContentList: React.FC = () => {
  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const data = await client.get({
          endpoint: "blogs",
        });
        setContents(data.contents);
      } catch (error) {
        console.error("Error fetching contents:", error);
      }
    };

    fetchContents();
  }, []);

  return (
    <div>
      <Helmet>
        <title>記事一覧</title>
      </Helmet>
      <h1 className="text-2xl font-bold">Content List</h1>
      <ul>
        {contents.map((content) => (
          <li key={content.id} className="p-4 border-b">
            <p>{content.id}</p>
            <h2 className="text-xl">
              <Link
                to={`/article/${content.id}`}
                className="text-blue-500 hover:underline"
              >
                {content.title}
              </Link>
            </h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentList;

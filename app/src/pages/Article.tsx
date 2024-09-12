import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { client } from "../api/microcmsClient";
import { Helmet } from "react-helmet-async";
import NotFound from "./NotFound";
import Loading from "../components/Loading";

interface Content {
  id: string;
  title: string;
  content: string;
}

const Article: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await client.get({
          endpoint: "blogs",
          contentId: id,
        });
        setContent(data);
        setFadeIn(true);
      } catch (error) {
        console.error("Error fetching content:", error);
        navigate("/404");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchContent();
    } else {
      navigate("/404");
    }
  }, [id, navigate]);

  if (loading) {
    return <Loading />;
  }

  if (!content) {
    return <NotFound />;
  }

  return (
    <div className={`p-4 ${fadeIn ? "fade-in" : ""}`}>
      <Helmet>
        <title>{content.title}</title>
      </Helmet>
      <h1 className="text-3xl font-bold">{content.title}</h1>
      <div
        className="prose mt-4"
        dangerouslySetInnerHTML={{ __html: content.content }}
      />
      {/* CSSをインラインで定義 */}
      <style>
        {`
          .fade-in {
            opacity: 0;
            animation: fadeIn 1s ease-in-out forwards;
          }

          @keyframes fadeIn {
            to {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Article;

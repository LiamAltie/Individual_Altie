import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { client, Helmet } from "../utils/commonImports";
import { formatToJST } from "../utils/dateFormatter";
import LazyLoad from "react-lazyload";
import NotFound from "./NotFound";
import Loading from "../components/Loading";

interface Content {
  id: string;
  title: string;
  content: string;
  summary: string;
  featuredImage: {
    url: string;
  };
  category: {
    name: string;
  };
  tags: string;
  publishedAt: string;
  revisedAt: string;
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
    <div
      className={`max-w-screen-xl mx-auto pt-8 px-4 ${fadeIn ? "fade-in" : ""}`}
    >
      <Helmet>
        <title>{content.title}</title>
      </Helmet>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-9">
          <LazyLoad height={200} offset={100}>
            <img
              src={content.featuredImage.url}
              className="w-full aspect-video object-cover rounded-sm shadow-md transition-transform duration-300 ease-in-out transform group-hover:scale-105" // 画像を拡大するクラス
              alt={content.title}
            />
          </LazyLoad>
          <p className="font-bold mt-8">
            <span
              className={`py-1 px-2 text-white rounded-sm ${
                content.category.name === "Web開発"
                  ? "bg-blue-500"
                  : content.category.name === "ゲーム"
                  ? "bg-orange-500"
                  : content.category.name === "シナリオ制作"
                  ? "bg-purple-500"
                  : content.category.name === "写真"
                  ? "bg-teal-500"
                  : content.category.name === "日常"
                  ? "bg-yellow-500"
                  : "bg-gray-500"
              }`}
            >
              {content.category.name}
            </span>
            <span className="py-1 ml-2 text-gray-400">
              {formatToJST(content.publishedAt)}
            </span>
          </p>
          <h1 className="text-3xl font-bold mt-6">{content.title}</h1>
          <div
            className="prose mt-4"
            dangerouslySetInnerHTML={{ __html: content.content }}
          />
        </div>
        <div className="col-span-0 lg:col-span-3 border"></div>
      </div>

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

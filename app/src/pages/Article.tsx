import React, { useEffect, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { useParams, useNavigate } from "react-router-dom";
import { client, Helmet } from "../utils/commonImports";
import { formatToJST } from "../utils/dateFormatter";
import LazyLoad from "react-lazyload";
import NotFound from "./NotFound";
import Loading from "../components/Loading";
import { extractToc } from "../utils/tocExtractor";

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
  const [toc, setToc] = useState<{ id: string; text: string }[]>([]);
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  const NAVBAR_HEIGHT = 80;

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await client.get({
          endpoint: "blogs",
          contentId: id,
        });
        setContent(data);

        const tocItems = extractToc(data.content);
        setToc(tocItems);

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

  useEffect(() => {
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightBlock(block as HTMLElement);
    });
  }, [content]);

  // クリックしたときにオフセットを適用する関数
  const handleTocClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    targetId: string
  ) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = targetPosition - NAVBAR_HEIGHT;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth", // スムーズにスクロール
      });
    }
  };

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
      <LazyLoad height={200} offset={100}>
        <img
          src={content.featuredImage.url}
          className="article-feature-image rounded-sm shadow-sm"
          alt={content.title}
        />
      </LazyLoad>
      <div className="grid grid-cols-12 gap-8 pb-8 mt-8 h-full">
        <div className="col-span-12 lg:col-span-8 bg-white p-4 rounded-sm shadow-sm">
          <p className="font-bold">
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
          <h1 className="text-4xl font-bold mt-6 pb-4">{content.title}</h1>
          <p className="pb-4">{content.summary}</p>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: content.content }}
          />
        </div>
        <div className="col-span-0 lg:col-span-4 ">
          <ol className="p-4 rounded-md sticky top-16">
            <h2 className="font-bold mb-2">INDEX</h2>
            {toc.map((item) => (
              <li
                key={item.id}
                className={item.name === "h3" ? "ml-4" : ""} // h3の場合にインデントを追加
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleTocClick(e, item.id)}
                  className="hover:underline text-sm"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ol>
        </div>
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

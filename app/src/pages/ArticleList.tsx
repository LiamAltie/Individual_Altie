import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client, Link, Helmet } from "../utils/commonImports";
import { formatToJST } from "../utils/dateFormatter";
import { formatTags } from "../utils/TagFormatter";
import Loading from "../components/Loading";
import LazyLoad from "react-lazyload";

interface Content {
  id: string;
  title: string;
  summary: string;
  featuredImage: {
    url: string;
  };
  category: {
    name: string;
    name_en: string;
  };
  tags: string;
  publishedAt: string;
  revisedAt: string;
}

const ContentList: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const [contents, setContents] = useState<Content[]>([]);
  const [visibleContents, setVisibleContents] = useState<Content[]>([]);
  const [loadCount, setLoadCount] = useState(4);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        setLoading(true);
        const queries = {
          limit: 100,
          filters: category ? `category[equals]${category}` : undefined,
        };

        const data = await client.get({
          endpoint: "blogs",
          queries,
        });
        console.log(data);
        // フェッチしたデータをセット
        setContents(data.contents);
        setVisibleContents(data.contents.slice(0, loadCount));
      } catch (error) {
        console.error("Error fetching contents:", error);
      } finally {
        setLoading(false);
        setTimeout(() => setFadeIn(true), 50);
      }
    };

    fetchContents();
  }, [category, loadCount]);

  const loadMore = () => {
    setLoadCount((prevCount) => prevCount + 6);
  };

  if (loading) {
    return <Loading />; // ローディングコンポーネントを表示
  }

  return (
    <div
      className={`max-w-screen-xl mx-auto px-4 pb-16 transition-opacity duration-500 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <Helmet>
        <title>記事一覧</title>
      </Helmet>
      <div className="grid grid-cols-12 gap-8 mt-4">
        {visibleContents.map((content) => (
          <React.Fragment key={content.id}>
            <Link to={`/article/${content.id}`} className="col-span-4 group">
              <div className="rounded-sm shadow-md bg-white overflow-hidden">
                <LazyLoad height={200} offset={100}>
                  <img
                    src={content.featuredImage.url}
                    className="w-full aspect-video object-cover rounded-t-sm border-b transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                    alt={content.title}
                  />
                </LazyLoad>
                <div className="p-4">
                  <p className="text-xs font-bold">
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
                  <h2 className="text-lg font-bold mt-2">{content.title}</h2>
                  <p className="text-sm mt-2">{content.summary}</p>
                  <div className="mt-2">
                    {formatTags(content.tags).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-sm text-xs font-semibold mr-2 mt-2"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </React.Fragment>
        ))}
      </div>
      {visibleContents.length < 100 && (
        <div className="text-center mt-8">
          {visibleContents.length < contents.length ? (
            <button
              onClick={loadMore}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md w-full shadow-md"
            >
              Load More
            </button>
          ) : (
            <p className="text-gray-400"></p>
          )}
        </div>
      )}
    </div>
  );
};

export default ContentList;

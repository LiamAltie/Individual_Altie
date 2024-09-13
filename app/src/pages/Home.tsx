import React, { useEffect, useState } from "react";
import { client, Link, Helmet } from "../utils/commonImports";
import { formatToJST } from "../utils/dateFormatter";
import { formatTags } from "../utils/TagFormatter";
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
  };
  tags: string;
  publishedAt: string;
  revisedAt: string;
}

const ContentList: React.FC = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [visibleContents, setVisibleContents] = useState<Content[]>([]);
  const [loadCount, setLoadCount] = useState(4);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const data = await client.get({
          endpoint: "blogs",
          queries: { limit: 100 },
        });
        setContents(data.contents);
        setVisibleContents(data.contents.slice(0, loadCount));
      } catch (error) {
        console.error("Error fetching contents:", error);
      }
    };

    fetchContents();
  }, [loadCount]);

  const loadMore = () => {
    setLoadCount((prevCount) => prevCount + 6);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 pb-16">
      <Helmet>
        <title>記事一覧</title>
      </Helmet>
      <div className="grid grid-cols-12 gap-8 mt-4">
        {visibleContents.map((content, index) => (
          <React.Fragment key={content.id}>
            {index === 0 ? (
              <Link
                to={`/article/${content.id}`}
                className="relative rounded-sm col-span-12 group" // groupクラスを追加
              >
                {/* 最初のコンテンツ */}
                <div className="overflow-hidden rounded-sm">
                  {" "}
                  {/* 画像のオーバーフローを隠す */}
                  <LazyLoad height={200} offset={100}>
                    <img
                      src={content.featuredImage.url}
                      className="w-full aspect-video object-cover rounded-sm shadow-md transition-transform duration-300 ease-in-out transform group-hover:scale-105" // 画像を拡大するクラス
                      alt={content.title}
                    />
                  </LazyLoad>
                </div>
                <div className="absolute bottom-0 w-full p-4 text-white">
                  <div className="backdrop-blur-md bg-black/25 p-4 rounded-sm shadow-md">
                    <p className="text-xs font-semibold">
                      {content.category.name}
                      <span className="ml-2">
                        {formatToJST(content.publishedAt)}
                      </span>
                    </p>
                    <h2 className="text-2xl font-bold mt-2">{content.title}</h2>
                    <p className="text-sm mt-2">{content.summary}</p>
                    <div className="mt-2">
                      {formatTags(content.tags).map((tag, index) => (
                        <span
                          key={index}
                          className="inline-block border px-2 py-1 rounded-sm text-xs font-semibold mr-2 mt-2"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
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
            )}
          </React.Fragment>
        ))}
      </div>
      {/* Load More ボタン */}
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
            <p className="text-gray-400">That's all!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ContentList;

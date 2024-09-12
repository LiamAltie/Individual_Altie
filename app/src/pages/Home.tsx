import {
  useEffect,
  useState,
  client,
  Link,
  Helmet,
} from "../utils/commonImports";
import { formatToJST } from "../utils/dateFormatter";

interface Content {
  id: string;
  title: string;
  featuredImage: {
    url: string;
  };
  publishedAt: string;
  revisedAt: string;
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
        console.log(data.contents);
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
      <h1>Content List</h1>
      <ul>
        {contents.map((content) => (
          <li key={content.id} className="p-4 border-b">
            <p>{content.id}</p>
            <p>記事作成日：{formatToJST(content.publishedAt)}</p>
            <p>最終更新日：{formatToJST(content.revisedAt)}</p>
            <img src={content.featuredImage.url}></img>
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

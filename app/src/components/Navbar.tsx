import {
  FaCode,
  FaGamepad,
  FaPenFancy,
  FaCamera,
  FaLeaf,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation(); // 現在のURLパスを取得
  const repositoryName = "Individual_Altie"; // あなたのリポジトリ名に置き換えてください

  const categories = [
    {
      name: "Web開発",
      href: "web",
      icon: <FaCode />,
      borderColor: "border-blue-500", // 下線の色
      textColor: "text-blue-500", // 背景色
    },
    {
      name: "ゲーム",
      href: "game",
      icon: <FaGamepad />,
      borderColor: "border-orange-500",
      textColor: "text-orange-500",
    },
    {
      name: "シナリオ制作",
      href: "scenario",
      icon: <FaPenFancy />,
      borderColor: "border-purple-500",
      textColor: "text-purple-500",
    },
    {
      name: "写真",
      href: "photo",
      icon: <FaCamera />,
      borderColor: "border-teal-500",
      textColor: "text-teal-500",
    },
    {
      name: "日常",
      href: "life",
      icon: <FaLeaf />,
      borderColor: "border-yellow-500",
      textColor: "text-yellow-500",
    },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between h-10">
        {/* 左半分のロゴを左寄せ */}
        <div className="flex items-center bg-indigo-600 px-3 rounded-sm">
          <a href="/" className="text-lg tracking-wider font-bold text-white">
            ALTIE
          </a>
        </div>

        {/* 右半分のメニューを左寄せで均等に配置 */}
        <div className="flex w-1/2 space-x-6 justify-center">
          {categories.map((category) => {
            const fullHref = `/${repositoryName}/article-list/${category.href}`;
            const isActive =
              `/${repositoryName}${location.pathname}` === fullHref;
            return (
              <a
                key={category.name}
                href={fullHref}
                className={`flex-grow flex items-center justify-center ${
                  category.textColor
                } text-xs font-semibold py-3 ${
                  isActive ? `border-b-2 ${category.borderColor}` : ""
                }`}
              >
                <span className="mr-2 text-sm font-light">{category.icon}</span>
                {category.name}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

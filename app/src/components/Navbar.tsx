import {
  FaCode,
  FaGamepad,
  FaCamera,
  FaPenFancy,
  FaLeaf,
} from "react-icons/fa";

const Navbar = () => {
  const categories = [
    { name: "Web開発", href: "/", icon: <FaCode /> },
    { name: "ゲーム", href: "/projects", icon: <FaGamepad /> },
    { name: "シナリオ制作", href: "/security", icon: <FaPenFancy /> },
    { name: "写真", href: "/wiki", icon: <FaCamera /> },
    { name: "日常", href: "/security", icon: <FaLeaf /> },
  ];

  return (
    <nav className="backdrop-blur-lg bg-white/50 w-full shadow-sm sticky top-0 z-50 px-4">
      <div className="max-w-screen-xl mx-auto">
        {/* 1行目: ロゴ */}
        <div className="flex justify-between items-center h-10">
          <div className="flex items-center bg-indigo-600 px-3 rounded-sm">
            <a href="/" className="text-lg tracking-wider font-bold text-white">
              ALTIE
            </a>
          </div>
        </div>

        {/* 2行目: メインメニュー */}
        <div className="flex justify-between items-center h-6 pl-1 pb-1">
          <div className="flex space-x-6">
            {categories.map((category) => (
              <a
                key={category.name}
                href={category.href}
                className="flex items-center text-gray-600 text-xs hover:text-indigo-600 font-semibold"
              >
                <span className="mr-2 text-sm font-light">{category.icon}</span>
                {category.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const Navbar = () => {
  const categories = [
    { name: "Frontend Dev", href: "/" },
    { name: "Gaming", href: "/projects" },
    { name: "Photography", href: "/wiki" },
    { name: "Storytelling", href: "/security" },
    { name: "Lifestyle", href: "/security" },
  ];

  return (
    <nav className="bg-white w-full shadow-sm sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1行目: ロゴ */}
        <div className="flex justify-between items-center h-8">
          <div className="flex items-center bg-indigo-600 px-2 py-1 rounded-bl-md rounded-br-md">
            <a
              href="/"
              className="text-md tracking-widest font-bold text-gray-50"
            >
              ALTIE
            </a>
          </div>
        </div>
        {/* 2行目: メインメニュー */}
        <div className="flex justify-between items-center h-8 pl-1">
          <div className="flex space-x-6">
            {categories.map((category) => (
              <a
                key={category.name}
                href={category.href}
                className="text-gray-500 text-sm font-semibold"
              >
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

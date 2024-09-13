import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Article from "./pages/Article";
import ArticleList from "./pages/ArticleList";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import ScrollToTop from "./utils/scrollToTop";

const App: React.FC = () => {
  return (
    <Router basename={import.meta.env.DEV ? "/" : "/Individual_Altie/"}>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/article-list" element={<ArticleList />} />
        <Route path="/article-list/:category" element={<ArticleList />} />{" "}
        {/* :categoryの動的ルート */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

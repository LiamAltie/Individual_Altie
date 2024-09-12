import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ArticleList from "./pages/ArticleList";
import Article from "./pages/Article";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div>
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

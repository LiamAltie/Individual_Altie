import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  const styles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    textAlign: "center",
    background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "10rem",
    fontWeight: "bold",
    color: "#fff",
  };

  const messageStyle: React.CSSProperties = {
    fontSize: "1.5rem",
    color: "#fff",
    marginBottom: "20px",
  };

  const linkStyle: React.CSSProperties = {
    padding: "10px 20px",
    backgroundColor: "#fff",
    color: "#fda085",
    fontSize: "1rem",
    borderRadius: "5px",
    textDecoration: "none",
    transition: "background-color 0.3s ease",
  };

  return (
    <div style={styles}>
      <h1 style={titleStyle}>404</h1>
      <p style={messageStyle}>おっと、ページが存在しないようです。</p>
      <Link
        to="/"
        style={linkStyle}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#fda085")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
      >
        ホーム画面に戻る
      </Link>
    </div>
  );
};

export default NotFound;

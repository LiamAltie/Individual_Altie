import React, { useEffect, useState } from "react";

const Loading: React.FC = () => {
  const [fadeOut, setFadeOut] = useState(false); // フェードアウトの状態を追跡

  useEffect(() => {
    // フェードアウトを開始する
    const timeout = setTimeout(() => setFadeOut(true), 100); // 100ms後にフェードアウト開始
    return () => clearTimeout(timeout); // クリーンアップ
  }, []);

  const spinnerStyle: React.CSSProperties = {
    border: "4px solid rgba(0, 0, 0, 0.1)",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    borderLeftColor: "#09f",
    animation: "spin 1s ease infinite",
  };

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    opacity: fadeOut ? 0 : 1, // フェードアウトのトリガー
    transition: "opacity 0.5s ease-in-out", // 0.5秒のフェードアウトアニメーション
  };

  const textStyle: React.CSSProperties = {
    marginTop: "20px",
    fontSize: "1.2rem",
    color: "#555",
  };

  return (
    <div style={containerStyle}>
      <div style={spinnerStyle}></div>
      <p style={textStyle}>Loading article, please wait...</p>
      <style>
        {`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loading;

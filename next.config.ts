import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 정적 HTML로 변환
  basePath: "", // 퍼스널 페이지용 → 빈 문자열
  trailingSlash: true, // GitHub Pages 호환
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

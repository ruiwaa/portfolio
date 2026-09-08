import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 관리자 썸네일 업로드(Server Action으로 파일 전송)가 기본 1MB 제한에 걸리지 않도록 상향
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ofiuwsugnnltbhyydozz.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        // TODO: 테스트용 플레이스홀더 - 실제 썸네일을 Supabase Storage에 올리면 제거
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ],
  },
};

export default nextConfig;

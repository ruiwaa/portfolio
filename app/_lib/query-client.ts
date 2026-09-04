import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

// 요청(리퀘스트)마다 하나씩 - 서버 컴포넌트의 prefetch 전용 (React.cache로 요청 스코프 메모이제이션)
export const getQueryClient = cache(() => new QueryClient());

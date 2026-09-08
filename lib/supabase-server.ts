import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// 로그인 세션(쿠키)에 따라 요청마다 결과가 달라지므로 lib/supabase.ts의 lazy 싱글턴과 달리
// 매 호출마다 새로 생성한다 - 관리자 서버 액션/페이지 전용, 공개 페이지의 데이터 조회는 계속
// lib/supabase.ts(익명 클라이언트)를 사용한다
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables (SUPABASE_URL, SUPABASE_ANON_KEY)",
    );
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Server Component에서 호출된 경우 - 세션 갱신은 middleware가 담당하므로 무시해도 됨
        }
      },
    },
  });
}

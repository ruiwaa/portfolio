import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let supabaseClient: SupabaseClient | null = null;

// 지연 초기화 - 모듈 import 시점(빌드 타임 정적 분석 포함)이 아니라
// 실제 호출 시점에만 환경변수를 검사해서, env가 없어도 빌드 자체는 죽지 않게 한다
export function getSupabaseClient(): SupabaseClient {
  if (supabaseClient) {
    return supabaseClient;
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables (SUPABASE_URL, SUPABASE_ANON_KEY)",
    );
  }

  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseClient;
}

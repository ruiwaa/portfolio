import { signIn } from "@/app/_lib/admin-auth";
import { LAYOUT } from "@/lib/constants";

const fieldClassName =
  "mt-1 w-full rounded-lg border border-light-border bg-light-surface px-3 py-2 text-light-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:border-dark-border dark:bg-dark-surface dark:text-dark-text dark:focus-visible:outline-dark-accent";

export default async function AdminLoginPage({
  searchParams,
}: PageProps<"/admin/login">) {
  const { error } = await searchParams;

  return (
    <main
      className={`flex-1 ${LAYOUT.container} mx-auto ${LAYOUT.padding} py-20`}
    >
      <div className="mx-auto max-w-sm">
        <h1 className="h1 text-light-text dark:text-dark-text">Admin</h1>

        {error && (
          <p
            role="alert"
            className="mt-6 rounded-lg border border-light-accent bg-light-surface-dim px-4 py-3 badge text-light-accent dark:border-dark-accent dark:bg-dark-surface-dim dark:text-dark-accent"
          >
            {typeof error === "string" ? error : error[0]}
          </p>
        )}

        <form action={signIn} className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="badge text-light-text-secondary dark:text-dark-text-secondary"
            >
              이메일
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
              className={fieldClassName}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="badge text-light-text-secondary dark:text-dark-text-secondary"
            >
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className={fieldClassName}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-light-accent px-6 py-2 badge text-white transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:bg-dark-accent dark:text-dark-surface dark:focus-visible:outline-dark-accent"
          >
            로그인
          </button>
        </form>
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import TiptapEditor from "@/app/_components/admin/TiptapEditor";
import type { Post, PostCategory } from "@/types/posts";

const CATEGORIES: PostCategory[] = ["Study", "Troubleshooting", "Retrospective"];

function slugify(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{N}-]+/gu, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const inputClassName =
  "mt-1 w-full rounded-lg border border-light-border bg-light-surface px-3 py-2 text-light-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:border-dark-border dark:bg-dark-surface dark:text-dark-text dark:focus-visible:outline-dark-accent";

interface PostFormProps {
  post?: Post;
  action: (formData: FormData) => void;
  deleteAction?: () => void;
  error?: string;
}

export default function PostForm({
  post,
  action,
  deleteAction,
  error,
}: PostFormProps) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post));
  const [content, setContent] = useState(post?.content ?? "");

  return (
    <div>
      {error && (
        <p
          role="alert"
          className="mb-6 rounded-lg border border-light-accent bg-light-surface-dim px-4 py-3 badge text-light-accent dark:border-dark-accent dark:bg-dark-surface-dim dark:text-dark-accent"
        >
          {error}
        </p>
      )}

      <form action={action} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="badge text-light-text-secondary dark:text-dark-text-secondary"
          >
            제목
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={title}
            onChange={(event) => {
              const value = event.target.value;
              setTitle(value);
              if (!slugTouched) {
                setSlug(slugify(value));
              }
            }}
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="slug"
            className="badge text-light-text-secondary dark:text-dark-text-secondary"
          >
            슬러그 (URL)
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            required
            value={slug}
            onChange={(event) => {
              setSlug(event.target.value);
              setSlugTouched(true);
            }}
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="badge text-light-text-secondary dark:text-dark-text-secondary"
          >
            설명 (목록 카드에 표시, 선택)
          </label>
          <textarea
            id="description"
            name="description"
            rows={2}
            defaultValue={post?.description ?? ""}
            className={inputClassName}
          />
        </div>

        <div className="flex gap-6">
          <div>
            <label
              htmlFor="category"
              className="badge text-light-text-secondary dark:text-dark-text-secondary"
            >
              카테고리
            </label>
            <select
              id="category"
              name="category"
              required
              defaultValue={post?.category ?? CATEGORIES[0]}
              className={inputClassName}
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end pb-2.5">
            <label className="flex items-center gap-2 badge text-light-text-secondary dark:text-dark-text-secondary">
              <input
                type="checkbox"
                name="is_published"
                defaultChecked={post?.is_published ?? false}
              />
              공개
            </label>
          </div>
        </div>

        <div>
          <label
            htmlFor="thumnail_url"
            className="badge text-light-text-secondary dark:text-dark-text-secondary"
          >
            썸네일 이미지 URL
          </label>
          <input
            id="thumnail_url"
            name="thumnail_url"
            type="url"
            required
            defaultValue={post?.thumnail_url ?? ""}
            className={inputClassName}
          />
        </div>

        <div>
          <span className="badge text-light-text-secondary dark:text-dark-text-secondary">
            본문
          </span>
          <div className="mt-1">
            <TiptapEditor content={content} onChange={setContent} />
          </div>
          <input type="hidden" name="content" value={content} />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="rounded-full bg-light-accent px-6 py-2 badge text-white transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:bg-dark-accent dark:text-dark-surface dark:focus-visible:outline-dark-accent"
          >
            {post ? "저장" : "작성"}
          </button>

          {deleteAction && (
            <form
              action={deleteAction}
              onSubmit={(event) => {
                if (!window.confirm("이 게시물을 삭제할까요? 되돌릴 수 없습니다.")) {
                  event.preventDefault();
                }
              }}
            >
              <button
                type="submit"
                className="rounded-full border border-light-border px-6 py-2 badge text-light-text-secondary transition-colors duration-200 hover:border-light-accent hover:text-light-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:border-dark-border dark:text-dark-text-secondary dark:hover:border-dark-accent dark:hover:text-dark-accent dark:focus-visible:outline-dark-accent"
              >
                삭제
              </button>
            </form>
          )}
        </div>
      </form>
    </div>
  );
}

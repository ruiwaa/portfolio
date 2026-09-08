"use client";

import { useRef, useState, type DragEvent } from "react";
import { uploadThumbnail } from "@/app/_lib/admin-storage";

interface ThumbnailInputProps {
  value: string;
  onChange: (url: string) => void;
}

const fieldClassName =
  "mt-1 w-full rounded-lg border border-light-border bg-light-surface px-3 py-2 text-light-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:border-dark-border dark:bg-dark-surface dark:text-dark-text dark:focus-visible:outline-dark-accent";

export default function ThumbnailInput({
  value,
  onChange,
}: ThumbnailInputProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setIsUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.set("file", file);
    const result = await uploadThumbnail(formData);

    setIsUploading(false);

    if (result.error) {
      setUploadError(result.error);
      return;
    }

    if (result.url) {
      onChange(result.url);
    }
  }

  return (
    <div>
      <label
        htmlFor="thumnail_url"
        className="badge text-light-text-secondary dark:text-dark-text-secondary"
      >
        썸네일 이미지
      </label>

      <input
        id="thumnail_url"
        name="thumnail_url"
        type="url"
        required
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="이미지 URL을 입력하거나 아래에 파일을 끌어다 놓으세요"
        className={fieldClassName}
      />

      <div
        role="button"
        tabIndex={0}
        aria-label="썸네일 이미지 파일 업로드"
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        onDragOver={(event: DragEvent<HTMLDivElement>) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event: DragEvent<HTMLDivElement>) => {
          event.preventDefault();
          setIsDragging(false);
          const file = event.dataTransfer.files?.[0];
          if (file) handleFile(file);
        }}
        className={`mt-2 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-6 text-center transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:focus-visible:outline-dark-accent ${
          isDragging
            ? "border-light-accent bg-light-surface-dim dark:border-dark-accent dark:bg-dark-surface-dim"
            : "border-light-border dark:border-dark-border"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          tabIndex={-1}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) handleFile(file);
            event.target.value = "";
          }}
        />
        <span className="badge text-light-text-secondary dark:text-dark-text-secondary">
          {isUploading
            ? "업로드 중..."
            : "이미지를 끌어다 놓거나 클릭해서 업로드"}
        </span>
      </div>

      {uploadError && (
        <p
          role="alert"
          className="mt-2 badge text-light-accent dark:text-dark-accent"
        >
          {uploadError}
        </p>
      )}

      {value && (
        // eslint-disable-next-line @next/next/no-img-element -- 업로드 직후 임의 URL 미리보기라 next/image의 remotePatterns 화이트리스트와 무관하게 항상 보여줘야 함
        <img
          src={value}
          alt=""
          className="mt-3 h-32 w-full rounded-lg object-cover"
        />
      )}
    </div>
  );
}

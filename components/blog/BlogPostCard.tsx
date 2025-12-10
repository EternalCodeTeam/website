"use client";
import { Calendar, Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { StrapiBlogPost } from "@/lib/strapi";

interface BlogPostCardProps {
  post: StrapiBlogPost;
}

function getImageUrl(url: string) {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  const base = process.env.NEXT_PUBLIC_ETERNALCODE_STRAPI_URL || "";
  return `${base}${url}`;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <div className="group relative flex h-full flex-col">
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs transition-all duration-300 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-700 dark:bg-gray-800">
        {/* Obrazek lub placeholder */}
        {post.featuredImage && getImageUrl(post.featuredImage.url) ? (
          <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-900">
            <Image
              alt={post.featuredImage.alternativeText || post.title}
              className="object-cover transition-transform duration-300 group-hover:scale-105 group-focus:scale-105"
              fill
              priority={false}
              sizes="(max-width: 768px) 100vw, 50vw"
              src={getImageUrl(post.featuredImage.url)}
            />
          </div>
        ) : (
          <div className="relative flex aspect-video items-center justify-center bg-gray-100 dark:bg-gray-900">
            <span className="text-4xl text-gray-400 dark:text-gray-600">📰</span>
          </div>
        )}
        <div className="flex flex-1 flex-col p-6">
          {/* Tagi */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  className="rounded-full bg-blue-100 px-2 py-0.5 font-medium text-blue-800 text-xs dark:bg-blue-900 dark:text-blue-200"
                  key={tag.documentId}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
          {/* Tytuł */}
          <h3 className="mb-2 line-clamp-2 font-bold text-2xl text-gray-900 leading-tight dark:text-white">
            <Link
              className="after:absolute after:inset-0 focus:outline-hidden"
              href={`/blog/${post.slug}`}
            >
              {post.title}
            </Link>
          </h3>
          {/* Excerpt - nie ucinamy */}
          <p className="mb-4 line-clamp-3 text-base text-gray-600 dark:text-gray-300">
            {post.excerpt}
          </p>
          {/* Meta: autor, data, czas — zawsze widoczne */}
          <div className="flex items-center gap-3 text-gray-500 text-sm dark:text-gray-400">
            <span className="flex items-center gap-2">
              {post.author?.slug ? (
                <Link
                  className="relative z-10 flex items-center gap-2 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                  href={`/author/${post.author.slug}`}
                >
                  {post.author.avatar && (
                    <Image
                      alt={post.author.name}
                      className="rounded-full border border-gray-200 dark:border-gray-700"
                      height={24}
                      src={getImageUrl(post.author.avatar.url)}
                      width={24}
                    />
                  )}
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {post.author.name}
                  </span>
                </Link>
              ) : (
                <span className="font-medium text-gray-400 dark:text-gray-500">Brak autora</span>
              )}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="inline-block" size={16} />
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </span>
            <span className="flex items-center gap-1">
              <Timer className="inline-block" size={16} />
              {post.readingTime ? `${post.readingTime} min` : "— min"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

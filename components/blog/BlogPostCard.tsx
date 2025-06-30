"use client";
import { motion } from "framer-motion";
import { Calendar, Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { StrapiBlogPost } from "@/lib/strapi";

interface BlogPostCardProps {
  post: StrapiBlogPost;
}

function getImageUrl(url: string) {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  const base = process.env.NEXT_PUBLIC_ETERNALCODE_STRAPI_URL || '';
  return `${base}${url}`;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative h-full"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="block h-full rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 overflow-hidden"
        tabIndex={0}
      >
        {/* Obrazek lub placeholder */}
        {post.featuredImage && getImageUrl(post.featuredImage.url) ? (
          <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-900">
            <Image
              src={getImageUrl(post.featuredImage.url)}
              alt={post.featuredImage.alternativeText || post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105 group-focus:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
            />
          </div>
        ) : (
          <div className="relative aspect-video flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <span className="text-gray-400 dark:text-gray-600 text-4xl">📰</span>
          </div>
        )}
        <div className="flex flex-col h-full p-6">
          {/* Tagi */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag.id}
                  className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
          {/* Tytuł */}
          <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white leading-tight">
            {post.title}
          </h3>
          {/* Excerpt - nie ucinamy */}
          <p className="mb-4 text-gray-600 dark:text-gray-300 text-base">
            {post.excerpt}
          </p>
          {/* Spacer */}
          <div className="flex-grow" />
          {/* Meta: autor, data, czas - zawsze widoczne */}
          <div className="flex items-center gap-3 mt-auto text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-2">
              {post.author && post.author.slug ? (
                <Link href={`/author/${post.author.slug}`} className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {post.author.avatar && (
                    <Image
                      src={getImageUrl(post.author.avatar.url)}
                      alt={post.author.name}
                      width={24}
                      height={24}
                      className="rounded-full border border-gray-200 dark:border-gray-700"
                    />
                  )}
                  <span className="font-medium text-gray-800 dark:text-gray-200">{post.author.name}</span>
                </Link>
              ) : (
                <span className="font-medium text-gray-400 dark:text-gray-500">Brak autora</span>
              )}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={16} className="inline-block" />
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </span>
            <span className="flex items-center gap-1">
              <Timer size={16} className="inline-block" />
              {post.readingTime ? `${post.readingTime} min` : "— min"}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
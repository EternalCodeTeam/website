"use client";
import { BookOpen, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SlideIn } from "@/components/ui/motion/MotionComponents";

import type { StrapiAuthor } from "@/lib/strapi";
import { getImageUrl } from "@/lib/utils";

interface AuthorCardProps {
  author: StrapiAuthor;
  postCount?: number;
  compact?: boolean;
}

export default function AuthorCard({ author, postCount, compact = false }: AuthorCardProps) {
  if (compact) {
    return (
      <Link href={`/author/${author.slug}`}>
        <SlideIn
          className="group flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-xs transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
          delay={0}
          direction="up"
        >
          {author.avatar ? (
            <Image
              alt={author.name}
              className="rounded-full"
              height={48}
              src={getImageUrl(author.avatar.url)}
              width={48}
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-600 font-bold text-lg text-white">
              {author.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
              {author.name}
            </h3>
            {author.bio && (
              <p className="line-clamp-2 text-gray-600 text-sm dark:text-gray-300">{author.bio}</p>
            )}
          </div>
        </SlideIn>
      </Link>
    );
  }

  return (
    <SlideIn
      className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800"
      direction="up"
    >
      <div className="text-center">
        {/* Avatar */}
        <div className="mb-4 flex justify-center">
          <Link href={`/author/${author.slug}`}>
            {author.avatar ? (
              <Image
                alt={author.name}
                className="rounded-full border-4 border-white shadow-lg transition-transform hover:scale-105 dark:border-gray-700"
                height={80}
                src={getImageUrl(author.avatar.url)}
                width={80}
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-linear-to-br from-blue-500 to-purple-600 font-bold text-2xl text-white shadow-lg transition-transform hover:scale-105 dark:border-gray-700">
                {author.name.charAt(0).toUpperCase()}
              </div>
            )}
          </Link>
        </div>

        {/* Name */}
        <Link href={`/author/${author.slug}`}>
          <h3 className="mb-2 font-bold text-gray-900 text-xl transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400">
            {author.name}
          </h3>
        </Link>

        {/* Bio */}
        {author.bio && <p className="mb-4 text-gray-600 dark:text-gray-300">{author.bio}</p>}

        {/* Stats */}
        <div className="mb-4 flex justify-center gap-4 text-gray-500 text-sm dark:text-gray-400">
          {postCount !== undefined && (
            <div className="flex items-center gap-1">
              <BookOpen className="text-blue-600 dark:text-blue-400" size={16} />
              <span>{postCount} articles</span>
            </div>
          )}
          {author.email && (
            <a
              className="flex items-center gap-1 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
              href={`mailto:${author.email}`}
            >
              <Mail size={16} />
              <span>Email</span>
            </a>
          )}
        </div>
      </div>
    </SlideIn>
  );
}

"use client";
import { motion } from "framer-motion";
import { Mail, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { StrapiAuthor } from "@/lib/strapi";
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
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="group flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
        >
          {author.avatar ? (
            <Image
              src={getImageUrl(author.avatar.url)}
              alt={author.name}
              width={48}
              height={48}
              className="rounded-full"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-lg font-bold text-white">
              {author.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
              {author.name}
            </h3>
            {author.bio && (
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {author.bio}
              </p>
            )}
          </div>
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="text-center">
        {/* Avatar */}
        <div className="mb-4 flex justify-center">
          <Link href={`/author/${author.slug}`}>
            {author.avatar ? (
              <Image
                src={getImageUrl(author.avatar.url)}
                alt={author.name}
                width={80}
                height={80}
                className="rounded-full border-4 border-white shadow-lg transition-transform hover:scale-105 dark:border-gray-700"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-blue-500 to-purple-600 text-2xl font-bold text-white shadow-lg transition-transform hover:scale-105 dark:border-gray-700">
                {author.name.charAt(0).toUpperCase()}
              </div>
            )}
          </Link>
        </div>

        {/* Name */}
        <Link href={`/author/${author.slug}`}>
          <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400">
            {author.name}
          </h3>
        </Link>

        {/* Bio */}
        {author.bio && (
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            {author.bio}
          </p>
        )}

        {/* Stats */}
        <div className="mb-4 flex justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          {postCount !== undefined && (
            <div className="flex items-center gap-1">
              <BookOpen size={16} className="text-blue-600 dark:text-blue-400" />
              <span>{postCount} articles</span>
            </div>
          )}
          {author.email && (
            <a 
              href={`mailto:${author.email}`}
              className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Mail size={16} />
              <span>Email</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
} 
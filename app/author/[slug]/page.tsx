import Image from "next/image";
import { notFound } from "next/navigation";

import { AnimatedSection, AnimatedContainer, AnimatedElement } from "@/components/animations";
import BlogPostCard from "@/components/blog/BlogPostCard";
import { Pagination } from "@/components/ui/pagination";
import { getAuthorBySlug, getBlogPostsByAuthor } from "@/lib/strapi";
import { getImageUrl } from "@/lib/utils";

export async function generateMetadata(props: { params: { slug: string } }) {
  const { params } = await props;
  const author = await getAuthorBySlug(params.slug);
  if (!author) {
    return {
      title: "Author Not Found | EternalCode.pl",
      description: "This author does not exist on EternalCode.pl.",
    };
  }
  return {
    title: `${author.name} – Author | EternalCode.pl`,
    description: author.bio || `Read articles by ${author.name} on EternalCode.pl`,
    openGraph: {
      title: `${author.name} – Author | EternalCode.pl`,
      description: author.bio || `Read articles by ${author.name} on EternalCode.pl`,
      type: "profile",
      url: `https://eternalcode.pl/author/${author.slug}`,
      images: author.avatar?.url ? [getImageUrl(author.avatar.url)] : [],
      profile: {
        firstName: author.name.split(" ")[0],
        lastName: author.name.split(" ").slice(1).join(" ") || undefined,
        username: author.slug,
      },
    },
    twitter: {
      card: "summary",
      title: `${author.name} – Author | EternalCode.pl`,
      description: author.bio || `Read articles by ${author.name} on EternalCode.pl`,
      images: author.avatar?.url ? [getImageUrl(author.avatar.url)] : [],
    },
    alternates: {
      canonical: `https://eternalcode.pl/author/${author.slug}`,
    },
  };
}

export default async function AuthorPage(props: { params: { slug: string }, searchParams: { page?: string } }) {
  const { params, searchParams } = await props;
  const { slug } = params;
  if (!slug) notFound();
  const author = await getAuthorBySlug(slug);
  if (!author) notFound();
  const posts = await getBlogPostsByAuthor(slug);
  const ITEMS_PER_PAGE = 6;
  const currentPage = Math.max(1, parseInt(searchParams?.page || "1", 10));
  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-lightGray-100 dark:bg-gray-900 px-4 pt-40 pb-12">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* avatar, bio, email - STICKY */}
        <aside className="md:col-span-1">
          <AnimatedSection animationType="fadeLeft" className="sticky top-32 flex flex-col items-center md:items-start">
            {author.avatar && author.avatar.url && (
              <Image
                src={getImageUrl(author.avatar.url)}
                alt={author.name}
                width={160}
                height={160}
                className="rounded-full border-4 border-white shadow-lg dark:border-gray-700 mb-6"
              />
            )}
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{author.name}</h1>
            {author.bio && (
              <p className="mb-4 text-gray-600 dark:text-gray-300 text-center md:text-left">{author.bio}</p>
            )}
            {author.email && (
              <a href={`mailto:${author.email}`} className="text-blue-600 dark:text-blue-400 hover:underline mb-2">
                {author.email}
              </a>
            )}
          </AnimatedSection>
        </aside>

        {/* articles */}
        <main className="md:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Articles</h2>
          {posts.length > 0 ? (
            <>
              <AnimatedContainer as="div" staggerDelay={0.12} className="grid gap-8 md:grid-cols-2 mb-8">
                {paginatedPosts.map((post, i) => (
                  <AnimatedElement key={post.id} animationType="fadeUp" delay={i * 0.05}>
                    <BlogPostCard post={post} minimalist={true} />
                  </AnimatedElement>
                ))}
              </AnimatedContainer>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={posts.length}
                itemsPerPage={ITEMS_PER_PAGE}
                slug={slug}
                className="mt-8"
              />
            </>
          ) : (
            <div className="text-gray-500 dark:text-gray-400 italic">No articles found for this author <span className="not-italic">(yet!)</span></div>
          )}
        </main>
      </div>
    </div>
  );
} 
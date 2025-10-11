import Image from "next/image";
import { notFound } from "next/navigation";

import { AnimatedSection, AnimatedContainer, AnimatedElement } from "@/components/animations";
import BlogPostCard from "@/components/blog/BlogPostCard";
import { Pagination } from "@/components/ui/pagination";
import { getAuthorBySlug, getBlogPostsByAuthor } from "@/lib/strapi";
import { getImageUrl } from "@/lib/utils";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { params } = await props;
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
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

export default async function AuthorPage(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { params, searchParams } = await props;
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  if (!slug) notFound();
  const author = await getAuthorBySlug(slug);
  if (!author) notFound();
  const posts = await getBlogPostsByAuthor(slug);
  const ITEMS_PER_PAGE = 6;
  const currentPage = Math.max(1, parseInt(resolvedSearchParams?.page || "1", 10));
  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-lightGray-100 pb-12 pt-40 dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-12 md:grid-cols-3">
          {/* avatar, bio, email - STICKY */}
          <aside className="md:col-span-1">
            <AnimatedSection
              animationType="fadeLeft"
              className="sticky top-32 flex flex-col items-start"
            >
              {author.avatar && author.avatar.url && (
                <Image
                  src={getImageUrl(author.avatar.url)}
                  alt={author.name}
                  width={160}
                  height={160}
                  className="mb-6 rounded-full border-4 border-white shadow-lg dark:border-gray-700"
                />
              )}
              <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                {author.name}
              </h1>
              {author.bio && (
                <p className="mb-4 text-center text-gray-600 dark:text-gray-300 md:text-left">
                  {author.bio}
                </p>
              )}
              {author.email && (
                <a
                  href={`mailto:${author.email}`}
                  className="mb-2 text-blue-600 hover:underline dark:text-blue-400"
                >
                  {author.email}
                </a>
              )}
            </AnimatedSection>
          </aside>

          {/* articles */}
          <main className="md:col-span-2">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Articles</h2>
            {posts.length > 0 ? (
              <>
                <AnimatedContainer
                  as="div"
                  staggerDelay={0.12}
                  className="mb-8 grid gap-8 md:grid-cols-2"
                >
                  {paginatedPosts.map((post, i) => (
                    <AnimatedElement key={post.documentId} animationType="fadeUp" delay={i * 0.05}>
                      <BlogPostCard post={post} />
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
              <div className="italic text-gray-500 dark:text-gray-400">
                No articles found for this author <span className="not-italic">(yet!)</span>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

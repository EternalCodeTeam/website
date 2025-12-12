import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import BlogPostCard from "@/components/blog/blog-post-card";
import { SlideIn, StaggerContainer } from "@/components/ui/motion/motion-components";
import { Pagination } from "@/components/ui/pagination";
import { getAuthorBySlug, getBlogPostsByAuthor } from "@/lib/author";
import { getImageUrl } from "@/lib/utils";

type AuthorPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
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
      firstName: author.name.split(" ")[0],
      lastName: author.name.split(" ").slice(1).join(" ") || undefined,
      username: author.slug,
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

export default async function AuthorPage({ params, searchParams }: AuthorPageProps) {
  const { slug } = await params;
  const { page } = await searchParams;

  if (!slug) {
    notFound();
  }

  const author = await getAuthorBySlug(slug);
  if (!author) {
    notFound();
  }

  const posts = await getBlogPostsByAuthor(slug);
  const ITEMS_PER_PAGE = 6;
  const currentPage = Math.max(1, Number.parseInt(page || "1", 10));
  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-0 z-0 select-none">
        {/* Top Left - Teal/Cyan for "Author/Profile" */}
        <div className="absolute top-0 left-[-10%] h-[600px] w-[600px] rounded-full bg-teal-500/10 mix-blend-multiply blur-3xl filter dark:bg-teal-500/5 dark:mix-blend-screen" />
        {/* Middle Right - Purple for "Content" */}
        <div className="absolute top-[40%] right-[-10%] h-[600px] w-[600px] rounded-full bg-purple-500/10 mix-blend-multiply blur-3xl filter dark:bg-purple-500/5 dark:mix-blend-screen" />
        {/* Bottom Center - Blue */}
        <div className="-translate-x-1/2 absolute bottom-[-10%] left-1/2 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl filter dark:bg-blue-500/5" />

        <div className="absolute inset-0 h-full opacity-30 dark:opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
      </div>

      <div className="relative z-10 px-4 pt-48 pb-16 md:pt-56 md:pb-20">
        <div className="mx-auto max-w-7xl">
          {/* Author Profile Header */}
          <SlideIn className="mb-16 text-center" direction="down">
            <div className="mx-auto max-w-3xl">
              {!!author.avatar?.url && (
                <div className="mb-6 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-xl" />
                    <Image
                      alt={author.name}
                      className="relative rounded-full border-4 border-white shadow-2xl dark:border-gray-800"
                      height={160}
                      src={getImageUrl(author.avatar.url)}
                      width={160}
                    />
                  </div>
                </div>
              )}
              <h1 className="mb-4 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text font-extrabold text-5xl text-transparent tracking-tight md:text-6xl lg:text-7xl dark:from-white dark:via-gray-100 dark:to-white">
                {author.name}
              </h1>
              {!!author.bio && (
                <p className="mx-auto mb-6 max-w-2xl text-base text-gray-600 leading-relaxed md:text-lg dark:text-gray-400">
                  {author.bio}
                </p>
              )}
              {!!author.email && (
                <a
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-blue-600 shadow-sm ring-1 ring-gray-200 transition-all hover:bg-gray-50 hover:shadow-md dark:bg-gray-900/40 dark:text-blue-400 dark:ring-gray-800 dark:hover:bg-gray-800/60"
                  href={`mailto:${author.email}`}
                >
                  <svg
                    aria-label="Email icon"
                    className="h-5 w-5"
                    fill="none"
                    role="img"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  {author.email}
                </a>
              )}
            </div>
          </SlideIn>

          {/* Articles Section */}
          <section>
            <SlideIn className="mb-8" direction="up">
              <h2 className="font-bold text-3xl text-gray-900 dark:text-white">
                Articles by {author.name}
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {posts.length} {posts.length === 1 ? "article" : "articles"} published
              </p>
            </SlideIn>

            {posts.length > 0 ? (
              <>
                <StaggerContainer className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {paginatedPosts.map((post, i) => (
                    <SlideIn delay={i * 0.05} direction="up" key={post.documentId}>
                      <BlogPostCard post={post} />
                    </SlideIn>
                  ))}
                </StaggerContainer>
                {totalPages > 1 && (
                  <SlideIn direction="up">
                    <Pagination
                      className="mt-8"
                      currentPage={currentPage}
                      itemsPerPage={ITEMS_PER_PAGE}
                      slug={slug}
                      totalItems={posts.length}
                      totalPages={totalPages}
                    />
                  </SlideIn>
                )}
              </>
            ) : (
              <SlideIn direction="up">
                <div className="rounded-2xl bg-white p-12 text-center shadow-sm ring-1 ring-gray-200 dark:bg-gray-900/40 dark:ring-gray-800">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                    <svg
                      aria-label="Document icon"
                      className="h-8 w-8 text-gray-400 dark:text-gray-600"
                      fill="none"
                      role="img"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 font-semibold text-2xl text-gray-900 dark:text-white">
                    No articles yet
                  </h3>
                  <p className="text-gray-600 text-lg dark:text-gray-400">
                    {author.name} hasn't published any articles <span className="italic">yet</span>!
                  </p>
                </div>
              </SlideIn>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

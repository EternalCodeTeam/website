import Image from "next/image";
import { notFound } from "next/navigation";
import BlogPostCard from "@/components/blog/BlogPostCard";
import { SlideIn, StaggerContainer } from "@/components/ui/motion/MotionComponents";
import { Pagination } from "@/components/ui/pagination";
import { getAuthorBySlug, getBlogPostsByAuthor } from "@/lib/strapi";
import { getImageUrl } from "@/lib/utils";

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
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

  if (!slug) notFound();

  const author = await getAuthorBySlug(slug);
  if (!author) notFound();

  const posts = await getBlogPostsByAuthor(slug);
  const ITEMS_PER_PAGE = 6;
  const currentPage = Math.max(1, Number.parseInt(page || "1", 10));
  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-light-gray-100 pt-40 pb-12 dark:bg-gray-900">
      <div className="mx-auto max-w-(--breakpoint-xl) px-4">
        <div className="mx-auto grid max-w-(--breakpoint-xl) grid-cols-1 gap-12 md:grid-cols-3">
          <aside className="md:col-span-1">
            <SlideIn className="sticky top-32 flex flex-col items-start" direction="left">
              {author.avatar?.url && (
                <Image
                  alt={author.name}
                  className="mb-6 rounded-full border-4 border-white shadow-lg dark:border-gray-700"
                  height={160}
                  src={getImageUrl(author.avatar.url)}
                  width={160}
                />
              )}
              <h1 className="mb-2 font-bold text-3xl text-gray-900 dark:text-white">
                {author.name}
              </h1>
              {author.bio && (
                <p className="mb-4 text-center text-gray-600 md:text-left dark:text-gray-300">
                  {author.bio}
                </p>
              )}
              {author.email && (
                <a
                  className="mb-2 text-blue-600 hover:underline dark:text-blue-400"
                  href={`mailto:${author.email}`}
                >
                  {author.email}
                </a>
              )}
            </SlideIn>
          </aside>

          <main className="md:col-span-2">
            <h2 className="mb-6 font-bold text-2xl text-gray-900 dark:text-white">Articles</h2>
            {posts.length > 0 ? (
              <>
                <StaggerContainer className="mb-8 grid gap-8 md:grid-cols-2">
                  {paginatedPosts.map((post, i) => (
                    <SlideIn delay={i * 0.05} direction="up" key={post.documentId}>
                      <BlogPostCard post={post} />
                    </SlideIn>
                  ))}
                </StaggerContainer>
                <Pagination
                  className="mt-8"
                  currentPage={currentPage}
                  itemsPerPage={ITEMS_PER_PAGE}
                  slug={slug}
                  totalItems={posts.length}
                  totalPages={totalPages}
                />
              </>
            ) : (
              <div className="text-gray-500 italic dark:text-gray-400">
                No articles found for this author <span className="not-italic">(yet!)</span>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

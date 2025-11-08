import { Pagination } from "@/components/ui/pagination";
import { getAuthorBySlug, getBlogPostsByAuthor } from "@/lib/strapi";
import BlogPostCard from "@/components/blog/BlogPostCard";
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";
import { AnimatedContainer, AnimatedElement, AnimatedSection } from "@/components/animations";
import { notFound } from "next/navigation";

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
  const currentPage = Math.max(1, parseInt(page || "1", 10));
  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-light-gray-100 pb-12 pt-40 dark:bg-gray-900">
      <div className="mx-auto max-w-(--breakpoint-xl) px-4">
        <div className="mx-auto grid max-w-(--breakpoint-xl) grid-cols-1 gap-12 md:grid-cols-3">
          <aside className="md:col-span-1">
            <AnimatedSection
              animationType="fadeLeft"
              className="sticky top-32 flex flex-col items-start"
            >
              {author.avatar?.url && (
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

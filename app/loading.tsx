export default function Loading() {
  return (
    <div className="grid min-h-[40vh] place-items-center py-12">
      <div className="flex items-center gap-3 text-gray-500 text-sm dark:text-gray-400">
        <span
          aria-hidden="true"
          className="h-5 w-5 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none"
        />
        <span aria-live="polite">Loading content...</span>
      </div>
    </div>
  );
}

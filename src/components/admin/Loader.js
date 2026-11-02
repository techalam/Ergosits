export default function Loader() {
  return (
    <div role="status" className="flex justify-center items-center py-20">
      <span className="sr-only">Loading…</span>
      <div className="w-8 h-8 border-4 border-foreground border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

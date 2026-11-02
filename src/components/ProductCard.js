import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product, height = "h-30" }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full min-w-0 flex-col rounded-3xl border border-transparent bg-surface p-5 transition-colors duration-200 hover:border-line focus-visible:border-line"
    >
      <div className={`relative flex w-full shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-canvas ${height} md:h-56`}>
        <Image
          src={product.images?.[0] || "/placeholder.png"}
          width={220}
          height={220}
          className="h-full w-full object-contain transition-transform duration-300 motion-safe:group-hover:scale-[1.03]"
          alt={product.name}
        />
      </div>

      <div className="mt-5">
        <h3 className="min-h-10 text-base font-semibold leading-5 line-clamp-2">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-muted">&#8377;{product.price}</p>
      </div>

      <div className="mt-auto pt-4">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground decoration-1 underline-offset-4 group-hover:underline">
          View Product <span aria-hidden="true">&rarr;</span>
        </span>
      </div>
    </Link>
  );
}

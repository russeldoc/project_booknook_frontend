import Link from "next/link";
import { BOOK_PLACEHOLDER, CATEGORY_STYLES } from "@/lib/constants";

export default function BookCard({ book }) {
  const style = CATEGORY_STYLES[book.category] || CATEGORY_STYLES.Others;
  const soldOut = book.availableCopies <= 0;

  return (
    <article className="paper-card relative flex h-full flex-col overflow-hidden pl-3">
      {/* Coloured spine: the colour tells you the category */}
      <span
        className="absolute inset-y-0 left-0 w-3 border-r-2 border-[var(--edge)]"
        style={{ background: style.bg }}
        aria-hidden="true"
      />

      <div className="h-64 w-full overflow-hidden border-b-2 border-[var(--edge)] bg-base-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={book.image}
          alt={book.title}
          loading="lazy"
          className="h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = BOOK_PLACEHOLDER;
          }}
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="category-tag self-start" style={{ background: style.bg, color: style.fg }}>
          {book.category}
        </span>
        <h3 className="line-clamp-2 min-h-[2.6rem] font-display text-xl font-extrabold leading-tight">
          {book.title}
        </h3>
        <p className="line-clamp-1 text-sm opacity-80">by {book.author}</p>
        <p className="text-sm font-semibold">
          {soldOut
            ? "All copies are out"
            : `${book.availableCopies} of ${book.totalCopies} on the shelf`}
        </p>
        <Link href={`/books/${book._id}`} className="btn btn-primary btn-sm mt-auto">
          View Details
        </Link>
      </div>
    </article>
  );
}

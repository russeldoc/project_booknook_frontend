import Link from "next/link";
import { CATEGORIES, CATEGORY_STYLES } from "@/lib/constants";

export default function TopCategories() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-20" aria-labelledby="top-categories">
      <h2 id="top-categories" className="section-title">Top Categories</h2>
      <p className="section-lead">Pick a shelf and see what is on it.</p>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {CATEGORIES.map((name) => {
          const style = CATEGORY_STYLES[name];
          return (
            <li key={name}>
              <Link
                href={`/books?category=${name}`}
                className="paper-card relative block h-full overflow-hidden py-5 pl-9 pr-4 transition-transform hover:-translate-y-1"
              >
                <span
                  className="absolute inset-y-0 left-0 w-5 border-r-2 border-[var(--edge)]"
                  style={{ background: style.bg }}
                  aria-hidden="true"
                />
                <h3 className="font-display text-xl font-extrabold">{name}</h3>
                <p className="mt-1 text-sm">{style.blurb}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

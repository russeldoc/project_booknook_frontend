"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import { CATEGORIES, CATEGORY_STYLES } from "@/lib/constants";
import BookGrid from "./BookGrid";
import Spinner from "./Spinner";

export default function AllBooks({ initialCategory = "All" }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState(
    CATEGORIES.includes(initialCategory) ? initialCategory : "All"
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    api("/books", { auth: false })
      .then(setBooks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();
    return books.filter(
      (book) =>
        (category === "All" || book.category === category) &&
        (!term || book.title.toLowerCase().includes(term) || book.author.toLowerCase().includes(term))
    );
  }, [books, category, search]);

  return (
    <>
      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {["All", ...CATEGORIES].map((name) => {
            const active = category === name;
            const style = CATEGORY_STYLES[name];
            return (
              <button
                key={name}
                type="button"
                onClick={() => setCategory(name)}
                aria-pressed={active}
                className="category-tag cursor-pointer px-4 py-1 text-sm transition-colors"
                style={
                  active
                    ? { background: style?.bg || "var(--color-base-content)", color: style?.fg || "var(--color-base-100)" }
                    : { background: "var(--paper)" }
                }
              >
                {name}
              </button>
            );
          })}
        </div>

        <div>
          <label htmlFor="book-search" className="sr-only">Search by title or author</label>
          <input
            id="book-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title or author"
            className="input w-full md:w-80"
          />
        </div>
      </div>

      <div className="mt-8">
        {loading ? (
          <Spinner />
        ) : error ? (
          <p role="alert" className="paper-card p-6 text-error">{error}</p>
        ) : visible.length === 0 ? (
          <div className="paper-card p-8 text-center">
            <p className="font-display text-xl font-bold">No books match that search.</p>
            <p className="mt-1">Try a different category or a shorter search.</p>
          </div>
        ) : (
          <BookGrid books={visible} />
        )}
      </div>
    </>
  );
}

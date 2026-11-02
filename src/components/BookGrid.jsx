import BookCard from "./BookCard";

// 3 cards per row on desktop, equal heights.
export default function BookGrid({ books }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
}

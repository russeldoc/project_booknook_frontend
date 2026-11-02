import AllBooks from "@/components/AllBooks";

export const metadata = { title: "All Books" };

export default async function BooksPage({ searchParams }) {
  const { category } = await searchParams;

  return (
    <section className="mx-auto max-w-7xl px-4 pt-12">
      <h1 className="section-title">All Books</h1>
      <p className="section-lead">Every book on the BookNook shelf, newest first.</p>
      <AllBooks initialCategory={category} />
    </section>
  );
}

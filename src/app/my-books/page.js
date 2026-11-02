import MyBooks from "@/components/MyBooks";

export const metadata = { title: "My Books" };

export default function MyBooksPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-12">
      <h1 className="section-title">My Books</h1>
      <p className="section-lead">The books you added. Edit the details or take a book off the shelf.</p>
      <MyBooks />
    </section>
  );
}

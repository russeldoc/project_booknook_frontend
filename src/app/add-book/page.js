import AddBookForm from "@/components/AddBookForm";

export const metadata = { title: "Add Book" };

export default function AddBookPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-12">
      <h1 className="section-title">Add a Book</h1>
      <p className="section-lead">Share a book from your shelf. Other readers can borrow it for a week.</p>
      <AddBookForm />
    </section>
  );
}

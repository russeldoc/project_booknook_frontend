import MyBorrows from "@/components/MyBorrows";

export const metadata = { title: "My Borrows" };

export default function MyBorrowsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-12">
      <h1 className="section-title">My Borrows</h1>
      <p className="section-lead">Books you have on loan. Return them when you are done reading.</p>
      <MyBorrows />
    </section>
  );
}

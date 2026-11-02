const steps = [
  {
    title: "Find a book",
    text: "Browse the shelf or search by title and author, then open any book to see who added it.",
  },
  {
    title: "Borrow it",
    text: "Confirm your details in the borrow window. The book is yours for seven days.",
  },
  {
    title: "Return it",
    text: "Finished early? Press Return Book in My Borrows and the copy goes back on the shelf.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-20" aria-labelledby="how-it-works">
      <h2 id="how-it-works" className="section-title">How Borrowing Works</h2>
      <p className="section-lead">Three steps, and you never need a library card.</p>

      <ol className="mt-8 grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title} className="paper-card flex h-full flex-col gap-3 p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[var(--edge)] bg-secondary font-display text-xl font-extrabold text-secondary-content">
              {index + 1}
            </span>
            <h3 className="font-display text-2xl font-extrabold">{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(
  /\/+$/,
  ""
);

export const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"];

// Each category has its own "spine" colour so a book's shelf is readable at a glance.
export const CATEGORY_STYLES = {
  Fiction: { bg: "#2744d6", fg: "#ffffff", blurb: "Novels and short stories" },
  Science: { bg: "#0f766e", fg: "#ffffff", blurb: "How the world works" },
  History: { bg: "#7b2d8e", fg: "#ffffff", blurb: "Stories from the past" },
  Kids: { bg: "#ffcf33", fg: "#101a2e", blurb: "Picture books and early readers" },
  Others: { bg: "#5b6b7f", fg: "#ffffff", blurb: "Everything that fits nowhere else" },
};

export const BOOK_PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400"><rect width="300" height="400" fill="#cfd6e2"/><rect x="90" y="110" width="120" height="170" rx="6" fill="#f3f5f8" stroke="#101a2e" stroke-width="4"/><path d="M110 150h80M110 180h80M110 210h50" stroke="#101a2e" stroke-width="4" stroke-linecap="round"/></svg>`
  );

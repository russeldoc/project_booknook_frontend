"use client";

import { useState } from "react";
import { BOOK_PLACEHOLDER, CATEGORIES } from "@/lib/constants";

// Shared inputs for the Add Book form and the Edit Book modal.
// Uncontrolled: the parent reads them with `new FormData(form)`.
export default function BookFields({ book, imageRequired = false, idPrefix = "book" }) {
  const [preview, setPreview] = useState(book?.image || "");

  function handleFile(event) {
    const file = event.target.files?.[0];
    setPreview(file ? URL.createObjectURL(file) : book?.image || "");
  }

  return (
    <div className="grid gap-4">
      <div>
        <label className="field-label" htmlFor={`${idPrefix}-title`}>Book Title</label>
        <input
          id={`${idPrefix}-title`}
          name="title"
          defaultValue={book?.title}
          required
          maxLength={150}
          placeholder="Title of the book"
          className="input w-full"
        />
      </div>

      <div>
        <label className="field-label" htmlFor={`${idPrefix}-author`}>Author Name</label>
        <input
          id={`${idPrefix}-author`}
          name="author"
          defaultValue={book?.author}
          required
          maxLength={100}
          placeholder="Who wrote it"
          className="input w-full"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor={`${idPrefix}-category`}>Category</label>
          <select
            id={`${idPrefix}-category`}
            name="category"
            defaultValue={book?.category || ""}
            required
            className="select w-full"
          >
            <option value="" disabled>Choose a category</option>
            {CATEGORIES.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="field-label" htmlFor={`${idPrefix}-copies`}>Total Copies</label>
          <input
            id={`${idPrefix}-copies`}
            name="totalCopies"
            type="number"
            min="1"
            max="1000"
            step="1"
            defaultValue={book?.totalCopies ?? 1}
            required
            className="input w-full"
          />
        </div>
      </div>

      <div>
        <label className="field-label" htmlFor={`${idPrefix}-image`}>
          Book Image {!imageRequired && <span className="font-normal opacity-70">(leave empty to keep the current one)</span>}
        </label>
        <input
          id={`${idPrefix}-image`}
          name="image"
          type="file"
          accept="image/*"
          required={imageRequired}
          onChange={handleFile}
          className="file-input w-full"
        />
        {preview && (
          <div className="mt-3 h-40 w-28 overflow-hidden rounded-lg border-2 border-[var(--edge)] bg-base-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Selected book cover"
              className="h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = BOOK_PLACEHOLDER;
              }}
            />
          </div>
        )}
      </div>

      <div>
        <label className="field-label" htmlFor={`${idPrefix}-description`}>Short Description</label>
        <textarea
          id={`${idPrefix}-description`}
          name="description"
          defaultValue={book?.description}
          required
          maxLength={2000}
          rows={4}
          placeholder="What is the book about?"
          className="textarea w-full"
        />
      </div>
    </div>
  );
}

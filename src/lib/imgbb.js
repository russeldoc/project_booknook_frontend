const MAX_SIZE = 5 * 1024 * 1024;

export async function uploadImage(file) {
  const key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!key) throw new Error("The image upload key is missing. Add NEXT_PUBLIC_IMGBB_API_KEY.");
  if (!file.type.startsWith("image/")) throw new Error("Please choose an image file.");
  if (file.size > MAX_SIZE) throw new Error("The image must be smaller than 5 MB.");

  const form = new FormData();
  form.append("image", file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
    method: "POST",
    body: form,
  });
  const json = await res.json().catch(() => ({}));
  const url = json?.data?.url;
  if (!res.ok || !url) throw new Error("The image upload failed. Try a different image.");
  return url;
}

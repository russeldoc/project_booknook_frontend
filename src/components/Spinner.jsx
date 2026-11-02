export default function Spinner({ className = "py-20" }) {
  return (
    <div role="status" className={`flex justify-center ${className}`}>
      <span className="loading loading-spinner loading-lg text-primary" aria-hidden="true" />
      <span className="sr-only">Loading</span>
    </div>
  );
}

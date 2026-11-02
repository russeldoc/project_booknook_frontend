import ProfileCard from "@/components/ProfileCard";

export const metadata = { title: "My Profile" };

export default function ProfilePage() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-12">
      <h1 className="section-title text-center">My Profile</h1>
      <ProfileCard />
    </section>
  );
}

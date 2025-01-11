import NextLogo from "./next-logo";
import SupabaseLogo from "./supabase-logo";

export default function Header({ text }: { text: string }) {
  return (
    <div className="flex flex-col gap-16">
      <p className="">{text}</p>
    </div>
  );
}

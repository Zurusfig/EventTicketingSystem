import Link from "next/link";

export default function TopMenuItems({ text, pageRoute }: { text: string, pageRoute: string }) {
  return (
    <div>
      <Link href={pageRoute} className="cursor-pointer hover:scale-105 px-6 py-2 transition-all duration-300 text-md">
        {text}
      </Link>
    </div>
  );
}
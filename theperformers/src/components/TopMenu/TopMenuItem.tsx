import Link from "next/link";

export default function TopMenuItems({ text, pageRoute }: { text: string, pageRoute: string }) {
  return (
    <div>
      <Link href={pageRoute} className="cursor-pointer px-6 py-2 transition-all duration-300 text-md md:text-sm lg:text-lg">
        <div className="hover:scale-102 transition-all duration-300">{text}</div>
      </Link>
    </div>
  );
}
import Link from "next/link";

export default function TopMenuItems({ text, pageRoute }: { text: string, pageRoute: string }) {
  return (
    <div className="hover:scale-102 transition-all duration-300">
      <Link href={pageRoute} className="cursor-pointer px-6 py-2 transition-all duration-300 text-md md:text-sm lg:text-lg hover:scale-102 transition-all duration-300">
        {text}
      </Link>
    </div>
  );
}
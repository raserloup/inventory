import Link from "next/link";

export default function ThemeLink({ href, children }) {
  return (
    <Link href={href} className="text-blue-600 hover:underline">
      {children}
    </Link>
  );
}

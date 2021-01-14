import Link from "next/link";

export default function Header() {
  return (
    <header className="md:sticky md:top-0 md:z-50">
      <div className="py-2 px-4 bg-indigo-700">
        <div className="flex justify-between">
          <div>Logo</div>
          <nav className="flex">
            <Link href="/">
              <a>Home</a>
            </Link>
            <Link href="/todos">
              <a>Todos</a>
            </Link>
            <Link href="/todos">
              <a>Todos</a>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

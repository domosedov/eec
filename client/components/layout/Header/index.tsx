import Link from "next/link";
import ThemeSwitcher from "../ThemeSwitcher";

export default function Header() {
  return (
    <header className="md:sticky md:top-0 md:z-50">
      <div className="py-2 px-4 bg-indigo-700">
        <div className="flex justify-between">
          <div>Logo</div>
          <nav className="flex gap-2">
            <Link href="/">
              <a>Home</a>
            </Link>
            <Link href="/user/register">
              <a>Регистрация</a>
            </Link>
            <Link href="/todos">
              <a>Todos</a>
            </Link>
          </nav>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}

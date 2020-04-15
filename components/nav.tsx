import Link from "next/link";

export default function Nav() {
  return (
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        Examples
        <ul>
          <li>
            <Link href="/examples/static-rendering">
              <a>Static Rendering</a>
            </Link>
          </li>
          <li>
            <Link href="/examples/server-side-rendering">
              <a>Server-Side Rendering</a>
            </Link>
          </li>
        </ul>
      </li>
    </ul>
  );
}

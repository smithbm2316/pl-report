import Link from 'next/link';

export const NextLink = ({ href, children }) => (
  <Link href={href}>
    <a className="font-medium text-purple-800 hover:underline">{children}</a>
  </Link>
);

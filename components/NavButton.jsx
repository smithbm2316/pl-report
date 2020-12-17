import Link from 'next/link';

const NavIcon = ({ icon, styles, text }) => (
  <>
    <svg
      className={styles}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      {icon === 'today' && (
        <path
          fillRule="evenodd"
          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
          clipRule="evenodd"
        />
      )}
      {icon === 'table' && (
        <path
          fillRule="evenodd"
          d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
          clipRule="evenodd"
        />
      )}
      {icon === 'favorite' && (
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      )}
    </svg>
    <p className="text-xs font-semibold text-emerald-300 sm:text-base">
      {text}
    </p>
  </>
);

const NavButton = ({ icon, title, link }) => (
  <Link href={link} passHref>
    <a className="flex flex-col items-center justify-center flex-1 sm:flex-none sm:w-32 sm:h-30 active:bg-purple-800 hover:bg-purple-800">
      <NavIcon icon={icon} styles="w-8 sm:w-10 text-emerald-400" text={title} />
    </a>
  </Link>
);

export default NavButton;

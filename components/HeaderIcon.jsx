import Link from 'next/link';

const HeaderIcon = ({ icon, route }) => (
  <Link href={`/matchday/${route}`} passHref>
    <button>
      <svg
        className="w-10 h-10 p-1 mx-1 text-green-400 rounded-lg hover:bg-gray-800 hover:shadow-inner"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        {icon === 'leftArrow' && (
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
            clipRule="evenodd"
          />
        )}
        {icon === 'rightArrow' && (
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
            clipRule="evenodd"
          />
        )}
      </svg>
    </button>
  </Link>
);

export default HeaderIcon;

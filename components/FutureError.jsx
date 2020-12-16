import Link from 'next/link';

const Future = ({ matches }) => (
  <div className="flex flex-col items-center justify-center w-screen h-screen">
    <h2 className="text-center">Future Season</h2>
    <p className="mx-16 my-2 text-center">
      Sorry, this is a future season that we do not have data for yet.
    </p>
    <Link
      href={`/matchday/${matches[0].season.startDate.substring(0, 4)}-${
        matches[0].matchday
      }`}
      passHref
    >
      <button className="px-6 py-4 text-sm font-semibold text-green-300 bg-purple-700 hover:bg-purple-800 active:bg-purple-800 rounded-md">
        Last matchday of current season
      </button>
    </Link>
  </div>
);
export default Future;

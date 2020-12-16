import Link from 'next/link';

const RestrictedError = () => (
  <div className="flex flex-col items-center justify-center w-screen h-screen">
    <h1>Restricted data</h1>
    <p className="mx-6 my-2 text-center">
      Sorry, the season you requested is not accessible in this app with the
      tier of data we have access to 😔
    </p>
    <Link href="/" passHref>
      <button className="px-6 py-4 text-sm font-semibold text-green-300 bg-purple-700 hover:bg-purple-800 active:bg-purple-800 rounded-md">
        Go to homepage
      </button>
    </Link>
  </div>
);

export default RestrictedError;

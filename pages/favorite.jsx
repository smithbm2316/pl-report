import Head from 'next/head';
import Nav from '../components/Nav';

export default function Favorite() {
  return (
    <>
      <Head>
        <title>PL Report: Favorite Team</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="w-11/12 mx-auto">
        <h1 className="my-4 text-center">Favorite Team</h1>
      </header>
      <main className="w-11/12 mx-auto">
        <form className="flex flex-col">
          <legend>What is your favorite PL team?</legend>
          <div>
            <input type="radio" value="133612" name="team" />
            <label for="133612">Manchester United</label>
          </div>
          <div>
            <input type="radio" value="133616" name="team" />
            <label for="133616">Tottenham Hotspur</label>
          </div>
          <button className="px-4 py-2 my-2 font-medium text-green-400 bg-purple-700 rounded-md">
            Save team!
          </button>
        </form>
      </main>
      <Nav />
    </>
  );
}

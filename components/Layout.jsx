import NavButton from './NavButton';

export default function Layout({ children }) {
  return (
    <>
      <main className="w-11/12 h-screen mx-auto grid grid-cols-1 grid-rows-mobile">
        {children}
      </main>
      <nav
        id="tabBar"
        className="fixed bottom-0 flex w-full bg-purple-600 sm:justify-evenly"
      >
        <NavButton icon="table" link="/table" title="Table" />
        <NavButton icon="home" link="/" title="Home" />
        <NavButton icon="favorite" link="/favorite" title="Favorite" />
      </nav>
    </>
  );
}

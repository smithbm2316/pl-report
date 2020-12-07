import NavButton from './NavButton';

export default function Layout({ children }) {
  return (
    <>
      <main className="w-11/12 mx-auto my-4 grid grid-cols-1">{children}</main>
      <nav
        id="tabBar"
        className="fixed bottom-0 flex w-full bg-purple-600 sm:justify-evenly"
      >
        <NavButton icon="table" link="/table" title="Table" />
        <NavButton icon="home" link="/home" title="Home" />
        <NavButton icon="favorite" link="/favorite" title="Favorite" />
      </nav>
    </>
  );
}

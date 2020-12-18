import NavButton from './NavButton';

const Nav = () => (
  <nav
    id="tabBar"
    className="fixed bottom-0 flex w-full h-16 bg-purple-600 sm:h-20 sm:justify-evenly"
  >
    <NavButton icon="table" link="/table" title="Table" />
    <NavButton icon="today" link="/" title="Today" />
    <NavButton icon="matchday" link="/currentMatchday" title="Matchdays" />
    {/* <NavButton icon="favorite" link="/favorite" title="Favorite" /> */}
  </nav>
);

export default Nav;

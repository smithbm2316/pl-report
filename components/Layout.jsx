const Layout = ({ children }) => (
  <main className="w-11/12 h-screen mx-auto grid grid-cols-1 grid-rows-mobile">
    {children}
    <div className="h-20 sm:h-24"></div>
  </main>
);

export default Layout;

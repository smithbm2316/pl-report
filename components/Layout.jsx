const Layout = ({ children }) => (
  <main className="w-11/12 min-h-screen mx-auto grid grid-cols-1 auto-rows-max md:grid-cols-2 gap-y-6 md:gap-x-8 md:gap-y-8 2xl:grid-cols-3 2xl:w-1420">
    {children}
    <div className="h-20 sm:h-24"></div>
  </main>
);

export default Layout;

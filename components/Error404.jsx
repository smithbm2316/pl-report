const NoMatchdayDataFound = () => (
  <div className="flex flex-col items-center justify-center w-screen h-screen">
    <h2 className="text-center">Matchday Data Not Found</h2>
    <p className="mx-16 my-2 text-center">
      Sorry, our source unfortunately does not have data on the matchday you are
      trying to view.
    </p>
  </div>
);
export default NoMatchdayDataFound;

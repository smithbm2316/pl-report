import HeaderIcon from './HeaderIcon';

const Header = ({ page, matchInfo }) => {
  function getMatchday(direction) {
    const currentMatchday = parseInt(matchInfo.intRound);
    const currentSeason = matchInfo.strSeason;
    const [seasonBegin, seasonEnd] = currentSeason.split('-');
    // if direction is 'prev'
    if (direction === 'prev') {
      // if the currentMatchday is 1, then we want to go back a year to the last week
      if (currentMatchday === 1) {
        return `${parseInt(seasonBegin) - 1}-${parseInt(seasonEnd) - 1}-38`;
      }
      // else just go back a matchday
      else {
        return `${currentSeason}-${currentMatchday - 1}`;
      }
    }
    // if direction is 'next'
    else {
      // if we are on the last matchday, then go to first matchday of next season
      if (currentMatchday === 38) {
        return `${parseInt(seasonBegin) + 1}-${parseInt(seasonEnd) + 1}-1`;
      }
      // else just go forward a matchday
      else {
        return `${currentSeason}-${currentMatchday + 1}`;
      }
    }
  }
  return (
    <>
      {page === 'Today' ? (
        <header>
          <h1 className="my-4 text-center">Today's Matches</h1>
        </header>
      ) : (
        <header className="flex items-center justify-between w-full my-4">
          <HeaderIcon icon={'leftArrow'} route={getMatchday('prev')} />
          <h1>{`${page} ${matchInfo.intRound}`}</h1>
          <HeaderIcon icon={'rightArrow'} route={getMatchday('next')} />
        </header>
      )}
    </>
  );
};

export default Header;

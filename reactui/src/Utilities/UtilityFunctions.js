export function isObjectNotEmpty(obj) {
  let objectIsEmpty =
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype;
  return !objectIsEmpty;
}

export function getWinRatePercentageAs0To100(gamesWon, gamesLost) {
    const totalGames = gamesWon + gamesLost;
  
    if (gamesWon === 0 || totalGames === 0) {
      return 0;
    } else {
      return Math.round((gamesWon / totalGames) * 100);
    }
  }

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

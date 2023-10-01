export { is_bet_amount_within_budget };
function is_bet_amount_within_budget(budget, balance, bet_amount) {

  // check type first
  if (
    Number.isInteger(budget) &&
    Number.isInteger(balance) &&
    Number.isInteger(bet_amount)
  ) {
    if (bet_amount > 0) {
      return budget + balance - bet_amount >= 0;
    } else {
      console.log("Bet amount must be greater than 0.");
      return false;
    }
  }
  alert("'All arguments to the `is_bet_amount_within_budget` function must be integers.' Please refer this issue to the developer.");
  console.log("All arguments to the `is_bet_amount_within_budget` function must be integers.");
  return undefined;
}

export { is_bet_amount_within_budget };
function is_bet_amount_within_budget(budget, balance, bet_amount) {
  // check type first
  if (
    Number.isInteger(budget) &&
    Number.isInteger(balance) &&
    Number.isInteger(bet_amount)
  ) {
    return budget - balance - Math.abs(bet_amount) >= 0;
  }
  return undefined;
}

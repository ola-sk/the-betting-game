import { draw_a_number } from "./draw_a_number.js";
import { get_integer_input } from "./get_valid_user_input.js";
import { is_bet_amount_within_budget } from "./budget.js";

function is_number_in_range(number, range_start, scope) {
  if (
    Number.isInteger(number) &&
    number >= range_start &&
    number <= range_start + scope
  ) {
    return true;
  } else {
    console.log(
      `The number is not in range <${range_start}, ${range_start + scope}>`
    );
    return false;
  }
}

function game_on(range_start = 1, scope = 9) {
  let currency = "£";
  const pool = get_integer_input(
    `What is the limit to the amount of money you are willing to use in this session (in ${currency} 💷)? I will warn you if, during the game, you are about to exceed the limit you set here.`
  );
  // control variables
  let game_on = true;
  let again;

  // money variables
  const bet_amounts = [];
  const won_lost_amounts = [];
  let balance = 0;
  let current_bet_amount;

  // variables for values to be drawn or guessed
  let random_num = 0;
  let chosen_num = 0;

  // custom validation functions to be defined withing the loop with values used in that iteration.
  let validate_bet_amount;
  let validate_number_in_range;

  // Main Game Loop
  while (game_on) {
    // define a bet amount validation function which uses `confirm_bet_amount` function, but provides arguments from the current context to it.
    // Resulting function can be called with just one argument.
    validate_bet_amount = (bet_amount) =>
      is_bet_amount_within_budget(pool, balance, bet_amount);
    // pass reference to custom validation function `validate_bet_amount` so that it can be invoked within
    // `get_integer_input` function to validate each of user inputs, until a valid input provided.
    current_bet_amount = get_integer_input(
      `How much do you want to bet? (${currency})`,
      validate_bet_amount
    );
    bet_amounts.push(current_bet_amount);

    // same here: a custom validation function with a single argument
    validate_number_in_range = (number) =>
      is_number_in_range(number, range_start, scope);
    chosen_num = get_integer_input(
      `What number do you choose between ${range_start} to ${
        range_start + scope
      }?`,
      validate_number_in_range
    );
    console.log(
      `The user has bet ${currency}${current_bet_amount} on number ${chosen_num}.`
    );
    random_num = draw_a_number(range_start, scope);
    console.log(`Number was drawn -> it's ${random_num}!`);
    console.log(
      `is 'chosen_num' a number? Returns ${Number.isInteger(chosen_num)}.`
    );
    console.log(
      `is 'random_num' a number? Returns ${Number.isInteger(random_num)}.`
    );
    if (Number.isInteger(chosen_num) && Number.isInteger(random_num)) {
      if (chosen_num === random_num) {
        confirm(
          `You guessed the right number, you win ${currency}${current_bet_amount}!`
        );
        won_lost_amounts.push(current_bet_amount);
      } else {
        confirm(
          `You did not guess that, you loose ${currency}${current_bet_amount}!`
        );
        won_lost_amounts.push(current_bet_amount * -1);
      }
    } else {
      console.log(
        `Could not alert user about the result because either chosen_num or random_num has got verified as integer numbers.`
      );
    }
    again = confirm("Do you want to guess again?");
    if (!again) {
      game_on = false;
    }
  }
}
game_on();
// print results

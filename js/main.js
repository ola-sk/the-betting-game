import {draw_a_number} from "./draw_a_number.js";
import {get_integer_input} from "./get_valid_user_input.js";
import {is_bet_amount_within_budget} from "./budget.js";

function is_number_in_range(number, range_start, scope) {
  if (Number.isInteger(number) && Number.isInteger(range_start) && Number.isInteger(scope)) {
    if (number >= range_start && number <= range_start + scope) { return true; }
    console.log(`The number is not in range <${range_start}, ${range_start + scope}>`);
    return false;
  }
  console.log("All arguments to the `is_number_in_range` function must be integers.");
  return undefined;
}

function game_on(range_start = 1, scope = 9) {
  let name = prompt("Welcome to The Betting Game! \nHere you can try your luck 🍀 in guessing the next numbers! 🎲\n\nWhat is your name?");
  let currency = prompt(`Welcome ${name}! 🌼\n\nWhat currency would you want to use?`);
  const budget = get_integer_input(
    `Alright ${currency} it is! Let's set you a limit so that you don't get to spend all your money! 💸 \n\nSet your budget:`,
    (x) => x > 0, "Sorry, the budget must be greater than 0."
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
  let lets_start = true;
  // Main Game Loop
  while (game_on && budget + balance > 0) {
    // define a bet amount validation function which uses `confirm_bet_amount` function, but provides arguments from the current context to it.
    // Resulting function can be called with just one argument.
    validate_bet_amount = (bet_amount) => is_bet_amount_within_budget(budget, balance, bet_amount);

    // pass reference to custom validation function `validate_bet_amount` so that it can be invoked within
    // `get_integer_input` function to validate each of user inputs, until a valid input provided.
    current_bet_amount = get_integer_input(
      `${(lets_start) ? "Let us start the game then! 🎲\n\n" : ""} How much do you bet on this one? 💸\n<Your Balance: ${currency} ${budget + balance}>`,
      validate_bet_amount, `Sorry, you can't bet that much. You have ${currency} ${budget + balance} left. 😯`
    );
    bet_amounts.push(current_bet_amount);

    // same here: a custom validation function with a single argument
    validate_number_in_range = (number) =>
      is_number_in_range(number, range_start, scope);
    chosen_num = get_integer_input(
      `What number do you choose between ${range_start} to ${
        range_start + scope
      }? 🎲`,
      validate_number_in_range, `Sorry, the number must be between ${range_start} and ${range_start + scope}.`
    );
    console.log(
      `The user has bet ${currency} ${current_bet_amount} on number ${chosen_num}.`
    );
    random_num = draw_a_number(range_start, scope);
    console.log(`Number was drawn -> it's ${random_num}!`);
    if (Number.isInteger(chosen_num) && Number.isInteger(random_num)) {
      if (chosen_num === random_num) {
        balance += current_bet_amount;
        again = confirm(
          `🎲 The number drawn is... ${random_num}!\n\nYou guessed the right number, you win ${currency} ${current_bet_amount} 🤩! \n<Your Balance: ${currency} ${budget + balance}>\n\nDo you want to guess again?`
        );
        won_lost_amounts.push(current_bet_amount);
      } else {
        balance -= current_bet_amount;
        if (budget + balance <= 0) {
          alert(
            `🎲 The number drawn is... ${random_num}!\n\nYou did not guess that, you loose ${currency} ${current_bet_amount}! 😞 \n<Your Balance: ${currency} ${budget + balance}>\n\nYou don't have any money left. Game over!`
          );
          again = false;
        } else {
          again = confirm(
            `🎲 The number drawn is... ${random_num}!\n\nYou did not guess that, you loose ${currency} ${current_bet_amount}! 😞 \n<Your Balance: ${currency} ${budget + balance}>\n\nDo you want to guess again?`
          );
        }
        won_lost_amounts.push(current_bet_amount * -1);
      }
    } else {
      console.log(
        `Could not alert user about the result because either chosen_num or random_num has not got verified as integer numbers.`
      );
    }
    if (!again) {
      game_on = false;
      alert(`Thank you for playing ${name}! 🤗 See you next time!`);
    }
    lets_start = false;
  }
}

game_on();
// print results

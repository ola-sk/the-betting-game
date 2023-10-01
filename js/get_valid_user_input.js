export { get_integer_input };
// check the user provided integer against a set of constraints and give feedback & ask again if input does not comply,
// all while user inputs the values.
function get_integer_input(message, custom_validation_function, validation_fail_message, attempts_limit = 6) {
  // `== undefined` will also match null, which is okay
  if (custom_validation_function === undefined || custom_validation_function === null) {
    custom_validation_function = (x) => true;
  }
  let input = prompt(message);
  let attempts = 1;
  let output = parseInt(input);
  while (
    (Number.isInteger(output) === false || custom_validation_function(output) === false) &&
    attempts < attempts_limit
    )
  {
    if (!Number.isInteger(output)) {
      input = prompt(
        `Sorry, it does not seem to be a number, could you please try again? \n${message}`
      );
    } else if (custom_validation_function(output) === false) {
      input = prompt(validation_fail_message);
    }
    output = parseInt(input);
    attempts++;
  }
  if (Number.isInteger(output) && custom_validation_function(output)) {
    return output;
  } else {
    alert(
      `Something went wrong! Unable to retrieve number input from the user. ${
        Number.isInteger(attempts) && attempts >= 6
          ? "Timeout on number of attempts."
          : ""
      }`
    );
    return null;
  }
}

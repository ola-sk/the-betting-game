export { get_integer_input };
// check the user provided integer against a set of constraints and give feedback & ask again if input does not comply,
// all while user inputs the values.
function get_integer_input(message, custom_verification_function) {
  // `== undefined` will also match null, which is okay
  if (custom_verification_function === undefined || custom_verification_function === null) {
    custom_verification_function = (x) => true;
  }
  let input = prompt(message);
  let attempts = 1;
  let output = parseInt(input);
  while (
    (!Number.isInteger(output) || !custom_verification_function(output)) &&
    attempts < 6
    ) {
    input = prompt(
      `Sorry, it does not seem to be a correct number, could you please try again? \n${message}`
    );
    output = parseInt(input);
    attempts++;
  }
  if (Number.isInteger(output) && custom_verification_function(output)) {
    return output;
  } else {
    alert(
      `Something went wrong! Unable to retrieve number input from the user. ${
        Number.isInteger(attempts) && attempts >= 6
          ? "Timeout on number of attempts."
          : ""
      } Reference error number: 123`
    );
    return null;
  }
}

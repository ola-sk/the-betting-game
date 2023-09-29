export { draw_a_number };
function draw_a_number(range_start, scope) {
  if (typeof range_start == "string") {
    range_start = parseInt(range_start);
  }
  if (typeof scope == "string") {
    scope = parseInt(scope);
  }
  const range_end = range_start + scope;
  console.log(
    `Range of numbers that are going to be drawn: <${range_start}, ${range_end}>`
  );
  return range_start + Number.parseInt((Math.random() * scope).toFixed());
}

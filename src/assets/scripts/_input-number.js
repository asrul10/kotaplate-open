const formatNumber = (value, input) => {
  const min = input.attr("data-number-min");
  const max = input.attr("data-number-max");
  const val = value.replace(/[^.\-\d]/g, "").toString();

  if (!val) {
    return "";
  }

  // Auto format minus
  let formatMinus = val[0];
  for (let index = 1; index < val.length; index++) {
    const char = val[index];
    if (char === "-") {
      continue;
    }
    formatMinus += char;
  }

  // Auto format decimal
  let formatDecimal = "";
  let countDot = 0;
  for (let index = 0; index < formatMinus.length; index++) {
    const char = formatMinus[index];
    if (char === "." && index === 0) {
      formatDecimal += "0.";
      continue;
    }
    if (char === ".") {
      countDot++;
      if (countDot > 1) {
        continue;
      }
    }
    formatDecimal += char;
  }

  if (formatDecimal != "-") {
    // Parse float
    const floatNumber = parseFloat(formatDecimal);

    // Format minimum
    if (floatNumber < min) {
      console.log(formatNumberReturn(min, input));
      return formatNumberReturn(min, input);
    }

    // Format maximum
    if (floatNumber > max) {
      return formatNumberReturn(max, input);
    }
  }

  return formatNumberReturn(formatDecimal, input);
};

const formatNumberReturn = (formattedNumber, input) => {
  const prefix = input.attr("data-input-prefix");
  const thousandSperator =
    input.attr("data-thousand-sperator") == "true" ? "," : "";
  const splitFormattedNumber = formattedNumber.split(".");

  return [
    prefix,
    splitFormattedNumber[0].replace(
      /\B(?=(\d{3})+(?!\d)\.?)/g,
      thousandSperator
    ),
    splitFormattedNumber.length == 2 ? "." : "",
    splitFormattedNumber[1] || "",
  ].join("");
};

export default () => {
  const inputNumber = $(".input-number");
  if (inputNumber.length === 0) {
    return;
  }
  for (let index = 0; index < inputNumber.length; index++) {
    const input = $(inputNumber[index]);
    input.val((index, value) => formatNumber(value, input));
  }

  inputNumber.on("keyup", (e) => {
    const input = $(e.currentTarget);
    input.val((index, value) => formatNumber(value, input));
  });
};

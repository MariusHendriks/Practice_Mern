const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 5, max: 500 })) {
    errors.text = "Post must be between 5 and 500 charactes";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "text is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

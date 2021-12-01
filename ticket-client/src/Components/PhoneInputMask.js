import React from "react";
import MaskedInput from "react-text-mask";
import PropTypes from "prop-types";

const PhoneInputMask = (props) => {
  const { inputRef, ...other } = props;
  //   console.log(other);
  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        "-",
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        "-",
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
      ]}
      placeholderChar={"\u2000"}
      showMask
      guide={false}
      keepCharPositions={true}
    />
  );
};
PhoneInputMask.propTypes = {
  inputRef: PropTypes.func.isRequired,
};
export { PhoneInputMask };

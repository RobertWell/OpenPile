const error_map = {
    "Invalid Credentials":"帳號或密碼不正確。",
    "Email must be valid":"Email 格式不正確",
    "Password must between 6 and 20 characters!!":"密碼格式不正確",
    "Email already exists!":"Email已存在",
    "Duplicate Ticket!":"該商品已存在!"
};

export const translateError = (errorMessage) => {
  return errorMessage in error_map ? error_map[errorMessage] : errorMessage;
};

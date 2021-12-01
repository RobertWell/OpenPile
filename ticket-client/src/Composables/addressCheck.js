export const addressCheck = (address) => {
  return /^(https?:\/\/)?([a-zA-Z0-9.]*){1}(?::[a-zA-Z0-9]{1,4})?(?:\/[_,'$#~?\-+=&;%@.\w%]+)*(?:\/)?$/.test(
    address
  );
};


type Email = string & { readonly email: unique symbol }

// const isValidEmail = (maybeEmail: string): maybeEmail is Email => {
//     return maybeEmail.includes('@') && maybeEmail.length < 100
// }
export interface User {

  name: string;
  email: Email;

}


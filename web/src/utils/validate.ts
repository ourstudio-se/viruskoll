const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const emailIsValid = (email: string): boolean =>
  email ? regexEmail.test(email) : false;

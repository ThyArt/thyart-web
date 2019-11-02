import { EMAIL_REGEXP, NUMBER_REGEXP } from '../variables/regexp';

export const validateEmail = email => EMAIL_REGEXP.test(email);
export const validateNumber = number => NUMBER_REGEXP.test(number);
export const validatePassword = password => password.length >= 6;

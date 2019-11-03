import { EMAIL_REGEXP, NUMBER_REGEXP, BLANK_STRING } from '../variables/regexp';

export const validateEmail = email => EMAIL_REGEXP.test(email);
export const validateNumber = number => NUMBER_REGEXP.test(number);
export const validatePassword = password => password.length >= 6;
export const validateString = str => str && 0 !== str.length && !BLANK_STRING.test(str);
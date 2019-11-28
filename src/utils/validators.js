import { EMAIL_REGEXP, BLANK_STRING, NUMBER_REGEXP } from 'variables/regexp';

export const validateEmail = email => EMAIL_REGEXP.test(email);
export const validateString = str => str && 0 !== str.length && !BLANK_STRING.test(str);
export const validatePassword = password => validateString(password) && password.length >= 6;
export const validateNumber = number => NUMBER_REGEXP.test(number);

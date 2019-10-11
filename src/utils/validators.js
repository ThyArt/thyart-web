import { EMAIL_REGEXP } from './regexp';

export const validateEmail = email => EMAIL_REGEXP.test(email);
export const validatePassword = password => password.length >= 6;

//const apiURL = 'http://thyart-api-dev.eu-west-1.elasticbeanstalk.com/';
export const apiURL = process.env.REACT_APP_API_ENDPOINT;
export const userURL = "api/user";
export const tokenURL = "oauth/token";
export const pwdURL = "api/password/create";
export const profileURL = "api/user/self";
export const artWorkURL = "api/artwork";
export const artWorkImgComp = "/cimage";
export const artWorkImg = "/image";
export const customerURL = "api/customer";
export const billingURL = "api/order";
export const memberURL = "api/user/member";

export const header = {
  headers: { Accept: "application/json", "Content-Type": "application/json" }
};

export const clientID = process.env.REACT_APP_API_CLIENT_ID;
export const clientSecret = process.env.REACT_APP_API_CLIENT_SECRET;

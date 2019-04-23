import {
  ADD_BILLING,
  DELETE_BILLING,
  SET_CURRENT_BILLING
} from "../constants/constantsAction";

export const addBilling = billing => ({
  type: ADD_BILLING,
  billing: billing
});

export const deleteBilling = id => ({
  type: DELETE_BILLING,
  id: id
});

export const setCurrentBilling = id => ({
  type: SET_CURRENT_BILLING,
  id: id
});
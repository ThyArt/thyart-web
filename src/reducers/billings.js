import {
  ADD_BILLING,
  DELETE_BILLING,
  SET_CURRENT_BILLING
} from "../constants/constantsAction";
import { cloneDeep, findIndex } from "lodash";
import * as uuid from "uuid";

export const initialState = [
  {
    billings: [],
    billingTable: [],
    currentBilling: null
  }
];

function billings (state = initialState, action)
{
  switch (action.type) {

    case DELETE_BILLING:
      let rows = cloneDeep(state.billings);
      let rows2 = cloneDeep(state.billingTable);
      let id = action.id;
      let idx = findIndex(rows, { id });
      rows.splice(idx, 1);
      idx = findIndex(rows2, { id });
      rows2.splice(idx, 1);
      return Object.assign({}, state, {
        billings: rows,
        billingTable: rows2
      });

    case ADD_BILLING:
      if (state.billings) {
        rows = cloneDeep(state.billings);
        rows2 = cloneDeep(state.billingTable);
      }
      else {
        rows = [];
        rows2 = [];
      }
      id = uuid.v4();
      rows.unshift({
          id: id,
          fName: action.billing.fName,
          lName: action.billing.lName,
          mail: action.billing.mail,
          address: action.billing.address,
          phone: action.billing.phone,
          artworkName: action.billing.artworkName
        });
      rows2.unshift({
        id: id,
        name: action.billing.fName,
        artworkName: action.billing.artworkName,
        mail: action.billing.mail
      });
      return Object.assign({}, state, {
        billings: rows,
        billingTable: rows2
      });

    case SET_CURRENT_BILLING:
      rows = cloneDeep(state.billings);
      id = action.id;
      idx = findIndex(rows, {id});
      let currentBilling = rows[idx];
      console.log(currentBilling);
      return Object.assign({}, state, {
        currentBilling: currentBilling
      });

    default:
      return state
  }
}

export default billings
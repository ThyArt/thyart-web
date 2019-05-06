import {
  ADD_BILLING,
  DELETE_BILLING,
  SET_CURRENT_BILLING,
  SORT_BILLINGS
} from "../constants/constantsAction";
import { cloneDeep, findIndex } from "lodash";
import * as uuid from "uuid";

export const initialState = [
  {
    billings: [],
    currentBilling: null
  }
];

function billings (state = initialState, action)
{
  let rows = cloneDeep(state.billings);
  let rows2 = cloneDeep(state.billingTable);
  let id;
  let idx;

  switch (action.type) {
    case DELETE_BILLING:
      id = action.id;
      idx = findIndex(rows, { id });
      rows.splice(idx, 1);
      idx = findIndex(rows2, { id });
      rows2.splice(idx, 1);
      return Object.assign({}, state, {
        billings: rows,
        billingTable: rows2
      });

    case ADD_BILLING:
      if (!state.billings) {
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
          artworkName: action.billing.artworkName,
          date: Date.now()
        });
      rows2.unshift({
        id: id,
        name: action.billing.fName,
        artworkName: action.billing.artworkName,
        mail: action.billing.mail,
        date: Date.now()
      });
      return Object.assign({}, state, {
        billings: rows,
        billingTable: rows2
      });

    case SET_CURRENT_BILLING:
      id = action.id;
      idx = findIndex(rows, {id});
      let currentBilling = rows[idx];
      console.log(currentBilling);
      return Object.assign({}, state, {
        currentBilling: currentBilling
      });

    case SORT_BILLINGS:
      switch(action.sortType)
      {
        case 'nameA':
          rows2.sort(function(a, b)
          {
            a = a.name;
            b = b.name;

            return a < b ? -1 : a > b ? 1 : 0;
          });
          break;
        case 'nameZ':
          rows2.sort(function(a, b)
          {
            a = a.name;
            b = b.name;

            return a > b ? -1 : a < b ? 1 : 0;
          });
          break;
        case 'artworkA':
          rows2.sort(function(a, b)
          {
            a = a.artworkName;
            b = b.artworkName;

            return a < b ? -1 : a > b ? 1 : 0;
          });
          break;
        case 'artworkZ':
          rows2.sort(function(a, b)
          {
            a = a.artworkName;
            b = b.artworkName;

            return a > b ? -1 : a < b ? 1 : 0;
          });
          break;
        case 'dateNew':
          rows2.sort(function(a, b)
          {
            a = a.date;
            b = b.date;

            return a > b ? -1 : a < b ? 1 : 0;
          });
          break;
        case 'dateOld':
          rows2.sort(function(a, b)
          {
            a = a.date;
            b = b.date;

            return a < b ? -1 : a > b ? 1 : 0;
          });
          break;
        default:
          break;
      }
      return Object.assign({}, state, {
        billings: rows,
        billingTable: rows2
      });

    default:
      return state
  }
}

export default billings
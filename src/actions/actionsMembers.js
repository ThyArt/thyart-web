import axios from 'axios';
import {apiURL, memberURL, permissionURL, roleURL, userURL} from "../constants/constantsApi";
import {
  RECEIVE_MEMBERS,
  RECEIVE_MEMBERS_ERROR, RECEIVE_PERMISSIONS,
  REQUEST_MEMBERS
} from "../constants/constantsAction";

function shouldFetchApi(state) {
  const isFetching = state.members.isFetching;

  return !isFetching;
}

function requestMembers() {
  return {
    type: REQUEST_MEMBERS
  };
}

function receiveMembersError(error) {
  let error_msg;
  if (error.response && error.response.data && error.response.data.message)
    error_msg = error.response.data.message;
  else
    error_msg = "Erreur inconnue.";

  return {
    type: RECEIVE_MEMBERS_ERROR,
    error: error_msg
  };
}

function receiveMembers(res) {
  return {
  type: RECEIVE_MEMBERS,
    members: res.data.data.filter(data => (data.role === "gallerist" || data.role === "member"))
  };
}

function receivePermissions(res) {
  return {
    type: RECEIVE_PERMISSIONS,
    permissions: res.data.data
  };
}

function fetchPermissions(token) {
  const header_auth = {
    headers: {
      Accept: "application/json", "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  };
  return dispatch => {
    return axios
        .get(apiURL + permissionURL, header_auth)
        .then(res => dispatch(receivePermissions(res)))
        .catch(error => dispatch(receiveMembersError(error)));
  };
}

function modifyMember(token, id, role) {
  const header_auth = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + token
    }
  };

  return dispatch => {
    return axios
        .post(apiURL + roleURL + "/" + id + "?role=" + role, {}, header_auth)
        .catch(error => dispatch(receiveMembersError(error)));
  };
}

function createMember(
  token,
  username,
  email,
  first_name,
  last_name,
  password
) {
  const header_auth = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + token
    }
  };

  return dispatch => {
    return axios
      .post(apiURL + memberURL + "?email=" + email
        + "&firstname=" + first_name + "&lastname=" + last_name
        + "&password=" + password + "&name=" + username, {}, header_auth)
      .catch(error => dispatch(receiveMembersError(error)));
  };
}

function fetchMembers(token) {
  const header_auth = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  };

  return dispatch => {
    return axios
      .get(apiURL +  userURL, header_auth)
      .then(res => dispatch(receiveMembers(res)))
      .catch(error => dispatch(receiveMembersError(error)));
  };
}

export function createMemberIfNeeded(
  token,
  username,
  email,
  first_name,
  last_name,
  password
) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestMembers());
      return dispatch(
        createMember(
          token,
          username,
          email,
          first_name,
          last_name,
          password
        )
      ).then(() => {
        return dispatch(fetchMembers(token, null));
      });
    }
  };
}

export function modifyMemberIfNeeded(token, id, role)
{
  return (dispatch, getState) => {
    if (shouldFetchApi(getState()))
    {
      dispatch(requestMembers());
      return dispatch(modifyMember(token, id, role)).then(() =>
          {
            return dispatch(fetchMembers(token));
          }
      );
    }
  }
}

export function getMembersIfNeeded(token) {
  return (dispatch, getState) => {
    if (shouldFetchApi(getState())) {
      dispatch(requestMembers());
      return dispatch(fetchPermissions(token)).then(() => {
          return dispatch(fetchMembers(token));
        }
      );
    }
  };
}

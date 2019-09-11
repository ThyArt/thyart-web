import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "../../actions/actionsAuth";
import * as types from "../../constants/constantsAction";
import fetchMock from "fetch-mock";
import expect from "expect/build/index";
import moxios from "moxios";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async signin/signup actions", () => {

  beforeEach(function() {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("creates RECEIVE_SIGN_IN when signing in", () => {


    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          "token_type": "Bearer",
          "expires_in": 31622399,
          "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjEzOGE5NjA3MTZlYjFmZjlkYzJjZjBjZTA1YTEyNWYxOTRiMWVjOGIzODZhN2MzMzdkZjI4NmM1MmY4ZmIwMGNjMGU2Zjc0MzMzMjY0YWE0In0.eyJhdWQiOiIyIiwianRpIjoiMTM4YTk2MDcxNmViMWZmOWRjMmNmMGNlMDVhMTI1ZjE5NGIxZWM4YjM4NmE3YzMzN2RmMjg2YzUyZjhmYjAwY2MwZTZmNzQzMzMyNjRhYTQiLCJpYXQiOjE1NTM3NjM3MjcsIm5iZiI6MTU1Mzc2MzcyNywiZXhwIjoxNTg1Mzg2MTI2LCJzdWIiOiI3Iiwic2NvcGVzIjpbIioiXX0.G_1cEz2ZC1IBFRZ1B_koR8vnPfi970oZw-Ila5dN6n-6r0IsnOo6S_3CnlOQCkxJPmATdNqF0yYqWPmH-mI9gpNxMAV2ZL-PD1_cWKOxz16tpWr-y2O9vepiIO5vMggNb-w9Egfom0yF1Mf1Gx1ptZfAdrTEaH0AM8ehswFiG8Z4JwAUEaCD_Ic7sijl--uLhU6ampOUXy4IGD4KLlQu7zs_8zuiovBJ7YhA_AQ7fitLkkhtEP5joXdm-AgbMgut2lrUkpMgXrTL4ItbfXosvJVEFKEZUyxxNN3aaRhbD8pLu4ICzhxkdtHUYHrpXANCV5ttcsAuMJuqTiowTzXtIt7iFl6UgvscpCdCQLoL7qAWAaw3DBpk-pap3fQrUbkK1OPsfMtknn_36GRlglkS7UC2V_FBIqIltw0iMGxKMt2VlbYnVTwftgq8OIosPMVBTSsybla5uG-5lNWXRUhHOAxhx1Qpi_ojJ9Pilgi0w5JE2jenhJDFhTEmj3YxMe0prxPtENy1efn9nIJNWGnxytxDaAhTGrPvqd3XZ8TkfcaKc9KpLXK2F2Ey7Io9qDhBD_NQJmdSrIlUgt3VAzPEq8KtrrVKPtO2RR3dadeI96RV0fDOiYApaQ22D3h6Q_qIgZtEwYicK1aCg-Pbzhmby98gxAeP_CdrNeB_rTepyQI",
          "refresh_token": "def5020097aaf5e1902ae53f47470d55f6888f82cf0c5c6f27b9c9232c96865af0bc0149a1fc6fa12bc34f1d624d8ea9de3915806ec6bb4505c5b4f2cb5ee111bb5c4600889def4971fadcae300ceb8ccf3b30e3dedffe62308ec3a7727ff6ccd2a6de065376e223bf636d68bbabff809ec79a68664586071ee5d7803b669dd415c43e04a7a9b45f77113d84b15950fb41aa853ee35f01330092ff2cf1d818f1cc3072d4853a4f6fa5c06dce4b01e6e76f102e198986ae588f098a4d9ba8acedf10adef89b9310929cbb7eb6a50c394cfd9d339ab8fdfd75077b038b253d4a28aa6114d8880c29ecde3fb067ff27c8f6a051e8dbe9519d62ef1c97559f7d7697c735f6c8ba460665662d17682508dbf9a0187e88ba56a620f4b6668d08c023d3dd62713a6330f32aca0a8ade133a9855a61c947882c0c3d4ca513a4a38444205373de1b1d4df02bd222b0bd427cac4e6ddd28a96ed60a0904df3374bb15be8620bf15236"
        }
      });
    });

    const expectedActions = [
      { type: types.REQUEST_AUTH },
      {
        type: types.RECEIVE_SIGN_IN,
        msg: "Connecté"
      }
    ];
    const store = mockStore({ authentication: [] });

    return store.dispatch(actions.signInIfNeeded("test@test.jp", "test42")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("creates RECEIVE_SIGN_UP when signing up", () => {

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          "data": {
            "id": 1,
            "firstname": "test",
            "lastname": "test",
            "email": "test@test.jp"
          }
        }
      });
    });

    const expectedActions = [
      { type: types.REQUEST_AUTH },
      {
        type: types.RECEIVE_SIGN_UP,
        msg: "Félicitation, vous êtes inscris! Vous pouvez maintenant vous connecter à votre compte."
      }
    ];
    const store = mockStore({ authentication: [] });

    return store.dispatch(actions.signUpIfNeeded("test", "test", "test", "test@test.jp", "test42")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should create an action to disconnect", () => {
    const expectedAction = {
      type: types.DISCONNECT
    };
    expect(actions.disconnect()).toEqual(expectedAction);
  });

  it("creates RECEIVE_PWD when asking a password reset", () => {

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          "data": {
            "id": 1,
            "firstname": "test",
            "lastname": "test",
            "email": "test@test.jp"
          }
        }
      });
    });

    const expectedActions = [
      { type: types.REQUEST_AUTH },
      {
        type: types.RECEIVE_SIGN_UP,
        msg: "Félicitation, vous êtes inscris! Vous pouvez maintenant vous connecter à votre compte."
      }
    ];
    const store = mockStore({ authentication: [] });

    return store.dispatch(actions.signUpIfNeeded("test", "test", "test", "test@test.jp", "test42")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

});
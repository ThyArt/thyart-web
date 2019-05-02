import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../actions/actionsProfile'
import * as types from '../constants/constantsAction'
import expect from 'expect'
import moxios from 'moxios'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async profile actions', () => {

  beforeEach(function() {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  })

  it('creates RECEIVE_PROFILE when fetching profile', () => {

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          "data": {
            "id": 1,
            "firstname": "test",
            "lastname" : "test2",
            "email": "test@test.jp"
          }
        }
      });
    });

    const expectedActions = [
      { type: types.REQUEST_PROFILE },
      {
        type: types.RECEIVE_PROFILE,
        mail: 'test@test.jp',
        firstname: 'test',
        lastname: 'test2'
      }
    ]
    const store = mockStore({ profile: [] })

    return store.dispatch(actions.getProfileIfNeeded()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

})
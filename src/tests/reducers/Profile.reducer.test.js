import reducer from '../../reducers/profile'
import * as types from '../../constants/constantsAction'

describe('profile reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        isFetching: false,
        msg: null,
        error: null,
        mail: null,
        name: null,
        firstname: null,
        lastname: null
      }
    )
  })

  it('should handle REQUEST_PROFILE', () => {
    expect(
      reducer([], {
        type: types.REQUEST_PROFILE
      })
    ).toEqual(
      {
        isFetching: true,
        error: null,
        msg: null
      }
    )
  })

  it('should handle RECEIVE_PROFILE_ERROR', () => {
    expect(
      reducer([], {
        type: types.RECEIVE_PROFILE_ERROR,
        error: 'error'
      })
    ).toEqual(
      {
        isFetching: false,
        error: 'error',
        msg: null
      }
    )
  })

  it('should handle RECEIVE_PROFILE', () => {
    expect(
      reducer([], {
        type: types.RECEIVE_PROFILE,
        mail: 'test@test.jp',
        firstname: 'test',
        lastname: 'test2'
      })
    ).toEqual(
      {
        isFetching: false,
        mail: 'test@test.jp',
        firstname: 'test',
        lastname: 'test2'
      }
    )
  })

})

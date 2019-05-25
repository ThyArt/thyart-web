import reducer from '../../reducers/authentication'
import * as types from '../../constants/constantsAction'

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([
      {
        isLogged: false,
        isFetching: false,
        msg: null,
        error: null
      }
    ])
  })

  it('should handle REQUEST_AUTH', () => {
    expect(
      reducer([], {
        type: types.REQUEST_AUTH
      })
    ).toEqual(
      {
        isFetching: true,
        error: null,
        msg: null
      }
    )
  })

  it('should handle RECEIVE_AUTH_ERROR', () => {
    expect(
      reducer([], {
        type: types.RECEIVE_AUTH_ERROR,
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

  it('should handle RECEIVE_SIGN_IN', () => {
    expect(
      reducer([], {
        type: types.RECEIVE_SIGN_IN,
        msg: 'msg'
      })
    ).toEqual(
      {
        isFetching: false,
        isLogged: true,
        error: null,
        msg: 'msg'
      }
    )
  })


  it('should handle RECEIVE_SIGN_UP', () => {
    expect(
      reducer([], {
        type: types.RECEIVE_SIGN_UP,
        msg: 'msg'
      })
    ).toEqual(
      {
        isFetching: false,
        error: null,
        msg: 'msg'
      }
    )
  })

  it('should handle RECEIVE_PWD', () => {
    expect(
      reducer([], {
        type: types.RECEIVE_PWD,
        msg: 'msg'
      })
    ).toEqual(
      {
        isFetching: false,
        error: null,
        msg: 'msg'
      }
    )
  })

  it('should handle DISCONNECT', () => {
    expect(
      reducer([], {
        type: types.DISCONNECT
      })
    ).toEqual(
      {
        isLogged: false
      }
    )
  })
})
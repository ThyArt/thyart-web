import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../actions/actionsArtwork'
import * as types from '../../constants/constantsAction'
import expect from 'expect/build/index'
import moxios from 'moxios'
import { RECEIVE_ADDIMAGE } from '../../constants/constantsAction';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

function FormDataMock() {
  this.append = jest.fn();
}
global.FormData = FormDataMock;

describe('async artwork actions', () => {

  beforeEach(function() {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  })

  it('creates RECEIVE_ARTWORKS when fetching artworks', () => {

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          "data": [
            {
              "id": 1,
              "name": "test",
              "price": 42,
              "ref": "test",
              "state": "exposed",
              "images": [{
                "id": 1,
                "url": "http://localhost/storage/1/test.jpg",
                "name": "test",
                "file_name": "test.jpg"
              }]
            }
          ],
          "links": {
            "first": "http://localhost/api/artwork?page=1",
            "last": "http://localhost/api/artwork?page=1",
            "prev": null,
            "next": null
          },
          "meta": {
            "current_page": 1,
            "from": 1,
            "last_page": 1,
            "path": "http://localhost/api/artwork",
            "per_page": 25,
            "to": 1,
            "total": 1
          }
        },
      });
    });

    const expectedActions = [
      { type: types.REQUEST_ARTWORKS },
      {
        type: types.RECEIVE_ARTWORKS,
        artworks: [{
          src: 'http://localhost/storage/1/test.jpg',
          name: 'test',
          key: '1',
          width: 3,
          height: 3,
          price: 42,
          state: 'exposed'
        }]
      }
    ]
    const store = mockStore({ artworks: [] })

    return store.dispatch(actions.getArtWorksIfNeeded()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('creates RECEIVE_ARTWORKCREATE then RECEIVE_ADDIMAGE then RECEIVE_ARTWORKS when creating artwork', () => {

    moxios.wait(() => {
      const request1 = moxios.requests.at(0);
      request1.respondWith({
        status: 201,
        response: {
          "data": {
            "id": 1,
            "name": "test",
            "price": 42,
            "ref": "test",
            "state": "exposed",
            "images": []
          }
        },
      });
      moxios.wait(() => {
        const request2 = moxios.requests.at(1);
        request2.respondWith({
          status: 201,
          response: {
            "data": {
              "id": 1,
              "name": "test",
              "price": 42,
              "ref": "test",
              "state": "exposed",
              "images": [{
                "id": 1,
                "url": "http://localhost/storage/1/test.jpg",
                "name": "test",
                "file_name": "test.jpg"
              }]
            }
          },
        });
        moxios.wait(() => {
          const request3 = moxios.requests.at(2);
          request3.respondWith({
            status: 200,
            response: {
              "data": [
                {
                  "id": 1,
                  "name": "test",
                  "price": 42,
                  "ref": "test",
                  "state": "exposed",
                  "images": [{
                    "id": 1,
                    "url": "http://localhost/storage/1/test.jpg",
                    "name": "test",
                    "file_name": "test.jpg"
                  }]
                }
              ],
              "links": {
                "first": "http://localhost/api/artwork?page=1",
                "last": "http://localhost/api/artwork?page=1",
                "prev": null,
                "next": null
              },
              "meta": {
                "current_page": 1,
                "from": 1,
                "last_page": 1,
                "path": "http://localhost/api/artwork",
                "per_page": 25,
                "to": 1,
                "total": 1
              }
            },
          });
        })
      })
    });

    const expectedActions = [
      { type: types.REQUEST_ARTWORKS },
      {
        type: types.RECEIVE_ARTWORKCREATE,
        "msg": "test a été crée",
        id: '1'
      },
      {
        type: types.RECEIVE_ADDIMAGE,
        msg: 'Image téléchargée avec succès.'
      },
      {
        type: types.RECEIVE_ARTWORKS,
        artworks: [{
          src: 'http://localhost/storage/1/test.jpg',
          name: 'test',
          key: '1',
          width: 3,
          height: 3,
          price: 42,
          state: 'exposed'
        }]
      }
    ]

    const store = mockStore({ artworks: [] })

    return store.dispatch(actions.createArtworkIfNeeded('test.jpg', 1234, 'test', 42, 'test')).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

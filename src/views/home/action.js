import createAsyncAction from 'utils/createAsyncAction';
import createChainedAsyncAction from 'utils/createChainedAsyncAction';
import api from 'utils/api';

function getTopics() {
  return createAsyncAction('HOME_GET_TOPICS', () => (
    api.get('https://www.v2ex.com/api/topics/hot.json')
  ));
}

function getUser(id) {
  return createAsyncAction('HOME_GET_USER', () => (
    new Promise((resolve, reject) => {
      if (id === 1) {
        setTimeout(() => {
          resolve({
            name: 'Alan',
            age: 24,
          });
        }, 1000);
      } else {
        setTimeout(() => {
          reject({
            error: true,
            message: 'wrong user id',
          });
        }, 1000);
      }
    })
  ));
}

function getArticles(user) {
  return createAsyncAction('HOME_GET_ARTICLES', () => (
    new Promise((resolve, reject) => {
      if (user.age >= 18) {
        setTimeout(() => {
          resolve([{
            title: 'article 1',
          }, {
            title: 'article 2',
          }]);
        }, 1000);
      } else {
        setTimeout(() => {
          reject({
            error: true,
            message: 'user need to be at least 18',
          });
        }, 1000);
      }
    })
  ));
}

function getUserArticles(id) {
  const handlers = [{
    status: 'success',
    callback: getArticles,
  }, {
    status: 'error',
    callback: payload => (() => {
      console.log(payload);
    }),
  }];

  return createChainedAsyncAction(getUser(id), handlers);
}

export default {
  getTopics,
  getUser,
  getUserArticles,
};

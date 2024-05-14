const { v4: uuid4 } = require('uuid');
const auth = require('../auth');

const TABLE_NAME = 'user';

module.exports = function(injectedStore) {
  let store = injectedStore;

  if(!injectedStore) {
    store = require('../../../store/dummy');
  }
  
  function list() {
    return store.list(TABLE_NAME);
  }

  function get(id) {
    return store.get(TABLE_NAME, id);
  }

  async function upsert(body) {
    const user = {
      name: body.name,
      username: body.username
    }

    if(body.id) {
      user.id = body.id;
    } else {
      user.id = uuid4();
    }

    if(body.password || body.username) {
      await auth.upsert({
        id: user.id,
        username: body.username,
        password: body.password
      })
    }

    return store.upsert(TABLE_NAME, user);
  }

  return {
    list,
    get,
    upsert
  };
}
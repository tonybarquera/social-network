const bcrypt = require('bcrypt');
const { sign } = require('../../../auth');

const TABLE_AUTH = 'auth';

module.exports = function(injectedStore) {
  let store = injectedStore;

  if(!injectedStore) {
    store = require('../../../store/dummy');
  }

  async function login(username, password) {
    const data = await store.query(TABLE_AUTH, { username: username });
    
    return bcrypt.compare(password, data.password)
      .then(correct => {
        if(correct) {
          return sign(data);
        } else {
          throw new Error('Información Invalida');
        }
      });
  }
  
  async function upsert(data) {
    const authData = {
      id: data.id
    }

    if(data.username) {
      authData.username = data.username;
    }

    if(data.password) {
      authData.password = await bcrypt.hash(data.password, 5);
    }

    return store.upsert(TABLE_AUTH, authData);
  }

  return {
    login,
    upsert
  };
}
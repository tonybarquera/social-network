const db = {
  'user': [
    { id: '1', name: 'Tony' }
  ]
};

async function list(table) {
  return db[table] || [];
}

async function get(table, id) {
  let collection = await db[table];
  return collection.filter(item => item.id === id)[0] || null;
}

async function upsert(table, data) {
  if(!db[table]) {
    db[table] = [];
  }

  await db[table].push(data);
  console.log(table, db[table]);
}

async function remove(table, id) {
  return true;
}

async function query(table, q) {
  let collection = await list(table);
  console.log(collection);
  let keys = Object.keys(q);
  let key = keys[0];
  return collection.filter(item => item[key] === q[key])[0] || null;
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query
}
const test = require("tape");
const Database = require("../lib/database");

test("Database#getPending()", t => {
  t.plan(11);

  const db = new Database("test/fixtures");

  db.getPending().then(tasks => {
    t.equal(tasks.length, 2);

    const t0 = tasks[0];
    t.equal(t0.name, "Package #1");
    t.equal(t0.store, "amazon");
    t.deepEqual(t0.when, new Date("2017-01-10"));
    t.equal(t0.tracking, "AGSIPNJ0123456789");
    t.equal(t0.status, "On The Way");

    const t1 = tasks[1];
    t.equal(t1.name, "Package #2");
    t.equal(t1.store, "ebay");
    t.deepEqual(t1.when, new Date("2017-01-09"));
    t.equal(t1.tracking, "RF123456789CN");
    t.equal(t1.status, "Waiting For Pickup");
  });
});

test("Database#getArrived()", t => {
  t.plan(6);

  const db = new Database("test/fixtures");

  db.getArrived().then(tasks => {
    t.equal(tasks.length, 1);

    const t0 = tasks[0];
    t.equal(t0.name, "Package #3");
    t.equal(t0.store, "amazon");
    t.deepEqual(t0.when, new Date("2017-01-10"));
    t.equal(t0.tracking, "AGSIPNJ0123456789");
    t.equal(t0.status, "Delivered");
  });
});

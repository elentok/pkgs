const test = require("tape");
const Database = require("../lib/database");

test("Database#getOrders()", t => {
  t.plan(14);

  const db = new Database("test/fixtures");

  db.getOrders().then(orders => {
    t.equal(orders.length, 2);

    const order0 = orders[0];
    t.equal(order0.id, "Order #1");
    t.equal(order0.store, "amazon");
    t.deepEqual(order0.date, new Date("2017-01-10"));
    t.equal(order0.tracking, "AGSIPNJ0123456789");
    t.equal(order0.status, "On The Way");
    t.equal(order0.items.length, 1);

    const item0 = order0.items[0];
    t.equal(item0.id, 123);
    t.equal(item0.title, "Item #1");

    const order1 = orders[1];
    t.equal(order1.id, "Order #2");
    t.equal(order1.store, "ebay");
    t.deepEqual(order1.date, new Date("2017-01-09"));
    t.equal(order1.tracking, "RF123456789CN");
    t.equal(order1.status, "Waiting For Pickup");
  });
});

test("Database#getArchived()", t => {
  t.plan(6);

  const db = new Database("test/fixtures");

  db.getArchived().then(tasks => {
    t.equal(tasks.length, 1);

    const t0 = tasks[0];
    t.equal(t0.id, "Order #3");
    t.equal(t0.store, "amazon");
    t.deepEqual(t0.date, new Date("2017-01-10"));
    t.equal(t0.tracking, "AGSIPNJ0123456789");
    t.equal(t0.status, "Delivered");
  });
});

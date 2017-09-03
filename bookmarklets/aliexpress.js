function parseItem(el) {
  const img = el.querySelector(".product-sets .pic img");

  return {
    img: img.src.replace("50x50", "200x200")
  };
}

function parseOrder(el) {
  const [id, date] = el.querySelectorAll(".order-head .order-info .info-body");

  const items = Array.from(el.querySelectorAll(".order-body")).map(parseItem);

  return {
    id: id.innerText,
    date: new Date(date.innerText),
    items
  };
}

orders = Array.from(document.querySelectorAll(".order-item-wraper")).map(
  parseOrder
);

copy(JSON.stringify(orders));

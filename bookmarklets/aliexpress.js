/* eslint es6: false */
/* global copy document */

(function() {
  function parseItem(el) {
    var img = el.querySelector(".product-sets .pic img");
    var a = el.querySelector(".product-title a");

    var amountItems = el.querySelectorAll(".product-amount span");

    return {
      img: img.src.replace("50x50", "200x200"),
      title: a.title,
      id: a.getAttribute("productid"),
      url: a.href,
      cost: amountItems[0].innerText.trim(),
      quantity: parseInt(amountItems[1].innerText.replace("X", ""), 10)
    };
  }

  function parseOrder(el) {
    var elements = el.querySelectorAll(".order-head .order-info .info-body");
    var id = elements[0];
    var date = elements[1];

    var items = Array.from(el.querySelectorAll(".order-body")).map(parseItem);

    return {
      id: id.innerText,
      date: new Date(date.innerText),
      items: items
    };
  }

  function showPopup(text) {
    var el = document.createElement("div");
    el.style.position = "fixed";
    el.style.left = "15%";
    el.style.right = "15%";
    el.style.top = "15%";
    el.style.bottom = "15%";

    var button = document.createElement("button");
    button.innerText = "Close";
    button.style.fontSize = "20px";
    button.style.fontWeight = "bold";
    button.addEventListener("click", function() {
      el.remove();
    });
    el.appendChild(button);

    var textarea = document.createElement("textarea");
    textarea.style.width = "100%";
    textarea.style.height = "90%";
    textarea.value = text;
    el.appendChild(textarea);

    document.body.appendChild(el);
  }

  var orders = (window.orders = Array.from(
    document.querySelectorAll(".order-item-wraper")
  ).map(parseOrder));

  showPopup(JSON.stringify(orders, null, 2));
})();

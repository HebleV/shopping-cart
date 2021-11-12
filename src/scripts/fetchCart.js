window.addEventListener("DOMContentLoaded", fetchCart);
window.addEventListener("DOMContentLoaded", fetchCartProducts);

function fetchCart() {
  let cart = [];
  const products = JSON.parse(localStorage.getItem("cart"));

  if (!products) {
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    document.getElementById(
      "total_count"
    ).innerHTML = `${products.length} ${products.length > 1 ? "items" : "item"}`;
  }
}

function fetchCartProducts() {
  const products = JSON.parse(localStorage.getItem("cart"));

  if (products.length) {
    document.getElementById(
      "cart_count"
    ).innerHTML = `My Cart (${products.length} ${products.length > 1 ? "items" : "item"}) `;

    for (let i = 0; i < products.length; i++) {
      let cartContainer = document.createElement("div");
      cartContainer.setAttribute("class", "product_container_id");
      cartContainer.setAttribute("id", `${products[i].id}_item`);

      let pdtContainer = document.createElement("div");
      pdtContainer.setAttribute("class", "pdt_container");

      let productImg = document.createElement("img");
      productImg.setAttribute("src", products[i].imgURL);
      productImg.setAttribute("alt", products[i].name);
      productImg.setAttribute("height", "100%");
      productImg.setAttribute("width", "auto");

      let pdtDetail = document.createElement("div");
      pdtDetail.setAttribute("class", "pdt_detail");

      let pdtName = document.createElement("h4");
      pdtName.setAttribute("class", "pdt_name");
      pdtName.innerHTML = products[i].name;

      let qtyContainer = document.createElement("div");
      qtyContainer.setAttribute("class", "qty_container");

      let decreaseCta = document.createElement("button");
      decreaseCta.setAttribute("class", "qty_cta");
      decreaseCta.setAttribute("id", `${products[i].id}_-`);
      decreaseCta.innerHTML = "-";

      let qtySpan = document.createElement("span");
      qtySpan.setAttribute("class", "pdt_desc");
      qtySpan.setAttribute("id", products[i].id);
      qtySpan.innerHTML = products[i].quantity;

      let increaseCta = document.createElement("button");
      increaseCta.setAttribute("class", "qty_cta");
      increaseCta.setAttribute("id", `${products[i].id}_+`);
      increaseCta.innerHTML = "+";

      let spanMultiply = document.createElement("span");
      spanMultiply.setAttribute("class", "pdt_desc");
      spanMultiply.innerHTML = "✕";

      let pdtPrice = document.createElement("span");
      pdtPrice.setAttribute("class", "pdt_desc");
      pdtPrice.setAttribute("id", `${products[i].id}_price`);
      pdtPrice.innerHTML = products[i].price;

      let totalPriceDiv = document.createElement("div");
      totalPriceDiv.setAttribute("class", "total_price");
      totalPriceDiv.setAttribute("id", `${products[i].id}_total`);
      totalPriceDiv.innerHTML = `Rs.${products[i].totalPrice}`;

      qtyContainer.append(decreaseCta);
      qtyContainer.append(qtySpan);
      qtyContainer.append(increaseCta);
      qtyContainer.append(spanMultiply);
      qtyContainer.append(pdtPrice);
      pdtDetail.append(pdtName);
      pdtDetail.append(qtyContainer);
      pdtContainer.append(productImg);
      pdtContainer.append(pdtDetail);
      cartContainer.append(pdtContainer);
      cartContainer.append(totalPriceDiv);

      document.querySelector("#cart_products").appendChild(cartContainer);
    }
    let totalPrice = products.reduce((accumulator, item) => {
      return accumulator + item.totalPrice;
    }, 0);

    document.getElementById("total_price").innerHTML = `Rs. ${totalPrice} >`;
  } else {
    document.getElementById("cart_count").innerHTML = `My Cart (0 item)`;

    let emptyCart = document.createElement("div");
    emptyCart.setAttribute("class", "empty_cart");

    let emptyCartText = document.createElement("h4");
    emptyCartText.setAttribute("class", "emptyCartText");
    emptyCartText.innerHTML = "No items in your cart";

    let noItemText = document.createElement("span");
    noItemText.setAttribute("class", "noItemText");
    noItemText.innerHTML = "Your favorite items are just a click away";

    let checkOutButton = document.createElement("button");
    checkOutButton.setAttribute("class", "checkout_cta");
    checkOutButton.setAttribute("style", "justify-content:center;");
    checkOutButton.innerHTML = "Start Shopping";

    emptyCart.append(emptyCartText);
    emptyCart.append(noItemText);

    document.querySelector("#cart_products").appendChild(emptyCart);
    document.getElementById("checkout_cta_id").innerHTML = "";
    document.querySelector("#checkout_cta_id").appendChild(checkOutButton);
  }
}

function cartUpdates(e) {
  if (e.target && e.target.nodeName === "BUTTON") {
    const arr = e.target.id.split("_");
    const action = arr[1];
    const id = arr[0];
    const cartTotal = parseInt(
      document.getElementById("total_price").innerHTML.split(" ")[1]
    );
    let cart = JSON.parse(localStorage.getItem("cart"));

    if (action === "+") {
      let prev = parseInt(document.getElementById(id).innerHTML);
      const price = parseInt(document.getElementById(`${id}_price`).innerHTML);
      cart = cart.map((item) => {
        if (item.id === id) {
          item.quantity += 1;
          item.totalPrice += item.price;
        }
        return item;
      });

      prev = prev + 1;

      document.getElementById(id).innerHTML = prev;
      document.getElementById(`${id}_total`).innerHTML = `Rs. ${prev * price}`;
      document.getElementById("total_price").innerHTML = `Rs. ${
        cartTotal + price
      } >`;
    }
    if (action === "-") {
      let prev = parseInt(document.getElementById(id).innerHTML);
      const price = parseInt(document.getElementById(`${id}_price`).innerHTML);

      if (prev > 1) {
        cart = cart.map((item) => {
          if (item.id === id) {
            item.quantity -= 1;
            item.totalPrice -= item.price;
          }
          return item;
        });

        prev = prev - 1;
        document.getElementById(id).innerHTML = prev;
        document.getElementById(`${id}_total`).innerHTML = `Rs. ${
          prev * price
        }`;
        document.getElementById("total_price").innerHTML = `Rs. ${
          cartTotal - price
        } >`;
      } else {
        cart = cart.filter((product) => product.id !== id);
        let item = document.getElementById(`${id}_item`);
        item.parentElement.removeChild(item);
        document.getElementById("total_price").innerHTML = `Rs. ${
          cartTotal - price
        } >`;
        document.getElementById(
          "cart_count"
        ).innerHTML = `My Cart (${cart.length} ${cart.length > 1 ? "items" : "item"})`;
        document.getElementById(
          "total_count"
        ).innerHTML = `${cart.length} ${cart.length > 1 ? "items" : "item"}`;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

document.getElementById("cart_products").addEventListener("click", cartUpdates);

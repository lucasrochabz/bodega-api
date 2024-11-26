class Orders {
  constructor(id, user_id, address_id, date, status, product_id) {
    this.id = id;
    this.user_id = user_id;
    this.address_id = address_id;
    this.date = date;
    this.status = status;
    this.product_id = product_id;
  }
}

module.exports = Orders;

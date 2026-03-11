class Address {
  constructor({
    id = null,
    user_id = null,
    street,
    number,
    neighborhood,
    city,
    state,
    zip_code,
  }) {
    this.id = id;
    this.user_id = user_id;
    this.street = street;
    this.number = number;
    this.neighborhood = neighborhood;
    this.city = city;
    this.state = state;
    this.zip_code = zip_code;
  }

  attachToUser(userId) {
    this.user_id = userId;
  }

  toPersistence() {
    return {
      user_id: this.user_id,
      street: this.street,
      number: this.number,
      neighborhood: this.neighborhood,
      city: this.city,
      state: this.state,
      zip_code: this.zip_code,
    };
  }

  toPublic() {
    return {
      street: this.street,
      number: this.number,
      neighborhood: this.neighborhood,
      city: this.city,
      state: this.state,
      zip_code: this.zip_code,
    };
  }
}

export default Address;

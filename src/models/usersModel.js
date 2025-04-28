class User {
  constructor({
    id = null,
    first_name,
    last_name,
    email,
    password,
    street,
    number,
    neighborhood,
    city,
    state,
    zip_code,
    role,
  }) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
    this.street = street;
    this.number = number;
    this.neighborhood = neighborhood;
    this.city = city;
    this.state = state;
    this.zip_code = zip_code;
    this.role = role;
  }
}

module.exports = User;

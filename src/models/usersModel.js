class User {
  constructor({
    id = null,
    first_name,
    last_name,
    email,
    password,
    role = 'user',
  }) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  toPersistence() {
    return {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      password: this.password,
      role: this.role,
    };
  }

  toPublic() {
    return {
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      role: this.role,
    };
  }

  isAdmin() {
    return this.role === 'admin';
  }
}

export default User;

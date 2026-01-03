export const createUserDTO = (body) => {
  return {
    first_name: body.firstName,
    last_name: body.lastName,
    email: body.email,
    password: body.password,
    zip_code: body.zipCode,
    street: body.street,
    number: body.number,
    neighborhood: body.neighborhood,
    city: body.city,
    state: body.state,
  };
};

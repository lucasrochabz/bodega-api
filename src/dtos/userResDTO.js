// fix: mudar nome para userResponseDTO não só aqui mas nos outros
export const userResDTO = (user) => {
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    address: {
      street: user.address.street,
      number: user.address.number,
      neighborhood: user.address.neighborhood,
      city: user.address.city,
      state: user.address.state,
      zipCode: user.address.zip_code,
    },
  };
};

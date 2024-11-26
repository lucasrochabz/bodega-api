class Addresses {
  constructor(id, user_id, rua, numero, cidade, estado, cep) {
    this.id = id;
    this.user_id = user_id;
    this.rua = rua;
    this.numero = numero;
    this.cidade = cidade;
    this.estado = estado;
    this.cep = cep;
  }
}

module.exports = Addresses;

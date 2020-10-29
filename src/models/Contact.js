module.exports = class Contact {
  constructor(id, name, email, phone) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.id = id;
  }
  get getName() {
    return this.name;
  }
  set setName(n) {
    this.name = n;
  }
  get getEmail() {
    return this.email;
  }
  set setEmail(e) {
    this.email = e;
  }
  get getPhone() {
    return this.phone
  }
  set setPhone(p) {
    this.phone = p;
  }
  get getId() {
    return this.id;
  }

}
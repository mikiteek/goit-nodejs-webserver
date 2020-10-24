class ErrorBadRequest400 extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

module.exports = ErrorBadRequest400;
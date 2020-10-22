const checkContactOperationService = (contact, res) => {
  if (!contact) {
    return res.status(404).json({message: "Not found"});
  }
}

module.exports = checkContactOperationService;
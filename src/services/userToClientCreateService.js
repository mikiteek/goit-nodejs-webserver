const userToClientService = ({email, subscription, avatarURL}) => {
  const userToClient = {
    email,
    subscription,
    avatarURL,
  }
  return userToClient;
}

module.exports = userToClientService;
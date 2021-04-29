const users = [];

// Join user to chat
function userJoin(id, username, group) {
  const user = { id, username, group };

  users.push(user);

  return user;
}

// Get current user
function getCurrentUser(id) {
  console.log("id", id)
  return users.find(user => user.id === id);
}

// Get group users
function getGroupUsers(group) {
  return users.filter(user => user.group === group);
}

module.exports = {
  userJoin,
  getCurrentUser,
  getGroupUsers
};

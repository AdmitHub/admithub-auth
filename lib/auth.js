ahAuth = {};

ahAuth.VALID_ROLES = ["Admin", "ForumEditor"];
ahAuth.adminUserFieldFilter = {
  _id: true,
  emails: true,
  profile: true,
  roles: true,
  createdAt: true
};

/*
 * Define functions like ``ahAuth.isAdmin``, ``ahAuth.isHighschool``.
 */
_.each(ahAuth.VALID_ROLES, function(role) {
  ahAuth["is" + role] = function(user) {
    user = user || Meteor.user();
    return Roles.userIsInRole(user, role);
  }
});

if (Meteor.isClient) {
  UI.registerHelper("ahAuthIsAdmin", function(user) {
    return ahAuth.isAdmin(user);
  });
}

ahAuth = {};

ahAuth.VALID_ROLES = ["Admin", "ForumEditor", "Student", "Officer", "Editor"];
ahAuth.adminUserFieldFilter = {
  _id: true,
  emails: true,
  profile: true,
  roles: true,
  createdAt: true
};

function ensureRoleExists(role) {
  if (!Meteor.roles.findOne({
    name: role
  })) {
    Roles.createRole(role);
  }
}

/*
 * Define functions like ``ahAuth.isAdmin``, ``ahAuth.isHighschool``.
 */
_.each(ahAuth.VALID_ROLES, function(role) {
  ensureRoleExists(role);
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

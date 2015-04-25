Meteor.methods({
  setRole: function(userId, role, val) {
    if (ahAuth.isAdmin(Meteor.userId()) && _.contains(ahAuth.VALID_ROLES, role)) {
      if (val) {
        Roles.addUsersToRoles(userId, [role]);
      } else {
        if (role === "Admin" && userId === Meteor.userId()) {
          throw new Meteor.Error("Can't remove your own Admin bit");
        }
        Roles.removeUsersFromRoles(userId, [role]);
      }
    } else {
      throw new Meteor.Error("Permission Denied");
    }
  }
});

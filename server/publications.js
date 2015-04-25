Meteor.publish('adminUsersList', function() {
  if (ahAuth.isAdmin(this.userId)) {
    return Meteor.users.find({}, {
      _id: true,
      emails: true,
      profile: true,
      roles: true,
      createdAt: true
    });
  }
  return [];
});
Meteor.publish('adminUserDetail', function(id) {
  if (ahAuth.isAdmin(this.userId)) {
    return Meteor.users.find({_id: id}, ahAuth.adminUserFieldFilter);
  }
  return [];
});

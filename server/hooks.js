Meteor.users.before.insert(function(userId, doc) {
  if (doc.emails && doc.emails[0] && doc.emails[0].address) {
    doc.email_hash = Gravatar.hash(doc.emails[0].address);
  }
});

Meteor.users.before.update(function(userId, doc, fieldNames, modifier, options) {
  if (_.contains(fieldNames, "emails") && modifier.$set &&
        doc.emails && doc.emails[0] && doc.emails[0].address) {
    modifier.$set["email_hash"] = Gravatar.hash(doc.emails[0].address);
  }
});


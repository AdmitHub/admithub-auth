Meteor.startup(function() {
  Accounts.emailTemplates.enrollAccount.subject = function(user) {
    return "Activate your AdmitHub account";
  };
  Accounts.emailTemplates.enrollAccount.text = function(user, url) {
    return SSR.render("enrollAccount.txt", {
      user: user,
      url: url
    });
  };
  Accounts.emailTemplates.enrollAccount.html = function(user, url) {
    return SSR.render("enrollAccount.html", {
      user: user,
      url: url
    });
  }
});
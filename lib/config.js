if (Meteor.isServer) {
  Meteor.startup(function() {
    Accounts.emailTemplates.siteName = "AdmitHub";
    Accounts.emailTemplates.from = "bot@admithub.com";
  });
}

AccountsTemplates.addField({
  _id: "username",
  type: "text",
  displayName: "username",
  required: true,
  minLength: 3,
  errStr: "error.minChar"
});

AccountsTemplates.removeField("email");
AccountsTemplates.addField({
  _id: "email",
  type: "email",
  required: true,
  re: SimpleSchema.RegEx.Email,
  errStr: 'error.accounts.Invalid email',
  trim: true,
  lowercase: true
});

AccountsTemplates.removeField('password');
AccountsTemplates.addField({
  _id: 'password',
  type: 'password',
  required: true,
  minLength: 8,
  errStr: 'error.minChar'
});

// Routes https://github.com/meteor-useraccounts/core/blob/master/Guide.md#routing
AccountsTemplates.configureRoute('signIn', {path: "/login", redirect: "/profile"});
AccountsTemplates.configureRoute('signUp', {path: "/register", redirect: "/"});
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('changePwd', {path: '/change-password'});
if (Meteor.isClient) {
  Router.route("/logout", {
    name: 'logout',
    template: 'logout',
    onBeforeAction: function() {
      Meteor.logout(function(){});
      Router.go("/");
      this.next();
    }
  });
  Meteor.startup(function() {
    AccountsTemplates.knownRoutes.push('/logout');
  });
}

AccountsTemplates.configure({
  homeRoutePath: '/',
  enablePasswordChange: true,
  showForgotPasswordLink: true,
  confirmPassword: false,
  overrideLoginErrors: true,

  negativeFeedback: false,
  positiveFeedback: false,
  negativeValidation: true,
  positiveValidation: true,

  texts: {
    signInLink_link: "Log in",
    button: {
      signIn: "Log in",
      signUp: "Register"
    },
    title: {
      signIn: "Log in",
      signUp: "Register"
    }
  }
});

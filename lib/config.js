Avatar.options = {
  fallbackType: "default image",
  defaultImageUrl: "/packages/admithub_admithub-auth/public/owlAvatar.png",
  emailHashProperty: "telescope.emailHash" // Compatible with Telescope
};

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

AccountsTemplates.configure({
  defaultState: 'signUp',
  defaultLayout: 'layout',
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
    pwdLink_link: "Do you need a new password?",
    button: {
      signIn: "Log in",
      signUp: "Register"
    },
    title: {
      signIn: "Log in",
      signUp: "Register"
    },
    errors: {
      loginForbidden: "Username or password are not correct"
    }

  }
})

// Routes https://github.com/meteor-useraccounts/core/blob/master/Guide.md#routing
AccountsTemplates.configureRoute('signIn', {path: "/login", redirect: "/profile/me"});
AccountsTemplates.configureRoute('signUp', {path: "/register", redirect: "/"});
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('changePwd', {path: '/change-password'});
AccountsTemplates.configureRoute('verifyEmail', {path: '/verify-email'});
AccountsTemplates.configureRoute('enrollAccount', {path: '/enroll-account'});

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

  // XXX Workaround. Deal with bug where AT doesn't show the regsiter form for
  // the register route
  Router.onAfterAction(function() {
    AccountsTemplates.setState("signUp");
  }, {only: "atSignUp"});

}

if (Meteor.isServer) {
  Meteor.startup(function() {
    if (!Meteor.settings) {
      console.log("Skipping social auth config; Meteor.settings not found.");
      return;
    }
    if (Meteor.settings.facebook &&
        Meteor.settings.facebook.appId &&
        Meteor.settings.facebook.secret) {
      ServiceConfiguration.configurations.upsert({"service": "facebook"}, {$set: {
          "appId": Meteor.settings.facebook.appId,
          "secret": Meteor.settings.facebook.secret
      }});
    }

    if (Meteor.settings.twitter &&
        Meteor.settings.twitter.apiKey &&
        Meteor.settings.twitter.secret) {
      ServiceConfiguration.configurations.upsert({"service": "twitter"}, {$set: {
        "apiKey": Meteor.settings.twitter.apiKey,
        "secret": Meteor.settings.twitter.secret
      }});
    }
  });
}

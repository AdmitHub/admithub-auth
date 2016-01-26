Package.describe({
  name: "admithub:admithub-auth",
  summary: "Authentication configuration for admithub sites",
  version: "0.0.6",
  git: "https://github.com/AdmitHub/admithub-auth.git"
});

Package.onUse(function(api) {

  api.use([
    'templating',
    'accounts-base',
    'accounts-password',
    'accounts-twitter',
    'accounts-facebook',
    'accounts-ui',
    'underscore',

    'alanning:roles@1.2.13',
    'aldeed:simple-schema@1.3.3',
    'utilities:avatar@0.9.0',
    'jparker:gravatar@0.4.1',
    'iron:router@1.0.9',
    'kestanous:herald@1.3.0',
    'matb33:collection-hooks@0.8.0',
    'useraccounts:unstyled@1.12.3',
    'useraccounts:iron-routing@1.12.3',
    "meteorhacks:ssr"
  ]);

  api.imply(['useraccounts:unstyled', 'useraccounts:core', 'utilities:avatar']);


  api.addFiles('lib/config.js', ['client', 'server']);
  api.addFiles('lib/auth.js', ['client', 'server']);
  api.addAssets('public/owlAvatar.png', ['client', 'server']);
  api.addFiles('client/views/userMenu.html', 'client');
  api.addFiles('server/hooks.js', 'server');
  api.addFiles('server/methods.js', 'server');
  api.addFiles('server/publications.js', 'server');
  api.addFiles('server/enrollAccount.js', 'server');
  api.addFiles('email/enrollAccount.js', 'server');
  api.addAssets([
    "email/enrollAccount.html",
    "email/enrollAccount.txt"
  ], "server");

  api.export('ahAuth', ['client', 'server']);
});

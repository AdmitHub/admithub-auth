Package.describe({
  name: "admithub:admithub-auth",
  summary: "Authentication configuration for admithub sites",
  version: "0.0.4",
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

    'alanning:roles@1.2.12',
    'aldeed:simple-schema',
    'bengott:avatar@0.7.6',
    'iron:router',
    'useraccounts:unstyled@1.9.1',
  ]);

  api.imply(['useraccounts:unstyled', 'useraccounts:core', 'bengott:avatar']);

  
  api.addFiles('lib/config.js', ['client', 'server']);
  api.addFiles('lib/auth.js', ['client', 'server']);
  api.addFiles('client/views/userMenu.html', 'client');
  api.addFiles('server/methods.js', 'server');
  api.addFiles('server/publications.js', 'server');
  
  api.export('ahAuth', ['client', 'server']);
});

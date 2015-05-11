Package.describe({
  name: "admithub:admithub-auth",
  summary: "Authentication configuration for admithub sites",
  version: "0.0.5",
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
    'jparker:gravatar',
    'iron:router',
    'kestanous:herald@1.3.0',
    'matb33:collection-hooks',
    'useraccounts:unstyled@1.9.1'
  ]);

  api.imply(['useraccounts:unstyled', 'useraccounts:core', 'bengott:avatar']);

  
  api.addFiles('lib/config.js', ['client', 'server']);
  api.addFiles('lib/auth.js', ['client', 'server']);
  api.addFiles('public/owlAvatar.png', ['client', 'server'], {isAsset: true});
  api.addFiles('client/views/userMenu.html', 'client');
  api.addFiles('client/views/userMenu.js', 'client');
  api.addFiles('server/hooks.js', 'server');
  api.addFiles('server/methods.js', 'server');
  api.addFiles('server/publications.js', 'server');
  
  api.export('ahAuth', ['client', 'server']);
});

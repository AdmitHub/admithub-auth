Package.describe({
  name: "admithub:admithub-auth",
  summary: "Authentication configuration for admithub sites",
  version: "0.0.1",
  git: "https://github.com/AdmitHub/admithub-auth.git"
});

Package.onUse(function(api) {

  api.use([
    'accounts-base',
    'accounts-password',
    'accounts-twitter',
    'accounts-facebook',
    'accounts-ui',
    'useraccounts:unstyled@1.8.1',
    'iron:router',
    'aldeed:simple-schema'
  ]);

  api.imply(['useraccounts:unstyled', 'useraccounts:core']);

  
  api.addFiles('lib/config.js', ['client', 'server']);
  
  api.export([]);
});

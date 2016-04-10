# azure-functions-auth0

Authenticating Azure Functions with Auth0. See [this blog post](http://fabriccontroller.net/using-auth0-for-auuthentication-in-your-azure-functions/) for more details.

## Configuration

```js
const auth0 = require('azure-functions-auth0')({
  clientId: '...',
  clientSecret: '...',
  domain: 'example.auth0.com'
});

module.exports = auth0(function(context, req) {
  // YOUR USUAL CODE GOES HERE.
  if (req.user)) {
    context.res = {
      body: req.user
    };
  }
  else {
    context.res = {
      status: 400,
      body: "The user seems to be missing"
    };
  }
  context.done();
});
```

## Usage

Now then when you make a call to the Http endpoint you'll need to add an Auth0 user token in the header. Eg:

```bash
GET https://functionsad5bb49d.azurewebsites.net/api/my-http-function?code=1pvuf...
Authorization: Bearer my-auth0-token
```

A [boilerplate repository](https://github.com/sandrinodimattia/azure-functions-auth0-boilerplate) is also available to show how this works.

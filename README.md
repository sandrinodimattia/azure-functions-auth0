# azure-functions-auth0

Authenticating Azure Functions with Auth0.

## Usage

```js
const auth0 = require('azure-functions-auth0')({
  clientId: '...',
  clientSecret: '...',
  domain: 'example.auth0.com'
});

module.exports = auth0(function(context, req) {
  // YOUR USUAL CODE GOES HERE.
});
```

Now then when you make a call to the Http endpoint you'll need to add an Auth0 user token in the header. Eg:

```bash
GET https://functionsad5bb49d.azurewebsites.net/api/my-http-function?code=1pvuf...
Authorization: Bearer my-auth0-token
```

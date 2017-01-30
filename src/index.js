import jwt from 'express-jwt';
import ArgumentError from './errors/ArgumentError';

module.exports = (options) => {
  if (!options || !(options instanceof Object)) {
    throw new ArgumentError('The options must be an object.');
  }

  if (!options.clientId || options.clientId.length === 0) {
    throw new ArgumentError('The Auth0 Client ID has to be provided.');
  }

  if (!options.clientSecret || options.clientSecret.length === 0) {
    throw new ArgumentError('The Auth0 Client Secret has to be provided.');
  }

  if (!options.domain || options.domain.length === 0) {
    throw new ArgumentError('The Auth0 Domain has to be provided.');
  }

  const middleware = jwt({
    //Auth0 stops generating Base64 Client Secret after 6th Dec, so this has to allow both
    secret: options.isSecretBase64 ? new Buffer(options.clientSecret, 'base64') : options.clientSecret,
    audience: options.clientId,
    issuer: 'https://' + options.domain + '/'
  });

  return (next) => {
    return (context, req) => {
      middleware(req, null, (err) => {
        if (err) {
          context.res = {
            status: err.status || 500,
            body: {
              message: err.message
            }
          };

          return context.done();
        }

        return next(context, req);
      });
    };
  };
};

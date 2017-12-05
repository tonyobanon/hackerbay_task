'use strict';

const errors = require('../errors');

/**
 * Authentication Service.
 *
 * This class coordinates the logic for JWT generation
 */
class AuthenticationService {

    /**
     * Class constructor
     *
     * @constructor
     */
    constructor(config, logger, metrics, jwt, datastore) {
        this.config = config;
        this.logger = logger;
        this.metrics = metrics;
        this.jwt = jwt;
        this.datastore = datastore;
    }

    /**
     * Perform login for a user
     *
     * @param  {String} username The username with which the user is attempting to login
     * @param  {String} password The password with which the user wished to login
     * @param  {Object} context  The context around the login attempt; ip address, user agent etc.
     *
     * @return {Promise}          The logged in JWT token
     */
    login(username, password, context) {

        let sessionToken;

        return this._getSessionToken(username, password)
            .then((token) => {

                sessionToken = token;

                // a jwt token is returned
                return this.jwt.createToken(token.id, this.config.jwt.issuer, token.session_token, true);
            })
            .then(jwt => {
                let promises = [];

                promises.push(
                    this._storeJwt(sessionToken.id, jwt)
                );

                promises.push(
                    this._newLoginAttempt(context, true, sessionToken.id)
                );

                return Promise.all(promises).then(() => {
                    return jwt;
                });
            })
            .catch((err) => {

                this._newLoginAttempt(context, false);
                return Promise.reject(err);
            });
    }

    /**
     * Validates that a token is still valid/active
     * @param  {String} token   The JWT token provided by the user
     *
     * @return {Promise} encodedData of the jwt token
     */
    verify(token) {

        let encodedData;

        return this.jwt.verifyToken(token, this.config.jwt.issuer)

            .then(data => {

                encodedData = data;
                return this._getStoredJwt(encodedData.jti);
            })

            .then(tokenEntity => {

                if (!tokenEntity) {
                    return Promise.reject(errors.UnknownJwt('Jwt token origin could not be verified. Please login'));
                }

                if (!tokenEntity.is_active) {
                    return Promise
                        .reject(errors.InvalidSession('Token is expired, because you are logged out. Please login'));
                }

                return encodedData;
            })

            .catch(err => {
                return Promise.reject(err);
            });
    }

    logout(token) {

        let tokenId;

        return this.verify(token)
            .then(data => {

                tokenId = data.jti;
                return this._invalidateSessionToken(data.sToken);
            })
            .then(() => {
                return this._invalidateStoredJwt(tokenId);
            });
    }

    _storeJwt(id, token) {
        return new Promise((resolve) => {
            resolve(this.datastore.save('jwt_tokens', id, {
                id: id,
                token: token,
                is_active: true
            }));
        });
    }

    _getStoredJwt(id) {
        return new Promise((resolve) => {
            resolve(this.datastore.get('jwt_tokens', id));
        });
    }

    _invalidateStoredJwt(id) {
        return new Promise((resolve) => {
            resolve(this.datastore.update('jwt_tokens', id, {
                is_active: false
            }));
        });
    }

    _newLoginAttempt(context, successful, tokenId) {
        return new Promise((resolve) => {
            let id = tokenId || `guest-${Math.floor(Math.random() * 1200)}`;

            let attempt = {
                context: context,
                is_successful: successful,
                source: 'Web',
                authentication_token_id: tokenId
            };
            resolve(this.datastore.save('login_attempts', id, attempt));
        });
    }

    /**
     *
     * Given a username and password, this function returns a session token. It pretends to call an Auth server
     * ¯\_(ツ)_/¯
     * */
    _getSessionToken(username, password) {
        return new Promise((resolve) => {
            let crypto = require('crypto');
            let hash = crypto.createHash('sha512').update(`${username}_${password}`).digest('hex');
            resolve({
                id: Math.floor(Math.random() * 1200),
                session_token: hash
            });
        });
    }

    /**
     *
     * Given a session token, this function invalidates. It pretends to call an Auth server
     * */
    _invalidateSessionToken() {

        // Tell the Auth server to invalidate the session token ¯\_(ツ)_/¯
    }
}

module.exports = AuthenticationService;

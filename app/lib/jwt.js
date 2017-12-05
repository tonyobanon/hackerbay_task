'use strict';

let moment = require('moment');
const errors = require('app/errors');

class Jwt {

    constructor(config, logger, metrics, jsonwebtoken) {

        this.config = config;
        this.logger = logger;
        this.metrics = metrics;
        this.jsonwebtoken = jsonwebtoken;
    }

    /**
     * Create a JWT based on parameters received
     * @param jti  - Unique identifier of the token.
     * @param iss  - The token issuer, used to indicate who issued the token.
     * @param sToken - Session Token
     * @param {Boolean} timestamp - Whether to generate a timestamp as part of the token data
     *
     * @return {Promise} the jwt token
     */
    createToken(jti, iss, sToken, timestamp) {

        let tokenData = {};

        tokenData.jti = jti;
        tokenData.iss = iss;

        if (timestamp) {
            tokenData.iat = moment().unix();
        }

        tokenData.sToken = sToken;

        let options = {
            algorithm: this.config.jwt.algorithm,
            expiresIn: parseInt(this.config.jwt.token_expiry)
        };

        let privateKey = this.config.jwt[iss + '_private_key'];

        if (!privateKey) {
            return Promise.reject(new errors.IssuerPrivateKeyNotFound('No private key found for issuer - ' + iss));
        }

        try {
            return Promise.resolve(this.jsonwebtoken.sign(tokenData, privateKey, options));
        } catch (e) {
            return Promise.reject(new errors.UnableToGenerateJwt('Unable to generate JWT'));
        }
    }

    /**
     * Verifies a JWT against the current issuer public key.
     * On successful validation, the decoded payload is returned without verifying if the signature is valid.
     *
     * @param token - The JWT token to verify
     * @param iss - The token issuer
     *
     * @return {Promise}
     */
    verifyToken(token, iss) {

        let publicKey = this.config.jwt[iss + '_public_key'];

        let options = {
            maxAge: 60 * 60
        };

        if (!publicKey) {
            return Promise.reject(errors.IssuerPublicKeyNotFound('No public key found for issuer - ' + iss));
        }

        try {

            let tokenData = this.jsonwebtoken.verify(token, publicKey, options);

            if (tokenData.iss !== iss) {
                return Promise.reject(errors.JwtTokenIssuerMismatch());
            }

            return Promise.resolve(tokenData);

        } catch (exception) {
            return Promise.reject(errors.InvalidJwt('Unable to validate JWT token'));
        }
    }

}

module.exports = Jwt;


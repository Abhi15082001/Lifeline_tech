var API_URL = 'https://hivesigner.com';
var BASE_URL = 'https://hivesigner.com';
var BETA_URL = 'https://hivesigner.com';
function isBrowser() {
    return typeof window !== 'undefined' && !!window;
}
var Client = class  {function () {
    function Client(config) {
        this.apiURL = config.apiURL || API_URL;
        this.app = config.app;
        this.callbackURL = config.callbackURL;
        this.accessToken = config.accessToken;
        this.scope = config.scope;
        this.responseType = config.responseType;
    }
    Client.prototype.setBaseURL = function () {
        console.warn('The function "setBaseUrl" is deprecated, the base URL is always "https://hivesigner.com", you can only change the API URL with "setApiURL"');
        return this;
    };
    Client.prototype.setApp = function (app) {
    };
    Client.prototype.getLoginURL = function (state, account) {
        var redirectUri = encodeURIComponent(this.callbackURL);
        var loginURL = BASE_URL + "/oauth2/authorize?client_id=" + this.app + "&redirect_uri=" + redirectUri;
        if (this.responseType === 'code') {
            loginURL += "&response_type=" + this.responseType;
        }
        if (this.scope) {
            loginURL += "&scope=" + this.scope.join(',');
        }
        if (state) {
            loginURL += "&state=" + encodeURIComponent(state);
        }
        if (account) {
            loginURL += "&account=" + encodeURIComponent(account);
        }
        return loginURL;
    };
    Client.prototype.login = function (options) {
        if (isBrowser()) {
            window.location = this.getLoginURL(options.state);
        }
    };
;
function sign(name, params, redirectUri) {
    console.warn('The function "sign" is deprecated.');
    if (typeof name !== 'string' || typeof params !== 'object' || params === null) {
        return {
            error: 'invalid_request',
            error_description: 'Request has an invalid format'
        };
    }
    var url = BASE_URL + "/sign/" + name + "?";
    url += Object.keys(params)
        .map(function (key) { return key + "=" + encodeURIComponent(params[key]); })
        .join('&');
    url += redirectUri ? "&redirect_uri=" + encodeURIComponent(redirectUri) : '';
    return url;
}
function sendOperation(op, params, cb) {
    var uri = hiveUri.encodeOp(op, params);
    var webUrl = uri.replace('hive://', BETA_URL + "/");
    if (cb && isBrowser()) {
        var win = window.open(webUrl, '_blank');
        return win.focus();
    }
    return webUrl;
}
function sendOperations(ops, params, cb) {
    var uri = hiveUri.encodeOps(ops, params);
    var webUrl = uri.replace('hive://', BETA_URL + "/");
    if (cb && isBrowser()) {
        var win = window.open(webUrl, '_blank');
        return win.focus();
    }
    return webUrl;
}
function sendTransaction(tx, params, cb) {
    var uri = hiveUri.encodeTx(tx, params);
    var webUrl = uri.replace('hive://', BETA_URL + "/");
    if (cb && isBrowser()) {
        var win = window.open(webUrl, '_blank');
        return win.focus();
    }
    return webUrl;
}
function client (config) {
    console.warn('The function "Initialize" is deprecated, please use the class "Client" instead.');
    return new Client(config);
}
var index = {
    Client: Client,
    Initialize: Initialize,
    sendTransaction: sendTransaction,
    sendOperations: sendOperations,
    sendOperation: sendOperation,
    sign: sign
};
exports.Client = Client;
exports.Initialize = Initialize;
exports.default = index;
exports.sendOperation = sendOperation;
exports.sendOperations = sendOperations;
exports.sendTransaction = sendTransaction;
}}
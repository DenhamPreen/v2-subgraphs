"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chains = void 0;
var arbitrum = require("../addresses/arbitrum");
var avalanche = require("../addresses/avalanche");
var base = require("../addresses/base");
var blast = require("../addresses/blast");
var bsc = require("../addresses/bsc");
var gnosis = require("../addresses/gnosis");
var mainnet = require("../addresses/mainnet");
var optimism = require("../addresses/optimism");
var polygon = require("../addresses/polygon");
var scroll = require("../addresses/scroll");
var sepolia = require("../addresses/sepolia");
var zksync = require("../addresses/zksync");
var filter = function (list, version) {
    return (list
        .filter(function (entry) { return entry[2] === version; })
        .map(function (entry) {
        var _a;
        return ({
            address: ((_a = entry[0]) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || "",
            alias: entry[1],
            version: entry[2],
        });
    }) || []);
};
var chains = function () {
    var list = [
        arbitrum,
        avalanche,
        base,
        blast,
        bsc,
        gnosis,
        mainnet,
        optimism,
        polygon,
        scroll,
        sepolia,
        zksync,
    ];
    /** Merging the linear and dynamic arrays with a spread operator will break mustache's template engine */
    return list.map(function (item) { return ({
        id: item.chainId,
        name: item.chain,
        start_block: item.startBlock_merkle,
        V21: {
            factory: filter(item.factory, "V21"),
        },
        V22: {
            factory: filter(item.factory, "V22"),
        },
    }); });
};
exports.chains = chains;

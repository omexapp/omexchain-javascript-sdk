import "babel-polyfill"
import * as client from "./client"
import * as crypto from "./crypto"

const { OMEXChainClient }  = client
module.exports = OMEXChainClient
module.exports.crypto = crypto


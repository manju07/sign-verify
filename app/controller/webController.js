const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 512});


let webCtrl = function () {

    /**
     * Signed the message
     * @returns signature
     */
    this.sign = function (req, res) {

        let sign = key.sign(req.body.message, 'base64');
        res.send({"sign":sign});
        res.end();

    };

     /**
     * verify the signed message
     * @param message,sign value
     * @returns true/false
     */
    this.verify = function (req, res) {
        let verify = key.verify(req.body.message,req.body.sign,'utf8', 'base64');
        res.send({"response":verify});
        res.end();
    }
}

module.exports = new webCtrl();

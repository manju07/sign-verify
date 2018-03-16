var NodeRSA = require('node-rsa');
var key = new NodeRSA({b: 512});
 

var objData={};

let webCtrl = function () {

    /**
     * Signed the message
     */
    this.sign = function (req, res) {

        var text = 'Hello RSA!';
        var encrypted = key.encrypt(text, 'base64');
        console.log('encrypted: ', encrypted);
        var decrypted = key.decrypt(encrypted, 'utf8');
        console.log('decrypted: ', decrypted);


        console.log(req.body.message);
        res.send({"message":"Hi hello1"});
        res.end();

    };
     /**
     * verify the signed message
     */
    this.verify = function (req, res) {

        res.send({"message":"Hi hello2"});
        res.end();
    }
}

module.exports = new webCtrl();

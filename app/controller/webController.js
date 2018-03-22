const sshpk = require('sshpk');
const fs = require('fs');

var data = 'some data';

var signature;

let webCtrl = function () {

    /**
     * Signed the message
     * @returns signature
     */
    this.sign = function (req, res) {

        /* Read in an OpenSSH/PEM *private* key */
        let keyPriv = fs.readFileSync('C:/Users/M/.ssh/id_rsa');
        let key = sshpk.parsePrivateKey(keyPriv, 'pem');


        /* Sign some data with the key */
        let s = key.createSign('sha1');
        s.update(req.body.message);
        signature = s.sign();

        res.send({
            "sign": signature.toString()
        });
        res.end();

    };

    /**
     * verify the signed message
     * @param message,sign value
     * @returns true/false
     */
    this.verify = function (req, res) {

        /* Now load the public key*/
        let keyPub = fs.readFileSync('C:/Users/M/.ssh/id_rsa.pub');
        let key = sshpk.parseKey(keyPub, 'ssh');


        /* Make a crypto.Verifier with this key */
        let v = key.createVerify('sha1');
        v.update(req.body.message);
                
        res.send({
            "response": v.verify(signature)
        });
        res.end();
    }
}

module.exports = new webCtrl();

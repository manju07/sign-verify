const sshpk = require('sshpk');
const fs = require('fs');
var crypto = require('crypto');

let webCtrl = function () {

    /**
     * Signed the message
     * @returns signature
     */
    this.sign = function (req, res) {

        /* Read in an OpenSSH/PEM *private* key */
        let keyPriv = fs.readFileSync(process.env.LICENSE_PRIVATE_KEY || (process.env.HOME + '/.ssh/id_rsa'));
        let key = sshpk.parsePrivateKey(keyPriv, 'pem');


        /* Sign some data with the key */
        let s = key.createSign('sha1');
        var msg = crypto.createHash('sha256').update(req.body.message, 'utf8').digest().toString('base64');
        s.update(msg);
        var signature = s.sign();

        res.send({
            "sign": signature.toString('asn1'),
            "prodId": msg
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
        let keyPub = fs.readFileSync(process.env.LICENSE_PUBLIC_KEY || (process.env.HOME + '/.ssh/id_rsa.pub'));
        let key = sshpk.parseKey(keyPub, 'ssh');


        /* Make a crypto.Verifier with this key */
        let v = key.createVerify('sha1');
        v.update(req.body.message);
        try {
            var signature = sshpk.parseSignature(req.body.sign, 'rsa', 'asn1');
        }
        catch (e) {
            console.error("error in parsing signature", e)
        }
        res.send({
            "response": v.verify(signature)
        });
        res.end();
    }
}

module.exports = new webCtrl();

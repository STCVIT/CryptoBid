// const crypto = require('crypto');
// const ENCRYPTION_KEY = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
// const iv = crypto.randomBytes(16);
// const IV_LENGTH = 16; 

// function encrypt(text) {
//     let iv = crypto.randomBytes(IV_LENGTH);
//     let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
//     let encrypted = cipher.update(text);
   
//     encrypted = Buffer.concat([encrypted, cipher.final()]);
   
//     return iv.toString('hex') + ':' + encrypted.toString('hex');
//    }
   
//    function decrypt(text) {
//     let textParts = text.split(':');
//     let iv = Buffer.from(textParts.shift(), 'hex');
//     let encryptedText = Buffer.from(textParts.join(':'), 'hex');
//     let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
//     let decrypted = decipher.update(encryptedText);
   
//     decrypted = Buffer.concat([decrypted, decipher.final()]);
   
//     return decrypted.toString();
//    }
// module.exports = {
//     encrypt,
//     decrypt
// // };
// import { Crypt, RSA } from 'hybrid-crypto-js';
// // var crypto = require("crypto");
// var path = require("path");
// var fs = require("fs");

// const passphrase = "mySecret"
// const encrypt = function(toEncrypt, relativeOrAbsolutePathToPublicKey) {
//     var absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
//     var publicKey = fs.readFileSync(absolutePath, "utf8");
//     var buffer = Buffer.from(toEncrypt);
//     var encrypted = crypto.publicEncrypt(publicKey, buffer);
//     return encrypted.toString("base64");
// };

// var decrypt = function(toDecrypt, relativeOrAbsolutePathtoPrivateKey) {
//     var absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey);
//     var privateKey = fs.readFileSync(absolutePath, "utf8");
//     var buffer = Buffer.from(toDecrypt, "base64");
//     const decrypted = crypto.privateDecrypt(
//         {
//             key: privateKey.toString(),
//             passphrase: passphrase,
//         },
//         buffer,
//     )
//     return decrypted.toString("utf8");
// };


// // // const { writeFileSync } = require('fs')

// // // const { generateKeyPairSync } =  require ('crypto');

// // // function generateKeys() {
// // //     console.log("hello")
// // //     const { publicKey, privateKey } = generateKeyPairSync('rsa', 
// // //     {
// // //             modulusLength: 4096,
// // //             namedCurve: 'secp256k1', 
// // //             publicKeyEncoding: {
// // //                 type: 'spki',
// // //                 format: 'pem'     
// // //             },     
// // //             privateKeyEncoding: {
// // //                 type: 'pkcs8',
// // //                 format: 'pem',
// // //                 cipher: 'aes-256-cbc',
// // //                 passphrase: passphrase
// // //             } 
// // //     });
    
// // //     writeFileSync('private.pem', privateKey)
// // //     writeFileSync('public.pem', publicKey)
// // // }
// var crypt = new Crypt();
// var rsa = new RSA();



// // rsa.generateKeyPair(function(keyPair) {
// //     // Callback function receives new key pair as a first argument
// //     var publicKey = keyPair.publicKey;
// //     var privateKey = keyPair.privateKey;
// //     console.log(publicKey)
// //     console.log(privateKey)
// //     });




// module.export = abc

// module.exports = {
//     abc:abc,
//     encrypt: encrypt,
//     decrypt: decrypt

// }

// var absolutePath = path.resolve("public.pem");
// var publicKey = fs.readFileSync(absolutePath, "utf8");
// // let a = encrypt("hello", "public.pem")
// // let b = decrypt(a, "private.pem");
// console.log(publicKey)

// // let a = encryptStringWithRsaPublicKey("hello", "public.pem")
// // let b = decryptStringWithRsaPrivateKey(a, "private.pem");
// // console.log(b)


import { Crypt, RSA } from 'hybrid-crypto-js';
var crypt = new Crypt();
var rsa = new RSA();

const encrypted = function(publicKey,message){
    return crypt.encrypt(publicKey,message);
}

const decrypted = function(privateKey,message){
    return crypt.decrypt(privateKey,message);
}

// module.exports = {
//     encrypted,
//     decrypted
// }
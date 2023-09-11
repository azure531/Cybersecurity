'use strict';

const crypto = require('crypto');

// Set your encryption key here (replace 'YourSecretKeyHere' with your actual key)
// Generate a random 256-bit (32-character) key as a hexadecimal string
const ENCRYPTION_KEY = '0123456789abcdef0123456789abcdef';
 // Must be 256 bits (32 characters)
console.log('Generated Encryption key : ',ENCRYPTION_KEY)
const IV_LENGTH = 16; // For AES, this is always 16

function encrypt(text) {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
  let textParts = text.split(':');
  let iv = Buffer.from(textParts.shift(), 'hex');
  let encryptedText = Buffer.from(textParts.join(':'), 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

// Use the encryption and decryption functions
const originalData = 'This is a secret message';

// Encrypt the data
const encryptedData = encrypt(originalData);
console.log('Encrypted:', encryptedData);

// Decrypt the data
const decryptedData = decrypt(encryptedData);
console.log('Decrypted:', decryptedData);

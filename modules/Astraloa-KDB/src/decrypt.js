/**
 * @author Hibot
 * @license GPL3.0
 */
function toByteArray(bytes) {
	let res = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, bytes.length);
	for (let i = 0; i < bytes.length; i++) {
		res[i] = new java.lang.Integer(bytes[i]).byteValue();
	}
	return res;
}
function toCharArray(chars) {
	return String.fromCharCode.apply(null, chars).split('');
}

/**
 * 
 * @param {string} userId - chat userId 
 * @param {number} enc - 31
 * @param {*} text - encrypted text
 * @returns {string} - decrypted text
 */

function decrypt(userId, enc, text) {
	if (text == null) return null;
	try {
		decrypt.cipher.init(2, new javax.crypto.spec.SecretKeySpec(javax.crypto.SecretKeyFactory.getInstance('PBEWITHSHAAND256BITAES-CBC-BC').generateSecret(new javax.crypto.spec.PBEKeySpec(decrypt.password, new java.lang.String((decrypt.prefixes[enc] + userId).slice(0, 16).padEnd(16, '\0')).getBytes('UTF-8'), 2, 256)).getEncoded(), 'AES'), new javax.crypto.spec.IvParameterSpec(decrypt.iv));
		return '' + new java.lang.String(decrypt.cipher.doFinal(java.util.Base64.getDecoder().decode(text)), 'UTF-8');
	} catch (e) {
		Log.error(e.lineNumber + ': ' + e);
		return null;
	}
}
decrypt.iv = toByteArray([15, 8, 1, 0, 25, 71, 37, -36, 21, -11, 23, -32, -31, 21, 12, 53]);
decrypt.password = toCharArray([22, 8, 9, 111, 2, 23, 43, 8, 33, 33, 10, 16, 3, 3, 7, 6]);
decrypt.prefixes = ['', '', '12', '24', '18', '30', '36', '12', '48', '7', '35', '40', '17', '23', '29', 'isabel', 'kale', 'sulli', 'van', 'merry', 'kyle', 'james', 'maddux', 'tony', 'hayden', 'paul', 'elijah', 'dorothy', 'sally', 'bran', 'extr.ursra', 'veil'];
decrypt.cipher = javax.crypto.Cipher.getInstance('AES/CBC/PKCS5Padding');

module.exports = decrypt;
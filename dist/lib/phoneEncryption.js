"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptPhone = encryptPhone;
exports.decryptPhone = decryptPhone;
exports.hashPhone = hashPhone;
exports.maskPhone = maskPhone;
const crypto_1 = __importDefault(require("crypto"));
const ALGORITHM = 'aes-256-cbc';
const KEY_HEX = process.env['PHONE_ENCRYPTION_KEY'] ?? '';
const HASH_SECRET = process.env['PHONE_HASH_SECRET'] ?? '';
function getKey() {
    if (KEY_HEX.length !== 64)
        throw new Error('PHONE_ENCRYPTION_KEY must be 64 hex characters (32 bytes)');
    return Buffer.from(KEY_HEX, 'hex');
}
function encryptPhone(phone) {
    const iv = crypto_1.default.randomBytes(16);
    const cipher = crypto_1.default.createCipheriv(ALGORITHM, getKey(), iv);
    const encrypted = Buffer.concat([cipher.update(phone, 'utf8'), cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}
function decryptPhone(encrypted) {
    const [ivHex, dataHex] = encrypted.split(':');
    if (!ivHex || !dataHex)
        throw new Error('Invalid encrypted phone format');
    const iv = Buffer.from(ivHex, 'hex');
    const data = Buffer.from(dataHex, 'hex');
    const decipher = crypto_1.default.createDecipheriv(ALGORITHM, getKey(), iv);
    return Buffer.concat([decipher.update(data), decipher.final()]).toString('utf8');
}
// 중복 조회용 결정론적 HMAC
function hashPhone(phone) {
    if (!HASH_SECRET)
        throw new Error('PHONE_HASH_SECRET is not set');
    return crypto_1.default.createHmac('sha256', HASH_SECRET).update(phone).digest('hex');
}
// 로그 출력용 마스킹: 01012345678 → 010-****-5678
function maskPhone(phone) {
    const match = phone.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (!match)
        return '***';
    return `${match[1]}-****-${match[3]}`;
}
//# sourceMappingURL=phoneEncryption.js.map
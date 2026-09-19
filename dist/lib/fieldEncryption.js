"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptField = encryptField;
exports.decryptField = decryptField;
exports.hashField = hashField;
exports.maskBankAccount = maskBankAccount;
exports.maskBusinessReg = maskBusinessReg;
const crypto_1 = __importDefault(require("crypto"));
const ALGORITHM = 'aes-256-cbc';
function getKey(envKey) {
    const hex = process.env[envKey] ?? '';
    if (hex.length !== 64)
        throw new Error(`${envKey} must be 64 hex chars (32 bytes)`);
    return Buffer.from(hex, 'hex');
}
function encryptField(plain, envKey) {
    const iv = crypto_1.default.randomBytes(16);
    const cipher = crypto_1.default.createCipheriv(ALGORITHM, getKey(envKey), iv);
    const encrypted = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}
function decryptField(encrypted, envKey) {
    const [ivHex, dataHex] = encrypted.split(':');
    if (!ivHex || !dataHex)
        throw new Error('Invalid encrypted field format');
    const iv = Buffer.from(ivHex, 'hex');
    const data = Buffer.from(dataHex, 'hex');
    const decipher = crypto_1.default.createDecipheriv(ALGORITHM, getKey(envKey), iv);
    return Buffer.concat([decipher.update(data), decipher.final()]).toString('utf8');
}
function hashField(value, secret) {
    return crypto_1.default.createHmac('sha256', secret).update(value).digest('hex');
}
// 계좌번호 마스킹: 1234567890123 → ****-*****-0123
function maskBankAccount(account) {
    const digits = account.replace(/\D/g, '');
    if (digits.length < 4)
        return '****';
    return '*'.repeat(digits.length - 4) + digits.slice(-4);
}
// 사업자등록번호 마스킹: 000-00-00000 → 000-**-*****
function maskBusinessReg(brn) {
    return brn.replace(/^(\d{3})-(\d{2})-(\d{5})$/, '$1-**-*****');
}
//# sourceMappingURL=fieldEncryption.js.map
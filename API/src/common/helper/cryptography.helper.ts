import crypto from 'node:crypto';

const ALGORITHM = 'aes-256-cbc';
const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error('SECRET_KEY is not defined in environment variables');
}

const KEY = crypto
  .createHash('sha256')
  .update(SECRET_KEY)
  .digest('hex')
  .substring(0, 32);

const IV_LENGTH = crypto.randomBytes(16);

export function encrypt(text: string) {
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(KEY), IV_LENGTH);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return IV_LENGTH.toString('hex') + ':' + encrypted;
}

export function decrypt(encryptedText: string) {
  const inputIv = encryptedText.slice(0, 32);
  const encrypted = encryptedText.slice(33);
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    Buffer.from(KEY),
    Buffer.from(inputIv, 'hex'),
  );
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

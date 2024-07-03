import { compare, genSalt, hash } from 'bcryptjs';

const SALT_RANDOMS = 8;

const hashPassword = async (password: string) => {
  const saltGenerated = await genSalt(SALT_RANDOMS);

  return await hash(password, saltGenerated);
};

// Aqui retorna o boolean
const verifyPassword = (password: string, hashedPassword: string) => {
  return compare(password, hashedPassword);
};

export const PassWordCrypto = {
  hashPassword,
  verifyPassword
};
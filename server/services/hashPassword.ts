import bcrypt from "bcrypt";

/**
 * Gera o hash de uma senha usando bcrypt.
 * @param password - A senha em texto puro.
 * @returns Uma Promise que resolve para o hash da senha.
 */
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10; // Número de rounds para gerar o salt
  return bcrypt.hash(password, saltRounds);
};

/**
 * Compara uma senha em texto puro com um hash.
 * @param password - A senha em texto puro.
 * @param hash - O hash da senha.
 * @returns Uma Promise que resolve para um booleano indicando se as senhas correspondem.
 */
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
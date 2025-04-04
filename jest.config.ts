import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest", // Usa o preset do ts-jest para transformar TypeScript
  testEnvironment: "node", // Define o ambiente de teste como Node.js
  transform: {
    "^.+\\.tsx?$": "ts-jest" // Transforma arquivos .ts e .tsx usando ts-jest
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"], // Extensões suportadas
  moduleNameMapper: {
    // Mapeia módulos, se necessário (ex.: arquivos estáticos ou aliases)
  },
  testMatch: ["**/__tests__/**/*.test.ts"], // Define o padrão para localizar arquivos de teste
  extensionsToTreatAsEsm: [".ts"], // Trata arquivos .ts como ES Modules
  globals: {
    "ts-jest": {
      useESM: true // Habilita suporte a ES Modules no ts-jest
    }
  }
};

export default config;
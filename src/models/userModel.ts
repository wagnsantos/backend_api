export interface User {
  id: number;                // Identificador único do usuário
  name: string;              // Nome do usuário
  email: string;             // Email do usuário
  passwordHash: string;      // Hash da senha do usuário (para segurança)
}

// Array para armazenar os usuários (pode ser substituído por um repositório em produção)
export const users: User[] = [];
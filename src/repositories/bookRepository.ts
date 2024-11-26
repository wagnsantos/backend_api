import { Pool } from 'pg';
import pool from '../config/database';
import { Book } from '../models/bookModel';

export class BookRepository {
  private pool: Pool = pool;

  /**
   * Obtém todos os livros do banco de dados.
   * @returns Uma promessa que resolve para um array de livros.
   */
  async getAllBooks(): Promise<Book[]> {
    try {
      const { rows } = await this.pool.query<Book>('SELECT * FROM books');
      return rows;
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
      throw new Error('Não foi possível buscar os livros.');
    }
  }

  /**
   * Adiciona um novo livro ao banco de dados.
   * @param name - Nome do livro.
   * @param subtitle - Subtítulo do livro.
   * @param image - URL da imagem do livro.
   * @param price - Preço do livro.
   * @returns Uma promessa que resolve para o livro adicionado.
   */
  async addBook(name: string, subtitle: string, image: string, price: number): Promise<Book> {
    const query = `
      INSERT INTO books (name, subtitle, image, price)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    try {
      const { rows } = await this.pool.query<Book>(query, [name, subtitle, image, price]);
      return rows[0];
    } catch (error) {
      console.error('Erro ao adicionar o livro:', error);
      throw new Error('Não foi possível adicionar o livro.');
    }
  }
}
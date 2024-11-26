import { Request, Response } from 'express';
import { BookRepository } from '../repositories/bookRepository';

const bookRepository = new BookRepository();

/**
 * Middleware para validação dos dados do livro.
 */
const validateBookData = (req: Request, res: Response, next: Function) => {
  const { name, subtitle, image, price } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'O campo "name" é obrigatório e deve ser uma string.' });
  }
  if (!subtitle || typeof subtitle !== 'string' || subtitle.trim() === '') {
    return res.status(400).json({ error: 'O campo "subtitle" é obrigatório e deve ser uma string.' });
  }
  if (!image || typeof image !== 'string' || !image.startsWith('http')) {
    return res.status(400).json({ error: 'O campo "image" é obrigatório e deve ser uma URL válida.' });
  }
  if (typeof price !== 'number' || price <= 0) {
    return res.status(400).json({ error: 'O campo "price" é obrigatório e deve ser um número maior que zero.' });
  }

  next(); // Se tudo estiver correto, prossegue para a próxima função
};

/**
 * Lista todos os livros.
 */
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await bookRepository.getAllBooks();
    res.status(200).json(books); // Sucesso: Retorna 200 com os livros
  } catch (error) {
    console.error(error); // Log do erro para depuração
    res.status(500).json({ error: 'Erro ao buscar livros.' }); // Erro interno do servidor
  }
};

/**
 * Adiciona um novo livro.
 */
export const addBook = async (req: Request, res: Response) => {
  const { name, subtitle, image, price } = req.body;

  try {
    // Adiciona o livro no banco de dados
    const book = await bookRepository.addBook(name, subtitle, image, price);
    res.status(201).json(book); // Sucesso: Retorna 201 com os dados do livro
  } catch (error) {
    console.error(error); // Log do erro para depuração
    res.status(500).json({ error: 'Erro ao adicionar o livro.' }); // Erro interno do servidor
  }
};

// Exportando o middleware de validação para uso em rotas
export { validateBookData };
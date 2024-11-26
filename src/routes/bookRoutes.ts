import express from 'express';
import { getAllBooks, addBook } from '../controllers/bookControllers';

const router = express.Router();

/**
 * Rota para listar todos os livros.
 * Método: GET
 * Endpoint: /books
 */
router.get('/', getAllBooks);

/**
 * Rota para adicionar um novo livro.
 * Método: POST
 * Endpoint: /books
 */
router.post('/', addBook);

export default router;  
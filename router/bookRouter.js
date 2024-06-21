import { Router } from 'express'
import { getAllBooks, addBook, editBook, deleteBook, getBookById } from '../controller/bookController.js'

const bookRouter = Router()

bookRouter.route('/')
    .get(getAllBooks)
    .post(addBook)



bookRouter.route('/:id')
    .get(getBookById)
    .put(editBook)
    .delete(deleteBook)

export default bookRouter
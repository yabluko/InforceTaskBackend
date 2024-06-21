import BookModel from "../models/bookModel.js";
import { validationResult } from "express-validator";

async function getAllBooks(req, res) {
    try {
        const books = await BookModel.find().lean()
        console.log(books)
        if (books.length <= 0) {
            return res.status(400).json({
                message: "No books"
            })
        }

        return res.status(200).json({ books })

    } catch (err) {
        res.status(500).json({ error: 'Failed to find books' });
    }

}

async function getBookById(req, res) {
    try {
        const bookId = req.params.id

        if (!bookId) {
            return res.status(400).json({ message: "Specify ID" })
        }

        const book = await BookModel.findOne({ _id: bookId }).lean()
        return res.status(200).json({ book })

    } catch (err) {
        res.status(500).json({ error: 'Failed to find book' });
    }

}

async function addBook(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const { title, pageCount, thumbnailUrl, shortDescription, longDescription, status, authors } = req.body;

        if (!title || !pageCount || !thumbnailUrl || !shortDescription || !longDescription || !status || authors.length <= 0) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const duplicateBook = await BookModel.findOne({ title }).lean()

        if (duplicateBook) {
            return res.status(409).json({ message: "Book already created" })
        }

        const newBook = new BookModel({
            title,
            pageCount,
            thumbnailUrl,
            shortDescription,
            longDescription,
            status,
            authors: [...authors]

        });


        const book = await newBook.save();
        return res.status(200).json({ book })

    } catch (err) {
        res.status(500).json({ error: 'Failed to create book' });

    }
}

async function editBook(req, res) {
    try {
        const { title, pageCount, thumbnailUrl, shortDescription, longDescription, status, authors } = req.body;

        if (!title || !pageCount || !thumbnailUrl || !shortDescription || !longDescription || !status || authors.length <= 0) {
            return res.status(400).json({ message: "All fields are required for updating book" })
        }

        const bookId = req.params.id

        if (!bookId) {
            return res.status(400).json({ message: "Specify ID of book" })
        }

        const book = await BookModel.findOne({ _id: bookId })

        if (!book) {
            return res.status(400).json({ message: "No such book" })
        }

        book.title = title
        book.pageCount = pageCount
        book.thumbnailUrl = thumbnailUrl
        book.shortDescription = shortDescription
        book.longDescription = longDescription
        book.status = status
        book.authors = authors

        const updatedBook = await book.save()

        return res.status(200).json({ book: updatedBook })


    } catch (err) {
        res.status(500).json({ error: 'Failed to edit book' });

    }
}


async function deleteBook(req, res) {
    try {
        const bookId = req.params.id
        if (!bookId) {
            return res.status(400).json({ message: "Specify ID of book" })
        }

        const book = await BookModel.findOne({ _id: bookId })

        if (!book) {
            return res.status(400).json({ message: "No such book" })
        }

        await book.deleteOne()
        return res.status(200).json({ message: `Book with title ${book.title} was succesfully deleted ` })



    } catch (err) {
        res.status(500).json({ error: 'Failed to delete book' });
    }
}


export {
    getAllBooks,
    addBook,
    editBook,
    deleteBook,
    getBookById
}
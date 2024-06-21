import mongoose, { Schema } from "mongoose"


const BookSchema = new Schema({
    title: String,

    pageCount: Number,

    publishedDate: {
        date: {
            type: Date,
            default: Date.now
        }
    },

    thumbnailUrl: String,

    shortDescription: String,

    longDescription: String,

    status: String,

    authors: [String]

})


const BookModel = mongoose.model('Books', BookSchema)
export default BookModel
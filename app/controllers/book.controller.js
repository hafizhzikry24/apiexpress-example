const { where } = require("sequelize");
const db = require("../models");
const Book = db.books

exports.create = async (req, res) => {
    if (!req.body.title) {
        return res.status(400).send({
            message: "Title can not be empty",
        });
    }

    const book = {
        title: req.body.title,
        description: req.body.description || null, 
        published: req.body.published ? req.body.published : null, 
    };

    try {
        const data = await Book.create(book);

        res.status(201).json({
            message: "Book created successfully.",
            data: data,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while creating the book.",
            data: null,
        });
    }
};

exports.findAll = (req, res) => {
    Book.findAll()
    .then((books) => {
        res.status(200).json({
            message: "Books retrieved successfully.",
            data:books,
        });
    })
    .catch((err) => {
        res.status(200).json({
            message: err.message || "Some error occurred while retrieving books.",
            data: null,
        });
    }); 
};

exports.update = async (req, res) => {
    const id = req.params.id;

    try {
        const [num] = await Book.update(req.body, {
            where: { id }
        });
        if (num === 1) {
            res.status(200).json({
                message: "Book updated successfully.",
                data: req.body,
            });
        } else {
            res.status(404).json({
                message: `Cannot update book with id=${id}. Maybe book was not found or req.body is empty!`,
                data: req.body,
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while updating the book.",
            data: null,
        });
    }
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Book.destroy({
        where: {id},
    })

    .then((num) => {
        if(num == 1){
            res.status(200).json({
                message: "Book deleted successfully.",
                data: req.body,
            });
        }else{
            res.status(404).json({
                message: `Cannot delete book with id=${id}. Maybe book was not found!`,
                data: req.body,
            });
        }
    })
    .catch((err) => {
        res.status(500).json({
            message: err.message || "Some error occurred while deleting the book.",
            data: null,
        });
    });
};
const { where } = require("sequelize");
const db = require("../models");
const Book = db.books

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

exports.create = (req, res) => {
    if(!req.body.title){
        return res.status(400).send({
            message: "Title can not be empty",
        })
    }

    const book = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false,
    }

    Book.create(book)
        .then((data) => {
            res.status(201).json({
                message: "Book created successfully.",
                data: data,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message || "Some error occurred while creating the Book.",
                data: null,
            });
        });

};

exports.findOne = (req, res) => {
    Book.findByPk(req.params.id)
    .then((book) => {
        res.status(200).json({
            message: "Book retrieved successfully.",
            data: book,
        });
    })
    .catch((book) => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving book.",
            data: null,
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Book.update(req.body, {
        where: {id},
    })

    .then((num) => {
        if(num == 1){
            res.status(200).json({
                message: "Book updated successfully.",
                data: req.body,
            });
        }else {
            res.status(404).json({
                message: `Cannot update book with id=${id}. Maybe book was not found or req.body is empty!`,
                data: req.body,
            });
        }
    })
    .catch((err) => {
        res.status(500).json({
            message: err.message || "Some error occurred while updating the book.",
            data: null,
        });
    });
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
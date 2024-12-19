const { DataTypes  } = require('sequelize');

module.exports = (sequelize) => {
    const Book = sequelize.define('book', {
        title: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
        },
        published: {
            type: DataTypes.DATEONLY                    ,
        },
    });
    return Book;
}
const mongoose = require("mongoose");
const ReviewSchema = require('./review'); 

const BurgerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Burger name is required"],
        minlength: [2, "Burger name must be 2 characters or longer"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be positive or zero"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [10, "Description must be 10 characters or longer"]
    },
    source: {
        type: String,
        required: [true, "Source is required"],
        minlength: [2, "Source must be 2 characters or longer"]
    },
    isHomemade: {
        type: Boolean
    },
    image: {
        type: String
    },
    reviews: [ ReviewSchema ]
}, {timestamps: true});

mongoose.model("Burger", BurgerSchema);
const mongoose = require("mongoose");
const Burger = mongoose.model("Burger");
const Review = mongoose.model("Review");

class Burgers {
    getAll(req, res){
        Burger.find({}, (err, burgers) => {
            if(err) { console.log(err); }
            res.json({status: 200, burgers: burgers});
        });
    }
    getOne(req, res){
        Burger.findOne({_id: req.params._id}, (err, burger) => {
            if(err) { console.log(err); }
            res.json({status: 200, burger: burger});
        });
    }
    create(req, res){
        let b = new Burger(req.body);
        b.save( err => {
            if(err) {
                res.json({status: 200, errors: err});
            } else {
                res.json({status: 200});
            }
        });
    }
    review(req, res){
        let r = new Review(req.body);
        r.save( err => {
            if(err) {
                res.json({status: 200, errors: err});
            } else {
                Burger.findOneAndUpdate({_id: req.params._id}, {$push: {reviews: r}}, err => {
                    if(err) {
                        res.json({status: 200, errors: err});
                    } else {
                        res.json({status: 200});
                    }
                });
            }
        });
    }
    update(req, res){
        Burger.findOneAndUpdate({_id: req.params._id}, req.body, {runValidators: true}, err => {
            if(err) {
                res.json({status: 200, errors: err});
            } else {
                res.json({status: 200});
            }
        });
    }
    delete(req, res){
        Burger.findOneAndDelete({_id: req.params._id}, err => {
            if(err) { console.log(err); }
            res.json({status: 200});
        });
    }
}

module.exports = new Burgers();
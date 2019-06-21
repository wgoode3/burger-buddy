const Burgers = require('../controllers/burgers');

module.exports = (app) => {
    app.get("/api/burgers", Burgers.getAll);
    app.post("/api/burgers", Burgers.create);
    app.get("/api/burgers/:_id", Burgers.getOne);
    app.post("/api/reviews/:_id", Burgers.review);
    app.put("/api/burgers/:_id", Burgers.update);
    app.delete("/api/burgers/:_id", Burgers.delete);
}
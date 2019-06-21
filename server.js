const express = require("express"),
         cors = require("cors"),
           bp = require("body-parser");
          app = express(),
      DB_NAME = "burgerdb",
         port = 8000,

app.use(bp.json({limit: '1mb'}));
app.use(cors());
// TODO: express static?

require("./server/utils/mongoose")(DB_NAME);
require("./server/utils/routes")(app);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


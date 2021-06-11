const express = require("express");
const cors = require("cors");
const app = express();
const pdfConvert = require("./pdfconvert");
const fs = require("fs");
const crypto = require("crypto");

app.use(express.json());
app.use(cors());

let url;

//GET request to download route with send pdf id
//to download user specific pdf
app.get("/download/:id", (req, res) => {
  console.log(req.params.id);
  let id = req.params.id;
  res.download(`./pdf/${id}.pdf`, "download.pdf", (err) => {
    //If download is done,delete the generated pdf
    if (!err) {
      try {
        fs.unlinkSync(`./pdf/${id}.pdf`);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log(err);
    }
  });
});

app.get("/q", (req, res) => {
  url = req.query.url;
  //Generates UUID
  let uniqueID = crypto.randomBytes(8).toString("hex");
  pdfConvert(url, uniqueID).then(() => {
    res.send({
      UUID: uniqueID,
    });
  });
});

//POST req with the URL
//Sends the uuid for pdf
// app.post("/", (req, res) => {
//   url = req.body.url;
//   //Generates uuid
//   let uniqueID = crypto.randomBytes(16).toString("hex");
//   console.log(uniqueID);
//   pdfConvert(url, uniqueID);
//   res.send(uniqueID);
// });

app.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}`)
);

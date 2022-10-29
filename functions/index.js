// eslint-disable-next-line
// const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// We will build an express app and host it on cloud functions
// it can scale, do whatever we need to do

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
/* const stripe = require("stripe")(
  "<secret_key>"
);
*/
// API setup
// express

// - APP config
const app = express();

// - middlewares
app.use(
    cors({
      origin: "true",
    })
);
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });
app.use(express.json()); // send and parse json data
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// - API routes
app.get("/", (request, response) => response.status(200).send("helo world"));
// async
app.post("/payments/create", (request, response) => {
  const total = request.query.total;
  console.log("Payment request received :.... >>>>>", total);
  /* const paymentIntent = await stripe.paymentIntents.create({
    amount: total, //sununits of the currency
    currency: "usd",
  });*/

  // OK - Created
  response.status(201).send({
    // clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command

exports.api = functions.https.onRequest(app);

// Example end point
// http://127.0.0.1:5001/challenge-a9cf5/us-central1/api

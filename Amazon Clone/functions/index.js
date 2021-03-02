const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51IQHEZIgvsyIQmisk5Q64Vg6zrPj3E9fJMMGkrpDz22iDTFiEaZZlzBzw56RbHjIfzmlsoJ6WdZk5eQoNrb46njR00MlQvc5jv");

const app = express();

app.use(cors({origin: true}));
app.use(express.json());

app.get("/", (req, res) => res.status(200).send("HELLO WORLD"));

app.get("/payments/create", async (req, res) => {    
    const total = req.query.total;
    console.log("Payment Request Recieved.", total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd"
    });

    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
    
})

exports.api = functions.https.onRequest(app);

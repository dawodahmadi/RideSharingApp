
const stripe = require('stripe')('sk_test_51O1k8NBPOluvQ8YGhYZjASjdHJe6SRy3xteAQxSUcdhMsrRfDffOsFsLB67z5rMwtLPYZHBC0n3nYPlkv2qDMWVL00t1MvfMBy');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json())

app.get('/',(req, res)=>{
    res.send("Hello Folks..!!! Please subscribe my channel")
})


app.post('/payment-sheet', async (req, res) => {
    // Use an existing Customer ID if this is a returning customer.

    const {amount, currency} = req.body

    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
        {customer: customer.id},
        {apiVersion: '2022-08-01'}
    );
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 500,
        currency: currency,
        customer: customer.id,
        payment_method_types: [ 'card'],
    });

    res.json({
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey,
        customer: customer.id,
    });
});

app.listen(4002, ()=> console.log("Running on http://localhost:4002"))


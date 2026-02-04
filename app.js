const express = require('express'); // acquire express
const app = express();                 // create express app
const mongoose = require('mongoose'); // acquire mongoose 
const ejs = require('ejs');         // acquire ejs
const Listing = require('./models/listing.js');   // acquire listing model

main()  // connect to database
   .then( ()=> {  // if connection is successful
    console.log('connected to DB');
   })
   .catch( (err) => {  // if connection fails
    console.log('error connecting to DB', err);
   });
   
async function main( ){  // async function to connect to database as mongoose connect takes time so we use async await
    await mongoose.connect('mongodb://127.0.0.1:27017/majorproject');   // connect to mongodb database named majorproject
};

 
app.get('/', (req,res)=>{  // route for home page 
    res.send('HelLo World');
});


// route to create a sample listing and save to database for testing 
app.get('/listings', async ( req, res)=> {  // async as saving to database takes time
    let sampleListing = new Listing({   // create new listing object
        title: "1st list",
        description: "This is the first listing",
        image: "",
        price: 100,     
        location: "New York",
        country: "USA",
    });
    await sampleListing.save();  // save listing to database using await as it takes time as it must wait for database response without fast forwarding the code 
    res.send('Listing saved');  // send response to client
    console.log('Listing saved to DB'); // log to console
    });

app.listen(8080, () => {
    console.log('Server is running on port 8080'); // log to console when server starts
} );
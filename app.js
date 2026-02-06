const express = require('express'); // acquire express
const app = express();                 // create express app
const mongoose = require('mongoose'); // acquire mongoose 
const ejs = require('ejs');          // acquire ejs
const Listing = require('./models/listing.js');   // acquire listing model
const path = require('path');  // acquire path module for handling file paths for ejs files in Views folder

app.set('view engine', 'ejs');  // set ejs as view engine
app.set('views', path.join(__dirname, 'Views')); // set views directory to Views folder in the current directory
app.use(express.urlencoded({ extended: true })); // middleware to parse urlencoded data from forms, extended true allows for rich objects and arrays to be encoded into the urlencoded format

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

 // index route
app.get("/listings", async ( req, res)=> {  // route to get all listings from database, async as fetching from database takes time
        const listings = await Listing.find({});  // fetch all listings from database using listing model, await as it takes time to fetch from database  
        res.render("listings/index.ejs", { listings });  // render listings.ejs view and pass listings data to it
});

// New Route
app.get("/listings/new", ( req, res) => {  // route to render form for creating new listing
    res.render("listings/new.ejs");  // render new.ejs view
});

// Create Route
app.post("/listings", async ( req, res) => {  // route to create new listing in database, async as saving to database takes time
    const newListing = new Listing(req.body);  // create new listing object from form data in request body
    await newListing.save();  // save new listing to database using listing model, await as it takes time to save to database
    res.redirect("/listings");  // redirect to listings index page after creating new listing
});


 // show route for individual listing
app.get("/listing/:id", async ( req, res) => {  // route to get individual listing by id from database, async as fetching from database takes time
    const { id } = req.params;  // get id from request parameters
    const listing = await Listing.findById(id);  // fetch listing by id from database using listing model, await as it takes time to fetch from database
    res.render("listings/show.ejs", { listing });  // render show.ejs view and pass listing data to it
});














// app.get('/', (req,res)=>{  // route for home page 
//     res.send('HelLo World');
// });


// // route to create a sample listing and save to database for testing 
// app.get('/listings', async ( req, res)=> {  // async as saving to database takes time
//     let sampleListing = new Listing({   // create new listing object
//         title: "1st list",
//         description: "This is the first listing", 
//         image: "",
//         price: 100,     
//         location: "New York",
//         country: "USA",
//     });
//     await sampleListing.save();  // save listing to database using await as it takes time as it must wait for database response without fast forwarding the code 
//     res.send('Listing saved');  // send response to client
//     console.log('Listing saved to DB'); // log to console
//     });





app.listen(8080, () => {
    console.log('Server is running on port 8080'); // log to console when server starts
} );
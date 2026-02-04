/* this file is for intializing and connecting the database for listings section. It connects to MongoDB using mongoose and defines the listing schema and model
*/
const mongoose = require('mongoose'); // acquire mongoose
const Listing = require('../models/listing.js');   // acquire listing model
const initdata = require('./data.js'); // acquire sample data for initializing the database

// set up mongoose connection to MongoDB database named majorproject because operations will be performed only when we make connection of this file to the database

// we use async await to handle the asynchronous nature of database connections as it takes time to connect to the database and we want to wait for the connection to be established before proceeding further

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

// now we will create async function to connect to database and add data to listings collection in the database

const initDB = async () => {
    try {
        // clear existing listings in the database to avoid duplicates
        await Listing.deleteMany({});
        console.log('Existing listings cleared'); 
        // insert sample listings into the database
        await Listing.insertMany(initdata.data); // here data is the key to object initdata which contains sample listings array from data.js file
        console.log('Sample listings added to DB');
    } catch (err) {
        console.log('Error initializing DB', err);
    }   }

// call the initDB function to initialize the database with sample data
initDB();

// now in terminal cd to init folder and run node index,js to initialize the database with sample listings data
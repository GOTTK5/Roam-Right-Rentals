// this file defines the structure of listing documents i.e. items that how each listing will look like in the database and creates a model to interact with listings collection in the database




const mongoose= require('mongoose'); // acquire mongoose

const Schema = mongoose.Schema; // store mongoose schema function in a variable

// create listing schema that defines structure of listing documents in the database, here listing is the structure of each item that will be stored in listings collection in the database
const listingSchema = new Schema({
    title: {  type:String, required:true},
    description: String,
    image: { 
        filename: String,
        url: String
    },
    price: Number,
    location: String,
    country: String,
});

// through this Listing variable we create Listing model that we can use to interact with listings collection in the database, this variable will be used to create, read, update, delete listings in the database. why we using it bcz it has structure that how each itme data will look like in the database
const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing; // export the listing model to be used in other files like app.js for performing crud operations on listings collection in the database 
// this file defines the structure of listing documents i.e. items that how each listing will look like in the database and creates a model to interact with listings collection in the database




const mongoose= require('mongoose'); // acquire mongoose

const Schema = mongoose.Schema; // store mongoose schema function in a variable

// create listing schema that defines structure of listing documents in the database, here listing is the structure of each item that will be stored in listings collection in the database
const listingSchema = new Schema({
    title: {  type:String, required:true},
    description: String,
    image: { type:String, set: v=> v===" " ? "https://plus.unsplash.com/premium_photo-1669058431851-aae101e63b61?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D": v},
    price: Number,
    location: String,
    country: String,
});

// through this Listing variable we create Listing model that we can use to interact with listings collection in the database, this variable will be used to create, read, update, delete listings in the database. why we using it bcz it has structure that how each itme data will look like in the database
const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing; // export the listing model to be used in other files like app.js for performing crud operations on listings collection in the database 
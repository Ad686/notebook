// const mongoose = require('mongoose');
// const mongoURI="mongodb+srv://singhdevgan2022:<79NcxhvSsvMiGFgU>@cluster0.3nnqs4e.mongodb.net/"


// const mongoose = require('mongoose');
// const mongoURI= "mongodb+srv://singhdevgan2022:YNyr0HGKh4cgZlm6@cluster0.3nnqs4e.mongodb.net/?retryWrites=true&w=majority"


// const connectToMongo = ()=>{
//     mongoose.connect(mongoURI, ()=>{
//         console.log("Connected to Mongo Successfully");
//     });
// }

// module.exports = connectToMongo;
const mongoose = require('mongoose');

async function connectToMongo() {
  try {
    await mongoose.connect("mongodb+srv://singhdevgan2022:YNyr0HGKh4cgZlm6@cluster0.3nnqs4e.mongodb.net/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
module.exports = connectToMongo;


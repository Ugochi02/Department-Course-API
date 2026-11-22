const mongoose = require('mongoose');
const URI = process.env.MONGODB_URI
mongoose.connect(URI)
.then(()=> {
    console.log('Connection to database successful')
})
.catch((error)=> {
    console.log('Connection to Database Failed: ',error.message)
})
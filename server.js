const express = require('express');
require('dotenv').config();
require('./database/database')
const PORT = process.env.PORT || 2026;
const departmentRoutes = require('./routes/departmentRouter.js')
const courseRoutes = require('./routes/courseRouter.js')

const app = express();
app.use(express.json());
app.use(departmentRoutes);
app.use(courseRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})
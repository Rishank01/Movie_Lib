const express = require('express');
const cors = require('cors');
const ConnectDB = require('./config/database');
const AuthRoutes = require('./routes/AuthRoutes');
const PlaylistRoutes = require('./routes/PlaylistRoutes');

const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

ConnectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/user', AuthRoutes);
app.use('/playlist', PlaylistRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

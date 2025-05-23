const mongoose = require("mongoose");
const Campground = require("../models/campgrounds");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

//const dbUrl = process.env.DB_URL;
//"mongodb://localhost:27017/yelp-camp"
mongoose.connect("mongodb://localhost:27017/yelp-camp");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "678fd5c23f3f0e8c7c76da91",
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea repellendus minima dignissimos esse cupiditate iure adipisci repellat? Adipisci expedita autem est iusto. Deleniti voluptates quasi explicabo tenetur consequuntur, a laborum!",
      price,
      images: [
        {
          url: "https://res.cloudinary.com/dixwq7csf/image/upload/v1737900610/YelpCamp/hxtk1nqlselmymu8kqpr.jpg",
          filename: "YelpCamp/hxtk1nqlselmymu8kqpr",
        },
        {
          url: "https://res.cloudinary.com/dixwq7csf/image/upload/v1737900611/YelpCamp/jlop5icbnvtxjulykvur.jpg",
          filename: "YelpCamp/jlop5icbnvtxjulykvur",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});

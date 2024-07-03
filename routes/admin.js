const { Router } = require("express");
const z = require("zod");
const adminMiddleware = require("../midleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

let _id;

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  await Admin.create({ username: username, password: password });
  res.send({
    msg: "Admin created Successfully",
  });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  const user = await Admin.find({
    username,
    password,
  });
  if (user) {
    const token = jwt.sign(
      {
        username,
      },
      JWT_SECRET
    );

    res.json({
      token,
    });
  } else {
    res.status(411).json({
      message: "Incorrect email and pass",
    });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageLink = req.body.imageLink;

  await Course.create({
    title: title,
    description: description,
    price: price,
    imageLink: imageLink,
  });

  const result = await Course.findOne({ title: title });

  res.send({
    msg: "course added successfully",
    _id: result._id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const data = await Course.find();
  res.json({
    data,
  });
});

module.exports = router;

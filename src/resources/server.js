const express = require("express");
const expressHbs = require("express-handlebars");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine(
  "hbs",
  expressHbs.engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");

app.get("/user", (req, res) => {
  res.render("index",{list:list});
});

app.get("/product", (req, res) => {
  res.render("product");
});

app.get("/productType", (req, res) => {
  res.render("productType");
});

app.get("/", (req, res) => {
  res.render("login", { layout: "welcome" });
});

app.get("/register", (req, res) => {
  res.render("register", { layout: "welcome" });
});

const list = [
  {
    id: 1,
    fullname: "Phạm Trường Giang",
    email: "ptg3012@gmail.com",
    password: "123",
  },{
    id: 2,
    fullname: "Phạm Trường Giang",
    email: "giang@gmail.com",
    password: "123",
  },
];

function checkAccount(array, email) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].email == email) {
      return i;
    }
  }
}

app.post("/user", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  var error;
  var i = checkAccount(list, email);

  if (email == "") {
    error = "Please enter a email";
    return res.render("login", { layout: "welcome", error });
  }
  if (password == "") {
    error = "Please enter a password";
    return res.render("login", { layout: "welcome", error });
  }
  if (i == null) {
    error = "Account not found";
    return res.render("login", { layout: "welcome", error });
  }

  if (email != list[i].email || password != list[i].password) {
    error = "Email or password incorrect";
    return res.render("login", { layout: "welcome", error });
  }

  return res.render("index", {list:list});
});

app.post("/register", (req, res) => {
  var fullname = req.body.fullname;
  var email = req.body.email;
  var password = req.body.password;
  var error;
  var i = checkAccount(list, email);

  if (fullname == "") {
    error = "Please enter a full name";
    return res.render("login", { layout: "welcome", error });
  }
  if (email == "") {
    error = "Please enter a email";
    return res.render("login", { layout: "welcome", error });
  }
  if (password == "") {
    error = "Please enter a password";
    return res.render("login", { layout: "welcome", error });
  }
  if (i != null) {
    error = "Account already exists";
    return res.render("register", { layout: "welcome", error });
  }
  const newItem = [
    {
      id: list[list.length - 1].id + 1,
      fullname: fullname,
      email: email,
      password: password,
    },
  ];
  list.push(newItem);
  return res.render("index", {list:list});
});


app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join("node_modules", "bootstrap", "dist")));
app.listen(3000);

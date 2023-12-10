const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { loadContact, findContact } = require("./utils/contacts.js");

const app = express();
const port = 3000;

app.set("view engine", "ejs");

// Third-party middleware
app.use(expressLayouts);

// Built-in middleware
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.status(200);
  const mahasiswa = [
    {
      nama: "Asep",
      email: "asep@gmail.com",
    },

    {
      nama: "Usro",
      email: "usro@gmail.com",
    },
  ];

  res.render("index", {
    nama: "Rihap Firdaus",
    title: "Halaman Home",
    mahasiswa: mahasiswa,
    layout: "layouts/main-layout",
  });

  // res.sendFile('./index.html',{root: __dirname})
});

app.get("/about", (req, res) => {
  res.status(200);
  res.render("about", {
    layout: "layouts/main-layout",
    title: "Halaman About",
  });
  // res.sendFile('./about.html',{root: __dirname})
});

app.get("/contact", (req, res) => {
  const contacts = loadContact();
  res.status(200);
  res.render("contact", {
    layout: "layouts/main-layout",
    title: "Halaman Contact",
    contacts,
  });
});

app.get("/contact/:nama", (req, res) => {
  const contact = findContact(req.params.nama);
  res.status(200);
  res.render("details", {
    title: "Halaman Detail COntact",
    layout: "layouts/main-layout",
    contact,
  });
});

app.get("/product/:id", (req, res) => {
  res.send(
    `Product ID: ${req.params.id} and Label Product: ${req.query.label}`
  );
});

app.get("/product/:id/category/:idCat", (req, res) => {
  res.send(`Product ID: ${req.params.id} and Category ID: ${req.params.idCat}`);
});

app.use((req, res) => {
  res.status(404);
  res.send("<h1>Halaman tidak ditemukan!</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const express = require("express");
const cors = require("cors");
const sha1 = require("js-sha1");
const app = express();
const path = require("path");
const {
  login,
  signup,
  addevent,
  getEventlist,
  regevent,
  tranh,
} = require("./database");
app.listen(80);
app.use(express.urlencoded({ extends: true }));
app.use(express.static("./build"));
app.use(cors());

app.get("/", (req, res) => {
  res.send(path.resolve("/index.html"));
});

app.post("/submitsignup", (req, res) => {
  let { name, email, pass, username } = req.body;
  signup(name, username, email, sha1(pass))
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => {
      res.sendStatus(301);
    });
});
app.post("/login", async (req, res) => {
  let { email, pass } = req.body;
  login(email, sha1(pass), (out) => {
    if (out == undefined) {
      res.sendStatus(301);
    } else {
      res.sendStatus(200);
    }
  });
});

app.post("/addevent", (req, res) => {
  let {
    eventno,
    eventname,
    coordinatorname,
    coordinatorno,
    fee,
    venue,
    date,
    type,
  } = req.body;
  addevent(
    eventno,
    eventname,
    coordinatorname,
    coordinatorno,
    fee,
    venue,
    date,
    type
  );
  if (
    eventname === "" ||
    eventno === "" ||
    coordinatorname === "" ||
    coordinatorno === "" ||
    fee === "" ||
    venue === "" ||
    date === ""
  ) {
    res.sendStatus(301);
  } else res.sendStatus(200);
});

app.post("/eventregistration", (req, res) => {
  let { ename, evnum, cardno, edate, cname, mnum } = req.body;
  regevent(evnum, ename, cardno, cname, mnum, edate);
  if (
    evnum === "" ||
    ename === "" ||
    cardno === "" ||
    cname === "" ||
    mnum === "" ||
    edate === ""
  )
    res.sendStatus(301);
  else res.sendStatus(200);
});

app.get("/loadeventlist", async (req, res) => {
  const x = function e(c) {
    res.json(c);
  };
  let da = await getEventlist(x);
});

app.get("/tranl", async (req, res) => {
  const x = function e(c) {
    res.json(c);
  };
  let da = await tranh(x);
});

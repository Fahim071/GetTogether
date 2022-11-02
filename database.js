const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("alldata.db");

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS user(uid int AUTO_INCREMENT PRIMARY KEY,name TEXT, username TEXT, pass TEXT, email TEXT);"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS event(uid int AUTO_INCREMENT PRIMARY KEY,eventno TEXT,eventname TEXT ,coordinatorname TEXT ,coordinatorno TEXT ,fee TEXT,venue TEXT ,date TEXT, type TEXT);"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS registered(uid int AUTO_INCREMENT PRIMARY KEY,eventno TEXT,eventname TEXT ,transactionid TEXT ,membername TEXT, mobilenum TEXT ,date TEXT);"
  );
});

exports.login = async (email, pass, call) => {
  await db.all(
    "SELECT * FROM user WHERE email='" + email + "' and pass='" + pass + "';",
    (err, d) => {
      if (d[0]) {
        call("something");
      } else {
        call(undefined);
      }
    }
  );
};

exports.signup = async (name, username, email, pass) => {
  db.run("INSERT INTO user(name,username,email,pass) VALUES(?,?,?,?);", [
    name,
    username,
    email,
    pass,
  ]);
};
exports.addevent = (
  eventno,
  eventname,
  coordinatorname,
  coordinatorno,
  fee,
  venue,
  date,
  type
) => {
  db.run(
    "INSERT INTO event(eventno,eventname,coordinatorname," +
      "coordinatorno,fee,venue,date,type) VALUES(?,?,?,?,?,?,?,?);",
    [eventno, eventname, coordinatorname, coordinatorno, fee, venue, date, type]
  );
};

exports.regevent = (
  eventno,
  eventname,
  cardnum,
  membername,
  mobilenum,
  date
) => {
  db.run(
    "INSERT INTO registered(eventno,eventname,transactionid," +
      "membername,mobilenum,date) VALUES(?,?,?,?,?,?);",
    [eventno, eventname, cardnum, membername, mobilenum, date]
  );
};
exports.getEventlist = async (re) => {
  db.all("SELECT * FROM event;", (err, d) => {
    re(d);
  });
};

exports.tranh = async (re) => {
  db.all(
    "select * from registered inner join event where registered.eventno=event.eventno;",
    (err, d) => {
      let abc = [];
      for (let bc of d) {
        abc.push(bc);
      }
      re(d);
    }
  );
};

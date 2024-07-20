const express = require("express");
const connection = require("./config.js");

const app = express();

app.use(express.json())

app.get("/", (req, resp) => {
  connection.query("SELECT * FROM USERS", (err, res) => {
    if (err) {
      resp.send("unable to fetch users");
    } else {
      resp.send(res);
    }
  });
});

app.post("/", (req, resp) => {
  data = {id:2, name: "babar", age: 23 };
  connection.query("INSERT INTO USERS SET ?", data, (err, res) => {
    if (err) {
      resp.send("unable to add user");
    } else {
      resp.send(res);
    }
  });
});


app.put("/:id", (req, resp) => {
    data = [req.body.name, req.body.age, req.params.id ];
    connection.query("UPDATE USERS SET name = ?, age = ? where id = ?", data, (err, res) => {
      if (err) {
        resp.send("unable to add user");
      } else {
        resp.send(res);
      }
    });
  });
  

app.delete("/:id", (req, resp) => {
    connection.query("DELETE FROM USERS WHERE id = " + req.params.id, (err, res) => {
      if (err) {
        resp.send("unable to delete user");
      } else {
        resp.send(res);
      }
    });
  });

app.listen(5000);

import express from "express";
import mysql from "mysql";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());

//------mysql database connection-----------
 const db = mysql.createConnection({
  host: 'localhost',
  user:'root',
  password: "sushma@123",
  database: 'blog',
});



  //=================================<get all user>=======================
   app.get("/", (req,res)=>{
    const q = "SELECT * FROM blog.blogs";
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)

    })
   })

   //==========================<add new user>======================================
   app.post("/add-blog", (req, res) => {
    const q = "SELECT * FROM blogs WHERE id = ?"

    db.query(q, [req.body.id], (err, data) => {
        if (err) return res.json(err);
        if (data.length) {
            return res.status(409).json("id already exist")
        }

    const q = "INSERT INTO blogs(`title` ,`body` ,`tags` ,`category` ) VALUES (?)";
    const values = [
      req.body.title,
      req.body.body,
      req.body.tags,
      req.body.category,
    ];
   
    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.json("blog created succesfully");
    });
  });
})

//=============================<get user details by id>==================================
   app.get("/read-blog/:id", (req,res)=>{
   const {id} = req.params  
    const q = "SELECT * FROM blogs WHERE id = ? ";
    db.query(q, [ id ],(err, data)=>{
        if(err) return res.send(err)
        return res.json(data)

    })
   })
//=====================<update student api>==================================
app.put("/update-blog/:id", (req, res) => {
  const Id = req.params.id;
  const q = "UPDATE blogs SET `title`= ? ,`body`= ?,`tags`= ?  ,`category`= ?    WHERE id = ?";

  const values = [
    req.body.title,
    req.body.body,
    req.body.tags,
    req.body.category,
   ];

  db.query(q, [...values,Id], (err, data) => {
    if (err) return res.send(err);
    return res.json("blog has been updated succesfully");
  });
});

//=====================<delete student api>==================================
app.delete("/delete-blog/:id", (req, res) => {
  const Id = req.params.id;
  const q = " DELETE FROM blogs WHERE id = ? ";

  db.query(q, [Id], (err, data) => {
    if (err) return res.send(err);
    return res.json("blog has been deleted succesfully");
  });
});

//=====================================================================================

app.listen(8800, () => {
  console.log("Connected to backend on port 8800");
});
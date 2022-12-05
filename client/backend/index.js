import express from "express";
import mysql from "mysql";
import cors from "cors";
// import  bcrypt from 'bcryptjs';
// import  jwt from 'jsonwebtoken';
//import  cookieParser from 'cookie-parser';

const app = express();
app.use(cors());
app.use(express.json());
// app.use(cookieParser());
//------mysql database connection-----------
 const db = mysql.createConnection({
  host: 'localhost',
  user:'root',
  password: "sushma@123",
  database: 'blog',
});

//====================crud operation==================================
// app.post("/register", (req,res)=>{
//   //check email exist
//     const q = "SELECT * FROM users WHERE Emailid = ?"

    
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(req.body.Password, salt);

//     db.query(q, [req.body.Emailid], (err, data) => {
//         if (err) return res.json(err);
//         if (data.length) {
//             return res.status(409).json("Email already exist")
//         }

//  const q =  "INSERT INTO users(`Username` ,`Emailid` ,`Password`) VALUES (?)";
//         const values = [
//             req.body.Username,
//             req.body.Emailid,
//             hash,
//         ];

//         db.query(q, [values], (err, data) => {
//             if (err) return res.json(err);
//             return res.status(200).json("User created succesfully");

//         });
//     });
// });


//=====================<create student api>==================================

//================================
// app.post("/login", (req, res) => {
//   //check email id
//   const q = "SELECT * FROM users WHERE Emailid = ?";

//   db.query(q, [req.body.Emailid], (err, data) => {
//     if (err) return res.json(err);
//     if  (data.length === 0) return res.status(404).json("User not found");

//     let count =0
//     const q = "SELECT * FROM users WHERE Password = ?";
//      db.query(q, [req.body.Password], (err, data) => {
//       if (err) return res.json(err);
//       if  (data.length === 0) return res.status(404).json("User not found");
  
  
//     //check password
//     const isPasswordCorrect = bcrypt.compareSync(req.body.Password , data[0].Password); // true
//     if(!isPasswordCorrect) return res.status(400).json("Wrong username or password");
    
    
//     //generate tokan
//     const tokan = jwt.sign({  id: data[0].id } , "jwtkey");
//     const {Password , ...other} = data[0];
//     res.cookie("access_tokan" , tokan , {
//       httpOnly : true
//     }).status(200).json(data[0])
//   })

//     });
//    });

//    //======================<logout user>=========================
// app.post('/logout' , (req, res) =>{
// res.clearCookie("access_tokan",{
//   sameSite:"none",
//   secure:true
// }).status(200).json("User has been logout")
// })

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
// import { connectDB } from "../lib/db";

// export const signup = async (req,res)=>{
//     const {User_Name,User_Mobile,User_Password,User_Email} = req.body;

//     if(!User_Name || !User_Mobile || !User_Password ){
//         return res.status(400).json({ message: "All fields required" });
//     }

//     if(User_Password.length < 8){
//         return res.status(400).json({ message: "Password must be at least 6 characters" });
//     }

    

//     try {
//         const connection = await connectDB();

//         const checkemailsql = `SELECT * from users WHERE User_Email = ?`;
//         const useremail = req.body.User_Email;
    
    
//         connection.query(checkemailsql,[useremail],(err, results)=>{
//             if(err){
//                 console.error('Error executing query:', err);
//                 return res.status(500).json({ message: "Database query error" });
//             }
    
//             if(results.length > 0){
//                 return res.status(400).json({ message: "Email already exists" });
//             }
//             else{
//                 const salt = await bcrypt.genSalt(10);
//                 const hashedPassword = await bcrypt.hash(password, salt);
//             }
//         }) 
//     } catch (error) {
        
//     }

//     // const bcrypt = require('bcryptjs');
//     // const saltRounds = 10;
//     // bcrypt.hash(User_Password,saltRounds,())

// }


import bcrypt from 'bcryptjs'; // You need to install bcryptjs: npm install bcryptjs
import { connectDB } from '../lib/db.js';

export const signup = async (req, res) => {
    const { User_Name, User_Email, User_Password, User_Mobile } = req.body;

    // Check if all required fields are provided
    if (!User_Name || !User_Email || !User_Password || !User_Mobile) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if password length is at least 6 characters
    if (User_Password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    try {
        // Connect to the database
        const connection = await connectDB();

        // Check if email already exists in the database
        const sql = `SELECT * FROM users WHERE User_Email = ?`;
        const [rows] = await connection.promise().query(sql, [User_Email]);

        if (rows.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(User_Password, salt);

        // Insert the new user into the database
        const insertSql = `INSERT INTO users (User_Name, User_Email, User_Password, User_Mobile) VALUES (?, ?, ?, ?)`;
        const [result] = await connection.promise().query(insertSql, [User_Name, User_Email, hashedPassword, User_Mobile]);

        // Successfully inserted user, send response
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: result.insertId,
                User_Name: User_Name,
                email: User_Email,
                mobile: User_Mobile
            },
        });

    } catch (error) {
        console.error('Error in signup controller:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

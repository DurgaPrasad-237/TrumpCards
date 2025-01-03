import mysql from "mysql2"
export const connectDB = async () =>{
    try{
        const connection = mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'',
            database:'trumpcards',
            port:'3307',
        })
        connection.connect(err=>{
            if(err){
                console.error("Error connection to the database:",err);
                throw err;
            }
            console.log('connected to the database')
        });
        return connection;
    }catch(err){
        console.log('Error in database connection:',err);
        throw err;
    }
}
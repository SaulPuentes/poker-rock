//Team 2 - Enroute Systems
//Poker Rock

import { MongoClient } from 'mongodb'
//import { mongoose } from 'mongoose'
//import io from 'socket.io-client'
//import fetch from 'isomorphic-fetch'

//connection with MongoDB
//General URL for the mongoDB Connection
//User: poker-rock-master
//Password: j3T1bIQ2T6oWiOh5
//Cluster: Poker-Rock
//DataBase: Poker-Rock
//Collections: Users, History
const url = "mongodb+srv://poker-rock-master:j3T1bIQ2T6oWiOh5@poker-rock.scwog.mongodb.net/poker-rock"

//Register new user, just be giving the name and password
//the default score is set to 5000
export async function createUser(name, password, score = 5000){
    
    //Connect with the database, using the selected Client and Collection
    const client = await MongoClient.connect(url, {})
    const db = client.db('Poker-Rock')
    const users = db.collection('Users')
    
    //If the user does not already exists, then create a new one, otherwise
    //deploys an error message
    const findUser = await users.findOne({name})
    if(!findUser)
    { 
        const insertResult = await users.insertOne({name, password, score})
        return insertResult
    }
    else{
        //console.log("user already exists")
        return false
        
    }

    
}//End of createUSer

//Get data from a user
export async function LogInUser(name, password){
    const client = await MongoClient.connect(url, {})
    const db = client.db('Poker-Rock')
    const users = db.collection('Users')
    const findResult = await users.findOne({ name, password})

    //If the user does not exists, then an error message is shown
    //otherwise, the user can access to the main page.
    if (!findResult) {
        console.log("User does not exist")
        return false
        
    }
    else {
        //console.log("Welcome")
        return findResult
    }
    

}//End of LogInUser


export default async(req, res)=>{
    if(req.body.isNew){
        const result = await createUser(req.body.name, req.body.password)
        createUser(req.body.name, req.body.password)
        res.statusCode = 200
        console.log("New user registered")
    }
    else{
        const result = await LogInUser(req.body.name, req.body.password)
        res.statusCode = 200
        console.log("Welcome")
    }

}//End of default
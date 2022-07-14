var express = require('express');
var mysql = require('mysql2');
var cors = require('cors');
const nodemailer = require("../sendmailer");
var bodyparser = require('body-parser');
const jwt =require('jsonwebtoken')
const UserModal = require("../model/userModel");



const userController={

async createUser(req,res){

  let userData = req.body;

  // console.log(req.body);
  let password = userData.password;
  console.log(password);
  let confirm_password=userData.confirm_password;
     console.log(confirm_password);

     if(password==confirm_password)
     {
      let[User]=await UserModal.CreateUser(userData)
      if(User.affectedRows>0){
        console.log(User);
        res.send({
          message: "Register is created successfully."
        });
        console.log(userData);
        nodemailer.sendConfirmationEmail(
          userData.username,
          userData.email
   );
      }
      else{
        console.log("Error");
      }
    }else{
      res.send({
        message:"password is incorrect"
      })
    }
     },


//loginuser
    async loginUser(req,res){

      let userData = req.body;
    
      let email = req.body.email;
      let password = req.body.password;
      console.log(userData);
      if((userData.email!="") && (userData.password!="")){
      
        //console.log(email, password);
           let [User]=await UserModal.loginUser(userData);
           console.log(User[0]);
           let key ={
            "signup_id":User[0].signup_id,
            "username":User[0].username,
            "phonenumber":User[0].phonenumber,
            "email":User[0].email,
            "address":User[0].address,
            "gender":User[0].gender,
            "bloodgroup":User[0].bloodgroup,
            "alternative_phone_no":User[0].alternative_phone_no,
            "qualification":User[0].qualification,
            "dob":User[0].dob,
            "password":User[0].password,
            "confirmpassword":User[0].confirmpassword,
           }
           if(User[0]){
           // console.log("payload")
            let payload ={
              "signup_id":User[0].signup_id,
              "username":User[0].username,
              "phonenumber":User[0].phonenumber,
              "email":User[0].email,
              "address":User[0].address,
              "gender":User[0].gender,
              "bloodgroup":User[0].bloodgroup,
              "alternative_phone_no":User[0].alternative_phone_no,
              "qualification":User[0].qualification,
              "dob":User[0].DOB,
              "password":User[0].passsword,
              "confirmpassword":User[0].confirmpassword
            }
            let options= {expiresIn:1, issuer: "userData"};
            let secret = "asdfghjkkkkkkkkoi765resazxcvbn";
            let token = jwt.sign(payload, secret, options)
            res.send({
              message:"Log in succesfully",
              status:"True",
              data :key,
              token:token
             })
            
            }else{
              res.send({
                message:"Data is incorrect"

              })
            } 

          }else{
            res.send({
              message:"please fill all the fields"
            })
          }        
            },
   async getAllUser(req,res){

  console.log("Hello");

  let getAllUser = await UserModal.GetAllUser();
  if(getAllUser[0]){
    console.log("Done");
    res.send(getAllUser);
  }
  else{
    console.log("Error");
  }
},
async getUser(req,res){

  let data ={"signup" :req.params.id}
  let getinUser = await UserModal.getUser(data);

  if(getinUser[0]){
    res.send(getinUser[0]);
  }else{
    res.send(error);
  }

},
async updateUser(req,res){ 
  
  console.log(req.params.id)
  
 let data ={
  "signup_id":req.params.id,
  "username":req.body.username,
  "phonenumber":req.body.phonenumber,
  "email":req.body.email,
  "address":req.body.address,
  "gender":req.body.gender,
  "bloodgroup":req.body.bloodgroup,
  "alternative_phone_no":req.body.alternative_phone_no,
  "dob":req.body.dob,
  "qualification":req.body.qualification
 }
 console.log(data);
  let getinUser = await UserModal.updateUser(data);

  if(getinUser){
    res.send({
      message:"Updated successfully"
    })
  }
  else{
    res.send({
      message:"Not updated"
    })
  }

},

 
}


module.exports=userController;


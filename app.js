const express = require("express")
const bodyParser=require("body-parser")
const request=require("request")
const https = require("https")
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app=express()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname +"/signup.html")
})

//setting up mailchimp
mailchimp.setConfig({
    apiKey:"eccddfa82fa0c37231d91817381f77ee-us13",
    server:"us13"
});

//what happens after sign in button is coded here
app.post("/",function(req,res){

    const  firstName = req.body.fname
    const  lastName = req.body.lname
    const  email = req.body.email

    const listId= "5f59cbaea5";

    //create an object with users data
    const subscribingUser={
        firstName:firstName,
        lastName:lastName,
        email:email
    };
    
    //Uploading the data to the server
 async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
     email_address: subscribingUser.email,
     status: "subscribed",
     merge_fields: {
     FNAME: subscribingUser.firstName,
     LNAME: subscribingUser.lastName
    }
    });
    //If all goes well logging the contact's id
     res.sendFile(__dirname + "/success.html")
     console.log(
    `Successfully added contact as an audience member. The contact's id is ${
     response.id
     }.`
    );
    }
    run().catch(e => res.sendFile(__dirname + "/failure.html"));
});
    // const data={
    //     members:[
    //         {
    //             email_address:email,
    //             status:"subscribed",
    //             merge_fields: {
    //                 FNAME:firstName,
    //                 LNAME:lastName
    //             }
    //         }
    //     ]
    // };
    // const jsonData = JSON.stringify(data);

    // const url = "https://us13.api.mailchimp.com/3.0/lists/5f59cbaea5";
    // const options={
    //     method:"POST",
    //     auth:"utkarsh:eccddfa82fa0c37231d91817381f77ee-us13"
    // }
    // const request = https.request(url,options,function(response){
    //     response.on("data",function(data){
    //         console.log(JSON.parse(data));
    //     })
    // })

    // request.write(jsonData);
    // request.end;
//});

//for redirecting failure requests
app.post("/failure",function(req,res){
    res.redirect("/")
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Server started at port-3000");
})

// Api key
// eccddfa82fa0c37231d91817381f77ee-us13

//audience Id
//5f59cbaea5

//website link 
// https://morning-wave-14463.herokuapp.com/
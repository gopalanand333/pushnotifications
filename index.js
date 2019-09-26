const express = require("express");
const FCM = require("fcm-node");
const fcm = new FCM("server key");
const port = process.env.port || 3000;
const app = express();
app.listen(port,()=>{console.log(`App is running at port ${port}`)});
const to = "key for user 1";
const toTwo = "key for user 2";
const tokens = [to, toTwo]; // array of users
const promises = [];
const browser = ["firefox","chrome"];
var count = tokens.length;
tokens.forEach(token=>{
    var promise = sendNotification(token,browser[count-1]);
    promises.push(promise);
    count--;
});
/**
 * checking if all the messages are delivered
 */
Promise.all(promises).then(results=>{
    console.log(results);
}).catch(err=>console.error(err));

/**
 * 
 * @param {*} user the token for users
 * @param {*} browser any exta messase
 */
function sendNotification(user, browser){
    const message = {
        to : user,
        notification : {
            title: "This is Gopal's Notification- " + browser,
            body: "The message is that i can send a message"
        },
        data: {
            payload1 : "firstPayload",
            payload2: "payload two"
        }
    };
    fcm.send(message, (err, res)=>{
        if(err){
            console.log(err);
            return err;
        }else{
            return res;
        }
    });
}
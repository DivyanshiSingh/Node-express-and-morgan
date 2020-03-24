const express=require('express');
// const http=require('http'); --------------> for using http module
const morgan=require('morgan');

const hostname='localhost';
const port='3000';

const app=express();

const loggerFormat = ':method :url :status - :response-time ms';
// app.use(morgan(loggerFormat, {
//     skip: function(req,res){
//         return res.statusCode < 400
//     },
//     stream: process.stderr
// }));
// app.use(morgan(loggerFormat, {
//     skip: function (req, res) {
//         return res.statusCode >= 400
//     },
//     stream: process.stdout
// }));
app.use(morgan(loggerFormat));

app.use(express.static(__dirname+ '/public'));
const Users = [
    {
        id: 1,
        name: "abc"
    },
    {
        id: 2,
        name: "xyz"
    }
];
app.get('/api/user/:id', (req,res)=> {              // an endpoint with request type get ----> http://localhost:3000/api/user/

    let userId = parseInt(req.params.id);
    // console.log(typeof(userId));
    let data = Users.find((user) => {
        return user.id === userId
    });
    if(!data){
        return res.status(400).send('Item not present or something went wrong');
    }
    res.send(data.name);
})

app.listen(port,()=>{
    console.log(__dirname+'/public');
    
});

//---------------------------------------For creating server using node http module------------------------------
// app.use((req,res,next)=>{
//     res.statusCode=200;
//     res.setHeader('Content-Type', 'text/html');
//     res.end('<html><body><h1>This is an express server</h1></body></html>');
// })
// const server=http.createServer(app);
// server.listen(port,hostname,()=>{
//     console.log(`Server running at http://${hostname}:${port}`)
// });
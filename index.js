//import express from 'express'; //ES2015 Modules
const express = require('express'); //CommonJS Modules
const shortid = require('shortid');



const server = express();

server.use(express.json()); //teaches express how to read JSON from the body

let users = [
    {
        id: shortid(),
        name: "Jane Doe",
        bio: "Not Tarzan's Wife, another Jane",
    },
    {
        id: shortid(),
        name: "Tarzan",
        bio: "King of the Jungle",
    },
    {
        id: shortid(),
        name: "Jacob",
        bio: "Leader of the expedition",
    }
]

server.get('/', (req, res) => {
    res.json({ api: "Up and running!"});
});

server.get('/api/users', function(req, res){
    if (!users){
        res.status(500).json({ errorMessage: "The users information could not be retrieved"});
    }
    else { res.json(users);
    }
});

server.get('/api/users/:id', function(req, res) {
    const id = req.params.id
    const userId = users.filter(user => user.id == id)
    if(!userId) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else if (!res) {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    }  else {
    res.status(200).json(userId)
    }
})

server.post('/api/users', function(req, res) {
    const newUser = req.body;
    if(!newUser.name || !newUser.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } 
    users.push(newUser)
    res.status(201).json({message: "Yay you did it!"})
    if(!res) {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    }
})

server.delete('/api/users/:id', function(req, res) {
    const id = req.params.id;
    users = users.filter(user => user.id != id);
    if(!users){
        res.status(404).json({ errorMessage: "The user with the specified ID does not exist"})
    }
    else if(!res){
        res.status(500).json({ errorMessage: "The user could not be removed"})
    }
    else{
    res.status(200).json(users);
    }
})

server.put("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const getUser = users.filter((user) => user.id === id);
    let newList;

    if (getUser.length <= 0) {
        res.status(404).send("The user with the specified ID does not exist");
    }
    else if (!req.body.name || !req.body.bio) {
        res.status(400).send("Please provide name and bio for the user.");
    } else {
        newList = users.filter((user) => user.id !== id);
        if (req.body.id === id){
            newList.push(req.body);
            res.status(200).send(newList);
        } else{
            newList.push(req.body);
            res.status(200).send(newList);
            users = newList;
        }
        }

        if (newList === users) {
            res.status(500).send("The user information could not be modified");
        }
    });


server.listen(4000, () => console.log('\n==API RUNNING==\n')); 
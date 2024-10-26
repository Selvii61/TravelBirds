const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 2000;

let comments= [];
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//send the comments to the server
app.post('/travelblog', (req, res) => {
    const {name, comment} = req.body;
    if (name && comment) {
        comments.push(name, comment);
        console.log(comments);
        res.send('Comment added successfully');
    } else {
        res.status(400).send('Name and Comment is required');
    }
    

});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});


app.get('/travelblog', (req, res) => {
    res.sendFile(path.join(__dirname, 'travelblog.html'));
});

//send the comments to the client as a html
app.get('/comments', (req, res) => {
    let commentsHtml = '';
    for (let i = 0; i < comments.length-1; i=i+2) {
        const name = comments[i]|| 'Anonymous';
        const commentText = comments[i+1] || '';
        commentsHtml += `<li><strong>${name}</strong>: ${commentText}</li>`;
    }
    let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Comments</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-100">
     <header>
        <nav class="bg-blue-500 p-4">
            <div class="container mx-auto flex justify-between items-center">
              <a href="#" class="text-white text-2xl font-bold">TravelBirds</a>
              <div class="space-x-4">
                <a href="/" class="text-white hover:text-gray-200 nav-link">Home</a>
                <a href="travelblog" class="text-white hover:text-gray-200 nav-link">Travelblog</a>
                <a href="comments" class="text-white hover:text-gray-200 nav-link">Comments</a>
                <a href="about" class="text-white hover:text-gray-200 nav-link">About</a>
              </div>
            </div>
          </nav>
    </header>
        <h1 class="text-3xl font-bold text-center my-4">Comments</h1>
        <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <ul id="comments" class="space-y-4">
                ${commentsHtml}
            </ul>
            <a href="travelblog" class="block text-center text-indigo-600 mt-4">Write a comment</a>
        </div>
    </body>
    </html>
    `;
    res.send(html);
});




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

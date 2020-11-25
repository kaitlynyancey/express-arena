const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello again Express!');
});

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});

app.get('/burgers', (req, res) => {
    res.send('We have juicy burgers!');
})

app.get('/pizza/pepperoni', (req, res) => {
    res.send('Your pizza is on the way!');
})

app.get('/pizza/pineapple', (req, res) => {
    res.send("We don't serve that here. Never call again!");
})

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
        Base URL: ${req.baseUrl}
        Host: ${req.hostname}
        Path: ${req.path}
        IP: ${req.ip}
        Params: ${req.params}
        `;
    res.send(responseText);
});

app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end(); //do not send any data back to the client
  });

app.get('/greetings', (req, res) => {
    const name = req.query.name;
    const race = req.query.race;

    if(!name) {
        return res.status(400).send('Please provide a name');
    }
    if(!race) {
        return res.status(400).send('Please provide a race');
    }

    const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.Hope you have fun!`;

    res.send(greeting);
});

app.get('/sum', (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    if(!a || !b) {
        return res.status(400).send('Please provide a value for a and b');
    }

    const sum = a + b;
    res.send(`The sum of ${a} and ${b} is ${sum}`)
})

app.get('/cipher', (req, res) => {
    const text = req.query.text;
    const shift = req.query.shift;

    if(!text) {
        return res.status(400).send('Please provide a value for text');
    }
    if(!shift) {
        return res.status(400).send('Please provide a value for shift');
    }

    const newText = [];

    for(let i = 0; i < text.length; i++){
        const letter = text.charCodeAt(i);
        const letterShift = letter + parseInt(shift);
        const newLetter = String.fromCharCode(letterShift);
        newText.push(newLetter)
    }
    res.send(`The new text is: ${newText.join("")}`)
})

app.get('/lotto', (req, res) => {
    const num = req.query.num;
    if(num.length != 6) {
        return res.status(400).send('Please enter 6 numbers!')
    }
    for(let i=0; i<num.length; i++){
        if(num[i] > 20 || num[i] <= 0){
            return res.status(400).send('Please enter a number between 1 and 20')
        }
    }
    console.log(num)
    const lottoNums = [];
    for(let i=0; lottoNums.length < 6; i++){
        randNum = Math.floor(Math.random() * 20) + 1;
        if(!lottoNums.find(itm => itm === randNum)){
            lottoNums.push(randNum);
        }
    }
    console.log(lottoNums);
    var counter = 0;
    for(let i = 0; i < 6; i++){
        for(let j = 0; j < 6; j++){
            if(num[i] == lottoNums[j]){
                counter++;
            }
        }
    }
    if(counter === 6){
        res.send('Wow! Unbelievable! You could have won the mega millions!')
    }
    else if(counter === 5){
        res.send('Congratulations! You win $100!')
    }
    else if(counter === 4){
        res.send('Congratulations, you win a free ticket')
    }
    else {
        res.send('Sorry, you lose')
    }
})
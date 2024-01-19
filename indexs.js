const express = require('express');
const { createCanvas, loadImage } = require('canvas')
const app = express();

const port = 8000;

app.get('/', (req, res) => {
  res.json('Hello World!');
});


const canvas = createCanvas(200, 200)
const ctx = canvas.getContext('2d')

// Write "Awesome!"
ctx.font = '30px Impact'
ctx.rotate(0.1)
ctx.fillText('Awesome!', 50, 100)

// Draw line under text
var text = ctx.measureText('Awesome!')
ctx.strokeStyle = 'rgba(0,0,0,0.5)'
ctx.beginPath()
ctx.lineTo(50, 102)
ctx.lineTo(50 + text.width, 102)
ctx.stroke()

// Draw cat with lime helmet
loadImage('./temptate.png').then((image) => {
  ctx.drawImage(image, 50, 0, 70, 70)
  console.log('<img src="' + canvas.toDataURL() + '" />')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
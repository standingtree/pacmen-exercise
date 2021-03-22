var image_index = 0;
const pacArray = [
    ['images/PacMan1.png', 'images/PacMan2.png'],
    ['images/PacMan3.png', 'images/PacMan4.png']
];
var direction = 0;
const pacMen = []; // This array holds all the pacmen

function setToRandom(scale) {
    return {
        x: Math.random() * scale,
        y: Math.random() * scale
    }
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
    // returns an object with random values scaled {x: 33, y: 21}
    let velocity = setToRandom(10); // {x:?, y:?}
    let position = setToRandom(1000);
    // Add image to div id = game
    let game = document.getElementById('game');
    let newimg = document.createElement('img');
    newimg.style.position = 'absolute';
    newimg.src = 'images/PacMan1.png';
    newimg.width = 100;
    //
    // set position here
    newimg.style.position.x = position.x;
    newimg.style.position.y = position.y;

    // add new Child image to game
    game.appendChild(newimg);
    // return details in an object
    return {
        position,
        velocity,
        newimg
    }
}


function update() {
    //loop over pacmen array and move each one and move image in DOM
    image_index = 1-image_index;
    pacMen.forEach((item, index) => {
        console.log("PacMan: "+index+" | direction: "+direction+" | image: "+image_index)
        checkCollisions(item)
        item.position.x += item.velocity.x;
        item.position.y += item.velocity.y;
        item.newimg.style.left = item.position.x;
        item.newimg.style.top = item.position.y;

        if (item.velocity.x <= 0) {
            direction = 1;
        }
        else direction = 0;

        item.newimg.src = pacArray[direction][image_index];
    })
    setTimeout(update, 100);
}


function checkCollisions(item) {
  //
  // detect collision with all walls and make pacman bounce
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  if (item.position.x >= windowWidth-item.newimg.width || item.position.x <= 0){
    item.velocity.x = -item.velocity.x;
  }

  if (item.position.y >= windowHeight-item.newimg.height || item.position.y <= 0){
    item.velocity.y = -item.velocity.y;
   }


}


async function makeOne() {
    let result = await makePac()
    pacMen.push(result); // add a new PacMan
}
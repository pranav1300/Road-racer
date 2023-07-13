let down = 1;
let a = 0;
let life = 3;

let car = document.querySelector(".car");

let car_props = car.getBoundingClientRect();

let road = document.querySelector(".road");

let road_props = road.getBoundingClientRect();

let bullets = document.querySelectorAll(".bullet");

let carRandom = document.querySelectorAll(".scar");


let score_val = document.querySelector(".score_val");
let message = document.querySelector(".message");
let score_title = document.querySelector(".score_title");

let life_val = document.querySelector(".life_val");

let life_title = document.querySelector(".life_title");

life_val.innerHTML = "3";

let game_state = "Start";

// Add an eventlistener for key presses
document.addEventListener("keydown", (e) => {
  // Start the game if enter key is pressed
  if (e.key == "Enter" && game_state != "Play") {
    document.querySelectorAll(".stripes").forEach((e) => {
      e.remove();
    });

    document.querySelectorAll(".scar").forEach((e) => {
      e.remove();
    });

    document.querySelectorAll(".bullet").forEach((e) => {
      e.remove();
    });

    game_state = "Play";
    message.innerHTML = "";
    score_title.innerHTML = "Score : ";
    score_val.innerHTML = "0";
    play();
  }

  if (e.code == "KeyS") {
    create_bullets();
  }
});

function play() {
  function move() {
    if (game_state != "Play") return;

    let stripes = document.querySelectorAll(".stripes");

    stripes.forEach((element) => {
      let stripes_props = element.getBoundingClientRect();
      let newTop = stripes_props.top + 5; // Adjust the value (e.g., 1) to control the speed of downward movement
      element.style.top = newTop + "px";

      // Remove the stripes when they reach the bottom of the screen
      if (newTop >= road_props.top + road_props.height) {
        element.remove();
      }
    });

    let bullets = document.querySelectorAll(".bullet");
    let cRandom = document.querySelectorAll(".scar");
    // console.log(bullets);
    if (game_state != "Play") return;
    bullets.forEach((element) => {
      let bullet_props = element.getBoundingClientRect();
      let newTop = bullet_props.top - 25; // Adjust the value (e.g., 1) to control the speed of downward movement
      element.style.top = newTop + "px";

      cRandom.forEach((e) => {
        let cR_props = e.getBoundingClientRect();

        if (
          bullet_props.top <= cR_props.top + cR_props.height &&
          bullet_props.left <= cR_props.left + cR_props.width &&
          bullet_props.left + bullet_props.width >= cR_props.left &&
          bullet_props.top + bullet_props.height >= cR_props.top
        ) {

          e.remove();
        }

      });

      // Remove the stripes when they reach the bottom of the screen
      if (newTop <= road_props.top) {
        element.remove();
      }

    });

    let carRandom = document.querySelectorAll(".scar");
    if (game_state != "Play") return;
    carRandom.forEach((element) => {
      let cR_props = element.getBoundingClientRect();
      let newTop = cR_props.top + 9; // Adjust the value (e.g., 1) to control the speed of downward movement
      element.style.top = newTop + "px";

      // Remove the stripes when they reach the bottom of the screen
      if (newTop >= road_props.top + road_props.height) {
        element.remove();
      } else {
        if (
          car_props.top <= cR_props.top + cR_props.height &&
          car_props.left <= cR_props.left + cR_props.width &&
          car_props.left + car_props.width >= cR_props.left &&
          car_props.top + car_props.height >= cR_props.top
        ) {
          let audio = new Audio();
          audio.src = "hit-someting-6037.mp3";
          audio.play();
          element.remove();
          life = life - 1;
          life_val.innerHTML = life.toString();
          if (life == 0) {
            game_state = "End";
            message.innerHTML = "Car Crashed";
            message.style.color = "red";
            message.style.top = "50vh";
            message.style.left = "40vw";
            setTimeout(() => {
              location.reload();
            }, 3000);
          } else {
            if (a % 15 == 0) {
              score_val.innerHTML = +score_val.innerHTML + 1;
            }
            element.style.top = newTop + "px";

            a += 1;
          }
        } else {
          if (a % 15 == 0) {
            score_val.innerHTML = +score_val.innerHTML + 1;
          }

          element.style.top = newTop + "px";
          a += 1;
        }
      }
    });

    requestAnimationFrame(move);
  }
  requestAnimationFrame(move);

  function apply_buttons() {
    if (game_state != "Play") return;

    document.addEventListener("keydown", (event) => {
      let newLeft;
      if (event.key === "ArrowLeft" && car_props.left > road_props.left) {
        newLeft = car_props.left - 25;
      }
      if (
        event.key === "ArrowRight" &&
        car_props.right < road_props.right
      ) {
        newLeft = car_props.left + 25;
      } 

      car.style.left = newLeft + "px";
    });

    car_props = car.getBoundingClientRect();

    requestAnimationFrame(apply_buttons);
  }
  requestAnimationFrame(apply_buttons);

  function random_cars() {
    if (game_state != "Play") return;

    if (Math.random() < 0.01) {
      let images = ["yellow.png", "obs_car.png", "greenCar.jpg"];
      let rand = Math.floor(Math.random() * 3);
      let carRandom = document.createElement("img");
      carRandom.src = images[rand];
      carRandom.className = "scar";
      let a = Math.random() * 37 + 27.5;
      carRandom.style.left = a + "vw";
      carRandom.increase_score = "1";

      document.body.appendChild(carRandom);
    }

    requestAnimationFrame(random_cars);
  }

  requestAnimationFrame(random_cars);

  let stripes_gap = 0;
  function create_stripes() {
    if (game_state != "Play") return;

    if (stripes_gap > 10) {
      stripes_gap = 0;

      let stripes = document.createElement("div");
      stripes.className = "stripes";
      document.body.appendChild(stripes);

      let stripes_left = document.createElement("div");
      stripes_left.className = "stripes";
      stripes_left.style.left = "38vw";
      document.body.appendChild(stripes_left);

      let stripes_right = document.createElement("div");
      stripes_right.className = "stripes";
      stripes_right.style.left = "62vw";

      document.body.appendChild(stripes_right);
    }

    stripes_gap++;
    requestAnimationFrame(create_stripes);
  }
  requestAnimationFrame(create_stripes);

 
}

function create_bullets() {
  let bullets = document.createElement("div");
  //bullets.src = "bullet.png";
  bullets.className = "bullet";
  bullets.style.left = car.style.left;
  document.body.appendChild(bullets);
  let audio = new Audio();
  audio.src ="boom.mp3";
  audio.play();
}

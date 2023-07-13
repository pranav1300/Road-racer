let car = document.querySelector('.car');

let car_props = car.getBoundingClientRect();

let road = document.querySelector('.road');

let road_props = road.getBoundingClientRect();

let game_state = 'Start';

play_ok();

function play_ok(){

  

 
  function move_ok() {
    let bullets = document.querySelectorAll('.bullet');
   
    bullets.forEach((element) => {
      let bullet_props = element.getBoundingClientRect();
      let newTop = bullet_props.top - 10; // Adjust the value (e.g., 1) to control the speed of downward movement
      element.style.top = newTop + 'px';
  
      // Remove the stripes when they reach the bottom of the screen
      if (newTop <= 0) {
        element.remove();
      }

    });

    requestAnimationFrame(move_ok);
        
  }
  requestAnimationFrame(move_ok);

  function apply_buttonsok(){

    document.addEventListener('keydown', (event) => {

      if (event.key === 's'){
        let bullets = document.createElement('img');
        bullets.src = "bullet.png";
        bullets.className = 'bullet';
        bullets.style.left = car.style.left;
        document.body.appendChild(bullets);
      }
    });
    requestAnimationFrame(apply_buttonsok);
  }
  requestAnimationFrame(apply_buttonsok);
}

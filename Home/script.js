let red_color = document.querySelectorAll('.red');
let blue_color = document.querySelectorAll('.blue');
let yellow_color = document.querySelectorAll('.yellow');
let all_color = [red_color , blue_color , yellow_color];

console.log(all_color)
const first_red = red_color[0];
const second_red = red_color[1];
const third_red = red_color[2];
const four_red = red_color[3];

const home = document.querySelector('.home');
const roof = document.querySelector('.roof');
const home_back = document.querySelector('.home-back');
const home_window = document.querySelector('.home-window');
const home_door = document.querySelector('.home-door');

for(let i = 0; i < 4; i++){
    findWhichEle(red_color , i );
    findWhichEle(yellow_color , i);
    findWhichEle(blue_color ,i );
}
function findWhichEle(colorAry, i){
    let color_element = colorAry[i];
    color_element.onclick = () =>{
        switch(i){
            case 0 :
                changeColor(roof , color_element.classList);
                break;
            case 1 :
                changeColor(home_back , color_element.classList);
                break;
            case 2 :
                changeColor(home_window , color_element.classList);
                break;
            case 3 :
                changeColor(home_door , color_element.classList);
                break;
        }
    }
}

function changeColor(element , color ){
    element.style.backgroundColor = color;
}
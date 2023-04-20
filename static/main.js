var snake = document.getElementById('snake_head');
var border = document.getElementById('border_object');
var food_object = document.getElementById('food_object');
var move_value_1 = 1;
var move_value_2 = 1;
var move_value_3 = snake;
var food_X;
var food_Y;
var body_Num = 1;
var body_position_X = [-1];
var body_position_Y = [-1];
var delete_assurance = 0;
var stop_flag = 0;
function move(way, increase_or_decrease, role) {
    if (way === 1) {
        if (increase_or_decrease === 1) {
            role.style.left = String(Number(role.style.left.slice(0, -2)) + 30).concat("px");
        }
        if (increase_or_decrease === -1) {
            role.style.left = String(Number(role.style.left.slice(0, -2)) - 30).concat("px");
        }
    }
    if (way === -1) {
        if (increase_or_decrease === 1) {
            role.style.top = String(Number(role.style.top.slice(0, -2)) + 30).concat("px");
        }
        if (increase_or_decrease === -1) {
            role.style.top = String(Number(role.style.top.slice(0, -2)) - 30).concat("px");
        }
    }


}
function setimage(key, role) {
    switch (key.keyCode) {
        case 37 :
        case 65://L
            role.setAttribute('src', "/static/snake_head_L.png");
            break;
        case 38:
        case 87://T
            role.setAttribute('src', "/static/snake_head_T.png");
            break;
        case 39:
        case 68://R
            role.setAttribute('src', "/static/snake_head_R.png");
            break;
        case 40:
        case 83://D
            role.setAttribute('src', "/static/snake_head_D.png");
            break;
    }
}
function movejudge(key) {
    switch (key.keyCode) {
        case 37 :
        case 65://L
            move_value_1 = 1;
            move_value_2 = -1;
            break;
        case 38: 
        case 87://T
            move_value_1 = -1;
            move_value_2 = -1;
            break;
        case 39:
        case 68://R
            move_value_1 = 1;
            move_value_2 = 1;
            break;
        case 40 :
        case 83://D
            move_value_1 = -1;
            move_value_2 = 1;
            break;
    }
}
function main(key, role) {
    setimage(key, role);
    movejudge(key);
}

function position_judge(role, border) {
    if (Number(role.style.top.slice(0, -2)) < 0) {
        console.log(role.style.top + " " + (Number(border.style.top.slice(0, -2))) )
        move(-1, 1, role);
        
    }
    if (Number(role.style.top.slice(0, -2)) > Number(border.style.height.slice(0, -2))-Number(border.style.top.slice(0, -2)) ) {
        move(-1, -1, role);
    }
    if (Number(role.style.left.slice(0, -2)) < 0) {
        move(1, 1, role);
    }
    if (Number(role.style.left.slice(0, -2)) > Number(border.style.width.slice(0, -2))-Number(border.style.left.slice(0, -2)) ) {
        move(1, -1, role);
    }
}
function food_create() {
    food_object.style.left = String(food_X).concat("px");
    food_object.style.top = String(food_Y).concat("px");
}

function ramdom_food_position() {
    food_Y = Math.floor(Math.random() * ( Number(border.style.height.slice(0, -2)-30)/10 - 5 + 1) + 5 )*10
    food_X = Math.floor(Math.random() * ( Number(border.style.height.slice(0, -2)-30)/10 - 5 + 1) + 5 )*10
}

function eat_food(role, food) {
    if (Number(role.style.left.slice(0, -2)) >= Number(food.style.left.slice(0, -2))
        && Number(role.style.left.slice(0, -2)) <= Number(food.style.left.slice(0, -2)) + 30
        && Number(role.style.top.slice(0, -2)) <= Number(food.style.top.slice(0, -2)) + 30
        && Number(role.style.top.slice(0, -2)) >= Number(food.style.top.slice(0, -2)) - 30) {
        ramdom_food_position();
        food_create();
        addbody();
    }
}

function addbody() {
    var snake_body = document.createElement("img");
    document.getElementById('border_object').appendChild(snake_body);
    snake_body.setAttribute("id", "snake_body_" + String(body_Num));
    snake_body.setAttribute("src", "static/snake_body_red.png");
    snake_body.setAttribute("style", "visibility:hidden");
    body_Num += 1;
    document.getElementById('body_num').textContent = body_Num-1
    delete_assurance = 1;
    
}
function set_snake_position(Num) {
    var temp_snake = document.getElementById('snake_body_'.concat(String(Num)));
    temp_snake.style.position = "absolute";
    temp_snake.style.left = body_position_X[Num];
    temp_snake.style.top = body_position_Y[Num];
    temp_snake.style.visibility = 'visible';
}
function refresh_body_position(role) {
    body_position_Y.unshift(role.style.top);
    body_position_X.unshift(role.style.left);
    if (delete_assurance == 1) {
        body_position_X.pop();
        body_position_Y.pop();
    }
    delete_assurance = 0;
}
function body_collision(role){
    for(var i = 1;i<body_Num-1;i++){
        if(body_position_X[i]==Number(snake.style.left.slice(0,-2)) && body_position_Y[i]==Number(snake.style.top.slice(0,-2))){
            stop_flag = 1;
        }
        for(var j = i+1; j<body_Num;j++){
            if(body_position_X[i]==body_position_X[j] && body_position_Y[i] == body_position_Y[j]){
                stop_flag = 1;
            }
        }
    }
}
function stop_fun(){
    console.log(stop_flag)
    if(stop_flag == 1){
        clearInterval(move_interval)
        clearInterval(eat_food_interval)
        clearInterval(position_judge_interval)
        clearInterval(debug_interval)
        clearInterval(refresh_body_position_interval)
        clearInterval(body_setting_interval)
        document.getElementById('defeat').style.visibility = 'visible'
        
    }
    
}
function body_setting() {
    for (var i = 1; i < body_Num; i++) {
        
        set_snake_position(i);
        console.log("set_body_" + String(i));   
    }
}

function debug() {
    console.log(snake.style.left);
    console.log(snake.style.top);
    for (var i = 0; i < body_Num; i++) {
        console.log(body_position_X[i]);
        console.log(body_position_Y[i]);
    }
    console.log("_________")

}

var body = document.body;
body.addEventListener('keydown', function (e) {
    main(e, snake);
}, false); //偵測按下按鍵的行為
var move_interval = setInterval(function(){move(move_value_1, move_value_2, snake)}, 80);
var position_judge_interval = setInterval(function(){position_judge(snake,border)}, 80);
var eat_food_interval = setInterval(function(){eat_food(snake,food_object)}, 30);
var debug_interval = setInterval(function(){debug()}, 80);
var refresh_body_position_interval = setInterval(function(){refresh_body_position(snake)}, 80);
var body_setting_interval = setInterval(function(){body_setting()}, 80);
var body_collision_interval = setInterval(function(){body_collision()},80)
var stop_interval = setInterval(function(){stop_fun()},80)
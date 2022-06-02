var snake = document.getElementById('snake_head');
var border = document.getElementById('border_object');
var food_object = document.getElementById('food_object');
var move_value_1 = 1;
var move_value_2 = 1;
var move_value_3 = snake;
var food_X;
var food_Y;
var body_Num = 0;
var body_position_X = [];
var body_position_Y = [];
var delete_assurance = 0;
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
        case 37 || 68://L
            role.setAttribute('src', "image/snake_head_L.png");
            break;
        case 38 || 87://T
            role.setAttribute('src', "image/snake_head_T.png");
            break;
        case 39 || 65://R
            role.setAttribute('src', "image/snake_head_R.png");
            break;
        case 40 || 83://D
            role.setAttribute('src', "image/snake_head_D.png");
            break;
    }
}
function movejudge(key) {
    switch (key.keyCode) {
        case 37 || 68://L
            move_value_1 = 1;
            move_value_2 = -1;
            break;
        case 38 || 87://T
            move_value_1 = -1;
            move_value_2 = -1;
            break;
        case 39 || 65://R
            move_value_1 = 1;
            move_value_2 = 1;
            break;
        case 40 || 83://D
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
        move(-1, 1, role);
    }
    if (Number(role.style.top.slice(0, -2)) > Number(border.style.height.slice(0, -2)) - 30) {
        move(-1, -1, role);
    }
    if (Number(role.style.left.slice(0, -2)) < 0) {
        move(1, 1, role);
    }
    if (Number(role.style.left.slice(0, -2)) > Number(border.style.width.slice(0, -2)) - 30) {
        move(1, -1, role);
    }
}
function food_create() {
    food_object.style.left = String(food_X).concat("px");
    food_object.style.top = String(food_Y).concat("px");
}
function ramdom_food_position() {
    food_Y = (Math.floor(Math.random() * 45) + 1) * 10;
    food_X = (Math.floor(Math.random() * 85) + 1) * 10;
}

function eat_food(role, food) {
    if (Number(role.style.left.slice(0, -2)) >= Number(food.style.left.slice(0, -2))
        && Number(role.style.left.slice(0, -2)) <= Number(food.style.left.slice(0, -2)) + 60
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
    snake_body.setAttribute("src", "image/snake_body_red.png");
    snake_body.setAttribute("style", "visibility:hidden");
    body_Num += 1;
    delete_assurance = 1;
}
function set_snake_position(Num) {
    var temp_snake = document.getElementById('snake_body_'.concat(String(Num)));
    temp_snake.style.position = "relative";
    temp_snake.style.left = body_position_X[Num];
    temp_snake.style.top = body_position_Y[Num];
    temp_snake.style.visibility = 'visible';
}
function refresh_body_position(role) {
    body_position_Y.unshift(role.style.top);
    body_position_X.unshift(role.style.left);
    if (delete_assurance == 0) {
        body_position_X.pop();
        body_position_Y.pop();
    }
    delete_assurance = 0;
}
function body_setting() {
    for (var i = 0; i < body_Num; i++) {
        for (var j = 0; j < 20000000; j++) {
            continue;
        }
        set_snake_position(i);
        console.log("set_body_" + String(i))
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
setInterval("move(move_value_1, move_value_2, snake)", 100);
setInterval("position_judge(snake,border)", 25);
setInterval("eat_food(snake,food_object)", 50);
setInterval("debug()", 10);
setInterval("refresh_body_position(snake)", 300);
setInterval("body_setting()", 50);

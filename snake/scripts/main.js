var snake = document.getElementById('snake_head');
var border = document.getElementById('border_object');
var move_value_1 = 1;
var move_value_2 = 1;
var move_value_3 = snake;
function move(way, increase_or_decrease, role) {
    if (way === 1) {
        if (increase_or_decrease === 1) {
            role.style.left = String(Number(role.style.left.slice(0, -2)) + 5).concat("px");
        }
        if (increase_or_decrease === -1) {
            role.style.left = String(Number(role.style.left.slice(0, -2)) - 5).concat("px");
        }
    }
    if (way === -1) {
        if (increase_or_decrease === 1) {
            role.style.top = String(Number(role.style.top.slice(0, -2)) + 5).concat("px");
        }
        if (increase_or_decrease === -1) {
            role.style.top = String(Number(role.style.top.slice(0, -2)) - 5).concat("px");
        }
    }
    console.log(role.style.top);
    console.log(role.style.left);
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
/*
function position_judge(role, border) {
    if (Number(role.style.top.slice(0, -2)) < 0) {
        move(-1, 1, role);
    }
    if (Number(role.style.top.slice(0, -2)) > Number(border.style.height.slice(0, -2))) {
        move(-1, -1, role);
    }
    if (Number(role.style.left.slice(0, -2)) < 0) {
        move(1, 1, role);
    }
    if (Number(role.style.left.slice(0, -2)) > Number(border.style.width.slice(0, -2))) {
        move(1, -1, role);
    }
}
*/
var body = document.body;
body.addEventListener('keydown', function (e) {
    main(e, snake);
}, false); //偵測按下按鍵的行為
setInterval("move(move_value_1, move_value_2, move_value_3)", 50);
//setInterval("position_judge(snake,border)", 50);




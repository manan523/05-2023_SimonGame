var level = 1;
var gamepattern = [];
var userpattern = [];
var colours = ["red", "blue", "green", "yellow"];
var highscore=0;
var score;

function start(e) {
    $("body").css("background-color", "#011F3F");
    $(".ys").text("Your Score:0");
    score=0;
    var x = e.key;
    if (x == 'a') {
        gamepattern=[];
        playgame();
        $(document).off();
    }
}
$(document).on("keydown", start);

function right() {
    (new Audio("res/11sounds/correct.mp3")).play();
    $(".btn").off();
    score++;
    $(".ys").text("Your Score:"+score);
    if(score>highscore){
        $(".hs").text("High Score:"+score);
        highscore=score;
    }
    setTimeout(playgame,1000);
}

function wrong() {
    level = 1;
    (new Audio("res/11sounds/wrong.mp3")).play();
    $("body").css("background-color", "#990000");
    $("h1").text("Press 'a' to start");
    $(".btn").off();
    $(document).on("keydown", start);
}

function checkpatt(gp, up,pos1) {
    if (up[pos1] != gp[pos1]) {
        wrong();
    } else if (up[pos1] == gp[pos1] && pos1 == gp.length - 1) {
        right();
    }
}

function animatepress(col) {
    $("." + col).addClass("pressed");
    setTimeout(function () {
        $("." + col).removeClass("pressed");
    }, 100);
}

function playsound(key) {
    (new Audio("res/11sounds/" + key + ".mp3")).play();
}

function random() {
    return Math.floor(Math.random() * 4);
}

function playgame() {
    userpattern = [];
    var pos=-1;
    $("h1").text("Level " + level);
    level++;
    var rnum = random();
    var rcol = colours[rnum];
    $("." + rcol).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    gamepattern.push(rcol);
    playsound(rcol);
    $(".btn").on("click", function () {
        pos++;
        var usercol = $(this).attr("id");
        userpattern.push(usercol);
        playsound(usercol);
        animatepress(usercol);
        checkpatt(gamepattern, userpattern,pos);
    });

}
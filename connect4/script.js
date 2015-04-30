var columns = [[], [], [], [], [], [], []];
var tokens = 0;
var playing = true;
var started = false;
var maxHeight = 6;

var dropLength = function(index) {
    return (maxHeight + 0.15 - columns[index].length) * 26;
};

var locate = function(type, x, y) {
    if((x < 0) || (x > 6)) return false;
    if((y < 0) || (y > maxHeight - 1)) return false;
    if(columns[x].length < (y + 1)) return false;
    return (columns[x][y] === type);
};

var winner = function(type, x, y) {
    if(!locate(type, x, y)) return false;
    var direct = [[1,0], [1,1], [0,1], [1,-1]];
    var matches = 0;
    for(var i = 0; i < 4; i++) {
        for(var j = 1; ; j++)
            if(locate(type, x+j*direct[i][0], y+j*direct[i][1]))
                matches++;
            else break;
        for(var j = 1; ; j++)
            if(locate(type, x-j*direct[i][0], y-j*direct[i][1]))
                matches++;
            else break;
        if(matches >= 3) return true;
        matches = 0;
    }
    return false;
};

var checkForDraw = function() {
    for(var i = 0; i < columns.length; i++)
        if(columns[i].length < maxHeight)
            return;
    $(".displaycontainer h2").text("Draw!");
    $(".win").show();
    playing = false;
};

var updateGame = function(index) {
    if(!playing) return false;
    var colLength = columns[index].length;
    if(colLength >= maxHeight) return false;
    tokens++;
    var type = tokens % 2;
    columns[index].push(type);
    if(winner(type, index, colLength)) {
        $(".win").show();
        playing = false;
    }
    if(playing && columns[index].length === maxHeight)
        checkForDraw();
    return true;
};

var switchPlayer = function() {
    if(started) return;
    tokens++;
    updateDisplayToken();
};

var updateDisplayToken = function() {
    $(".displaycontainer .token").addClass("deleteme");
    if($("html").hasClass("ie"))
        $(".deleteme").remove();
    else
        $(".deleteme").effect("fade", function()
            {$(".deleteme").remove();});
    var p = tokens%2 ? "player1" : "player2";
    var newToken = "<div style=\"display:none\" class=\"token "
        + p + "\"></div>";
    $(".displaycontainer > div").prepend($(newToken));
    if(!$("html").hasClass("ie"))
        $(".displaycontainer .token")
            .css("position", "absolute");
    $(".displaycontainer .token").show("slide");
    $(".displaycontainer .token").click(switchPlayer);
};

$(document).ready(function() {
    if(!$("html").hasClass("ie"))
        $(".displaycontainer .token")
            .css("position", "absolute");
    $(".columncontainer .button").click(function() {
        var index = $(this).parent().index();
        if(!updateGame(index)) return;
        started = true;
        var p = tokens%2 ? "player2" : "player1";
        var newToken = "<div class=\"token " + p + "\"></div>";
        $(this).prev().prepend(newToken);
        var t = $(this).prev()
            .children(".token:first-child").position().top;
        $(this).prev()
            .children(".token:first-child").css("top", t);
        if($("html").hasClass("ie"))
            $(this).prev().children(".token:first-child")
                .css("top", 81);
        $(this).prev().children(".token:first-child")
            .animate({top:"+="+dropLength(index)+"px"}, 300);
        if(!playing) return;
        updateDisplayToken();
    });
    $(".reset").click(function() {
        $(".gamecontainer .token").fadeOut(function()
            {$(this).remove();});
        for(var i = 0; i < columns.length; i++) columns[i] = [];
        $(".win").hide();
        $(".displaycontainer h2").text("Winner!");
        playing = true;
        started = false;
        updateDisplayToken();
    });
    $(".displaycontainer .token").click(switchPlayer);
    $(".button").mouseenter(function() {
        $(this).addClass("highlighted");
    });
    $(".button").mouseleave(function() {
        $(this).removeClass("highlighted");
    });
});
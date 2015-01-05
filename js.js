/**
 * Created by EmadPC on 12/31/2014.
 */
var animationLock = false;
var currentCard = 0;
var pageID = 0;
var mark;
var words = [{"word": "amin", "edef": "khar", "fdef": "hi"},
    {"word": "emad", "edef": "khob", "fdef": "hi"},
    {"word": "mamad", "edef": "good", "fdef": "hi"},
    {"word": "shir", "edef": "gooooooooooooooooood", "fdef": "hi"},
    {"word": "Finished", "edef": "", "fdef": ""}];

function BuildCard(id) {
    $("#" + id + " #wordTitle strong").text(words[currentCard]["word"]);
    $("#" + id + " #wordDef").text(words[currentCard]["edef"]);
    $("#" + id + " #wordDefF").text(words[currentCard]["fdef"]);
}

function SetNextCardIndex(step) {
    lastCurrent = currentCard;
    do {
        currentCard += step;
        if (currentCard >= words.length || currentCard < 0) {
            currentCard = lastCurrent;
            return -1;
        }
    }
    while (mark[currentCard] == '0');
    return 1;
}

function NextCard() {
    if (animationLock == true)
        return;
    if (SetNextCardIndex(1) == -1)
        return;
    animationLock = true;

    BuildCard("next");
    $('#next').css("left", "100%");
    $('#next').css("display", "inline-block");
    $('#next').css("opacity", 0);
    $('#next').animate({
        opacity: "1",
        left: "0%"
    }, 500);

    $('#current').animate({
        opacity: "0",
        left: "-100%"
    }, 500, function () {
        $('#current').css("display", "none")

        $('#next').attr("id", "tmp");
        $('#current').attr("id", "next");
        $('#tmp').attr("id", "current");

        animationLock = false;
    });
}

function PreviousCard() {
    if (animationLock == true)
        return;
    if (SetNextCardIndex(-1) == -1) {
        return;
    }
    animationLock = true;

    BuildCard("next");
    $('#next').css("left", "-100%");
    $('#next').css("display", "inline-block");
    $('#next').css("opacity", 0);
    $('#next').animate({
        opacity: "1",
        left: "0%"
    }, 500);

    $('#current').animate({
        opacity: "0",
        left: "100%"
    }, 500, function () {
        $('#current').css("display", "none")

        $('#next').attr("id", "tmp");
        $('#current').attr("id", "next");
        $('#tmp').attr("id", "current");

        animationLock = false;
    });
}

function UpdateCookie() {
    $.cookie(pageID + "markarr", mark, {expires: 69});
}

function DeleteCard() {
    if (animationLock == true)
        return;
    if (currentCard == words.length - 1)
        return;

    mark = mark.substr(0, currentCard) + '0' + mark.substr(currentCard+1, mark.length);
    UpdateCookie();

    if (SetNextCardIndex(1) == -1)
        return;
    animationLock = true;

    BuildCard("next");
    $('#next').css("left", "100%");
    $('#next').css("display", "inline-block");
    $('#next').css("opacity", 0);
    $('#next').animate({
        opacity: "1",
        left: "0%"
    }, 500);

    $('#current').animate({
        opacity: "0",
        top: "100%"
    }, 500, function () {
        $('#current').css("display", "none");
        $('#current').css("top", "0%");

        $('#next').attr("id", "tmp");
        $('#current').attr("id", "next");
        $('#tmp').attr("id", "current");

        animationLock = false;
    });
}

$(document).ready(function () {
    mark = $.cookie(pageID + "markarr");
    if(!mark)
        mark = Array(words.length+1).join('1');

    SetNextCardIndex(1);
    BuildCard("current");

    $('div.card').on("swipeleft", function (event) {
        NextCard();
    });

    $('div.card').on("swiperight", function (event) {
        PreviousCard();
    });

    $('div.card').on("swipedown", function (event) {
        DeleteCard();
    });

    $(document).keydown(function (event) {
        if (event.keyCode == 39)
            NextCard();
        if (event.keyCode == 37)
            PreviousCard();
        if (event.keyCode == 38)
            DeleteCard();
    })
})
;

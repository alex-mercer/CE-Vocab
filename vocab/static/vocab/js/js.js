/**
 * Created by EmadPC on 12/31/2014.
 */
var animationLock = false;
var transitionTime = 300;

function BuildCard(id) {
    $("#" + id + " .wordTitle strong").text(words[currentCard]["word"]);
    $("#" + id + " .wordDef").text(words[currentCard]["edef"]);
    $("#" + id + " .wordDefF").text(words[currentCard]["fdef"]);
    $("#" + id + " .wordDef").css("display","none")
    $("#" + id + " .wordDefF").css("display","none")
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
    $('#next').transition({
        opacity: "1",
        left: "0%"
    }, transitionTime);

    $('#current').transition({
        opacity: "0",
        left: "-100%"
    }, transitionTime, function () {
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
    $('#next').transition({
        opacity: "1",
        left: "0%"
    }, transitionTime);

    $('#current').transition({
        opacity: "0",
        left: "100%"
    }, transitionTime, function () {
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
    $('#current').css("top", "0%");
    $('#next').transition({
        opacity: "1",
        left: "0%"
    }, transitionTime);

    $('#current').transition({
        opacity: "0",
        top: "100%"
    }, transitionTime, function () {
        $('#current').css("display", "none");
        $('#current').css("top", "0%");

        $('#next').attr("id", "tmp");
        $('#current').attr("id", "next");
        $('#tmp').attr("id", "current");

        animationLock = false;
    });
}

function FlipCard() {
    if (animationLock == true)
        return;
    if (currentCard == words.length - 1)
        return;

    animationLock = true;
    $("#current").css("perspective","0px");
    $("#current").css("transform", "rotateX(180deg)");
    $("#current .wordDef").toggle();
    $("#current .wordDefF").toggle();
    $('#current').transition({
        perspective:"500px",
        transform: "rotateX(0deg)"
    }, transitionTime, function () {
        animationLock = false;
    });
}

$(document).ready(function () {
    //Configuration
    $.event.special.swipe.horizontalDistanceThreshold = 15;
    $.event.special.swipe.verticalDistanceThreshold = 150;
    //Swipe up/down start
    var supportTouch = $.support.touch,
        scrollEvent = "touchmove scroll",
        touchStartEvent = supportTouch ? "touchstart" : "mousedown",
        touchStopEvent = supportTouch ? "touchend" : "mouseup",
        touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
    $.event.special.swipeupdown = {
        setup: function () {
            var thisObject = this;
            var $this = $(thisObject);
            $this.bind(touchStartEvent, function (event) {
                var data = event.originalEvent.touches ?
                        event.originalEvent.touches[0] :
                        event,
                    start = {
                        time: (new Date).getTime(),
                        coords: [data.pageX, data.pageY],
                        origin: $(event.target)
                    },
                    stop;

                function moveHandler(event) {
                    if (!start) {
                        return;
                    }
                    var data = event.originalEvent.touches ?
                        event.originalEvent.touches[0] :
                        event;
                    stop = {
                        time: (new Date).getTime(),
                        coords: [data.pageX, data.pageY]
                    };

                    // prevent scrolling
                    if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                        event.preventDefault();
                    }
                }

                $this
                    .bind(touchMoveEvent, moveHandler)
                    .one(touchStopEvent, function (event) {
                        $this.unbind(touchMoveEvent, moveHandler);
                        if (start && stop) {
                            if (stop.time - start.time < 1000 &&
                                Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                                Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                                start.origin
                                    .trigger("swipeupdown")
                                    .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                            }
                        }
                        start = stop = undefined;
                    });
            });
        }
    };
    $.each({
        swipedown: "swipeupdown",
        swipeup: "swipeupdown"
    }, function (event, sourceEvent) {
        $.event.special[event] = {
            setup: function () {
                $(this).bind(sourceEvent, $.noop);
            }
        };
    });
    //Swipe up/down end

    $('div.card').on("swipeleft", function (event) {
        NextCard();
    });

    $('div.card').on("swiperight", function (event) {
        PreviousCard();
    });

    $('div.card').on("swipedown", function (event) {
        DeleteCard();
    });

    $('div.card').on("swipeup", function (event) {
        FlipCard();
    });

    $(document).keydown(function (event) {
        if (event.keyCode == 39)
            NextCard();
        else if (event.keyCode == 37)
            PreviousCard();
        else if (event.keyCode == 40)
            DeleteCard();
        else if (event.keyCode == 38)
            FlipCard();
        else
            return;
        event.preventDefault()

    })
})
;

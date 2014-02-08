var list = [];
var item1 = "";
var item2 = "";
var last = [];

var buildList = function(formField) {
    if (formField !== null) {
        var formField = formField.split(',');
        formField.reverse();
        for (var i = formField.length - 1; i >= 0; i--) {
            list.push(formField[i]);
        }
    }
    displayList();    
};

var select2 = function() {// selects the two items to be compared
    item1 = list[Math.floor(Math.random()*list.length)];
    item2 = list[Math.floor(Math.random()*list.length)];
    if (item1 === item2) {
        select2();
    } else {
        return [item1, item2];
    }
};


var choice = function() {
    select2();
    var userInput = prompt(("Which do you like more? " + item1 +"? or " + item2 + "?"), "Type '1' or '2' here. Hit Cancel to stop ranking.");
    if (userInput === null) {
        $(".result").empty().append("No selection was made. Hit the button below to keep going!")
        displayList();
    } else if (userInput === "1") {
        last = $.extend(true, [], list);
        var space1 = list.indexOf(item1);
        var space2 = list.indexOf(item2);
        if (space2 < space1) {
            var switched = list.splice(space1,1);
            var newList = list.splice(space2,0,item1);
            $(".result").empty().append(item1 + " moved to position " + (list.indexOf(item1)+1) + " in your list!");
            displayList();
            choice();
        } else {
            $(".result").empty().append("Your list remains unchanged:");
            displayList();
            choice();
        }
    } else if (userInput === "2") {
        last = $.extend(true, [], list);
        var space1 = list.indexOf(item1);
        var space2 = list.indexOf(item2);
        if (space1 < space2) {
            var switched = list.splice(space2,1);
            var newList = list.splice(space1,0,item2);
            $(".result").empty().append(item2 + " moved to position " + (list.indexOf(item2)+1) + " in your list!");
            displayList();
            choice();
        } else {
            $(".result").empty().append("Your list remains unchanged.");
            displayList();
            choice();
        }
    } else {
        $(".result").empty().append("I guess you don't know how to follow instructions. Try again");
        choice();
    }
};

var undoLast = function(){ //undo function to be called with last obj
    if (list === last) {
        $(".result").empty().append("Your last choice didn't cause a change. There's nothing to undo!");
    } else if (list !== last) {
        list = last;
        displayList();
        $(".result").empty().append("Your last choice was reverted!");
    }
}

var displayList = function(){ //displays the updated list on the page
    $(".listHead > li").remove();
    for (var i = 0; i < list.length; i++) {
        $(".listHead").append("<li></li>");
        $(".listHead > li:last").append(list[i]);
    };
}

$(document).ready(function() { //clicking undoes the last choice
    $(".undo").on("click", function() {
        undoLast();
    })
});

$(document).ready(function() { // clicking send sends inputted item(s)
    $(".submit").on("click", function() {
        var userText = $("input").val();
        if (userText !== "") {
            buildList(userText);
            $("input").val("")
        }
    })
});

$(document).ready(function() { // hitting enter submits item as well
    $("input").keypress(function(e) {
        if (e.which === 13) {
            var userText = $("input").val();
            if (userText !== "") {
                buildList(userText);
                $("input").val("")
            }
        }
    })
});

$(document).ready(function() { //starts the ranking process
    $(".rank").on("click", function(){
        choice();
    })
})
if ((JSON.parse(localStorage.getItem('cachedList')) !== null)) {
    var list = (JSON.parse(localStorage.getItem('cachedList')));
} else {
    var list = [];
}

if ((parseInt(localStorage.getItem('count'))) !== null) {
    var counter = parseInt(localStorage.getItem('count'));
} else {
    var counter = 0;
}

<<<<<<< HEAD
var item1 = "";
var item2 = "";
var last = [];

var buildList = function(formField) {
=======
var buildList = function(formField) { // accepts new list items, adds them to bottom of list, displays
>>>>>>> 1f1e83aa218fef125cb12b18fb2011ed710cdc79
    if (formField !== null) {
        var formField = formField.split(',');
        var listCollapse =[];
        for (var i = 0; i < list.length; i++) {
            listCollapse.push(list[i][0]);
        };
        listCollapse.join("").toLowerCase().replace(/\s|[^a-z0-9]/g,"");
        for (var i = 0; i < formField.length; i++) {
            if ((listCollapse.indexOf(formField[i].toLowerCase().replace(/\s|[^a-z0-9]/g,"")) === -1) && (formField[i].replace(/\s/g,"").length > 0)) {
                list.push([formField[i], 0, 0]);
            }
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


var choice = function() { // calls select2 to get random items, displays on page
    select2();
    $(".item1 > p").empty().append(item1[0]);
    $(".item2 > p").empty().append(item2[0]);
}

$(document).ready(function(){ //user presses button1
    $(".choice1").on("click", function(){
        counter++;
        item1[1]++;
        item2[1]++;
        item1[2]++;
        $(".counter").empty().append(counter + " items!")
        last = $.extend(true, [], list);
        var space1 = list.indexOf(item1);
        var space2 = list.indexOf(item2);
        if (space2 < space1) {
            var switched = list.splice(space1,1);
            var newList = list.splice(space2,0,item1);
            $(".result").empty().append(item1[0] + " moved to position " + (list.indexOf(item1)+1) + " in your list! You've ranked " + item1[0] + " " + item1[1] + " times, and it wins " + Math.round(((item1[2] * 100) / item1[1])) +"% of the time." );
            displayList();
            choice();
        } else {
            $(".result").empty().append(item1[0] + " is already ahead of " + item2[0] + ". Your list remains unchanged. You've ranked " + item1[0] + " " + item1[1] + " times, and it wins " + Math.round(((item1[2] * 100) / item1[1])) +"% of the time.");
            displayList();
            choice();
        }
    })
})

$(document).ready(function(){ // user presses button 2
    $(".choice2").on("click", function(){
       counter++;
        item1[1]++;
        item2[1]++;
        item2[2]++;
        $(".counter").empty().append(counter + " items!")
        last = $.extend(true, [], list);
        var space1 = list.indexOf(item1);
        var space2 = list.indexOf(item2);
        if (space1 < space2) {
            var switched = list.splice(space2,1);
            var newList = list.splice(space1,0,item2);
            $(".result").empty().append(item2[0] + " moved to position " + (list.indexOf(item2)+1) + " in your list! You've ranked " + item2[0] + " " + item2[1] + " times, and it wins " + Math.round(((item2[2] * 100) / item2[1])) +"% of the time." );
            displayList();
            choice();
        } else {
            $(".result").empty().append(item2[0] + " is already ahead of " + item1[0] + ". Your list remains unchanged. You've ranked " + item2[0] + " " + item2[1] + " times, and it wins " + Math.round(((item2[2] * 100) / item2[1])) +"% of the time.");
            displayList();
            choice(); 
        }
    })
})


var undoLast = function(){ //undo function to be called with last obj
    if (list === last) {
        $(".result").empty().append("Your last choice didn't cause a change. There's nothing to undo!");
    } else if (list !== last) {
        list = last;
        counter--;
        displayList();
        $(".result").empty().append("Your last choice was reverted!");
    }
}

var displayList = function(){ //displays the updated list on the page
    localStorage.setItem('cachedList', JSON.stringify(list));
    localStorage.setItem('count', counter.toString());
    $(".listHead > li").remove();
    $(".counter").empty().append(counter + " items!");
    for (var i = 0; i < list.length; i++) {
        $(".listHead").append("<li></li>");
        $(".listHead > li:last").append(list[i][0]);

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

$(document).ready(function(){ // on page load, if there is a cached list, display it
    if (list !== []) {
        displayList();
    }
})

$(document).ready(function(){ // increment ranking counter on page
    if (counter > 0) {
        $(".counter").empty().append(counter + " items!")
    }
})

$(document).ready(function(){ //clear list
    $(".delete").on("click", function() {
        var choice = confirm("Are you sure you want to delete your list? Once you do, you can't get it back!");
        $(".result").empty();
        $(".item1 > p").empty();
        $(".item2 > p").empty();
        if (choice) {
            list = [];
            counter = 0;
            displayList();
        }
    })
})

/*

List model: [[name, total, wins], [name, total, wins],..., [name, total, wins]]

*/
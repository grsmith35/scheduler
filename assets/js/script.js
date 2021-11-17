var currentTime = moment().format("MMMM Do YYYY");
$('#currentDay').text(currentTime);
var tasks = {};

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

$(".hour-row").on("click", ".saveBtn", function() {
    var text = $(this)
    .closest('.hour-row')
    .children('.col-8')
    .children('textarea')
    .val()
    .trim();
    var time = $(this).parent().attr('id');

    tasks[time] = text;
    saveTasks();

    var taskP = $("<p>")
    .text(text);

    $(this).closest('.hour-row')
    .children('.col-8')
    .children('textarea')
    .replaceWith(taskP);

    loadTasks();
})

function loadTasks() {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    $(".hour-row").each(function() {
        for(r in tasks) {
            if(r === $(this).attr("id")){
                $(this).children('.col-8')
                .children("p").text(tasks[r])
            }
        }
    })

}

function timeChecker() {
    var timeNow = moment().hour();

    $(".hour-row").each(function() {
        var timeOfDay = $(this).attr("id");
        var rowTime = parseInt($(this).attr("id").replace('row-', ""));
        if(timeOfDay.endsWith('pm') === true && rowTime !== 12) {
            rowTime += 12;
        }
        
        if(rowTime > timeNow) {
            $(this).children('#event-area').removeClass('bg-light past present')
            .addClass("future");
        }
        else if(rowTime === timeNow) {
            $(this).children('#event-area').removeClass('bg-light past future')
            .addClass("present");
        }
        else if(rowTime < timeNow) {
            $(this).children('#event-area').removeClass('bg-light present future')
            .addClass("past");
        }
    })
}

$(".container-area").on("click", "p", function(){
    var text = $(this)
        .text()
        .trim();
    var textInput = $("<textarea>")
        .val(text);

    $(this).replaceWith(textInput);
});

var checkTime = setInterval(timeChecker, 5000)
loadTasks();
timeChecker();
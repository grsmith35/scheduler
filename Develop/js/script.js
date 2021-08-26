var currentTime = moment().format("MMMM Do YYYY");
var containerArea = document.querySelector("#container-area");
var dateContainerEl = document.querySelector("#currentDay");

dateContainerEl.textContent = currentTime;

$(".container-area").on("click", function(){
    console.log("here");
    var text = $(this)
        .text()
        .trim();
    console.log(text);
    var textInput = $("<textarea>")
        .val(text);

    $(this).replaceWith(textInput);
})

//containerArea.addEventListener("click", changeEvent)
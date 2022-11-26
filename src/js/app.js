import '../scss/app.scss';
import './colorpicker'

var isClicked = false;
let GRIDWIDTH = 9;
let GRIDHEIGHT = 20;
let FRAMES = 5;
let currentFrame = 0;
let selectedColour;
let newRow, newCol, newFrame;

$('#newColorPicker').hexColorPicker();
$('#newColorPicker').trigger("click");

window.addEventListener('mousedown', e => {

  isClicked = true;
});


window.addEventListener('mouseup', e => {
  if (isClicked === true) {
    isClicked = false;
  }
});

/* Your JS Code goes here */
addEventListener('DOMContentLoaded', (event) => {

    createGrid();

    $(".input-wrapper input#width").val(GRIDWIDTH);
    $(".input-wrapper input#height").val(GRIDHEIGHT);
    $(".input-wrapper input#frames").val(FRAMES);
    $(".input-wrapper").on("change", function(){
        GRIDWIDTH = $(this).find("input#width").val();
        GRIDHEIGHT = $(this).find("input#height").val();
        FRAMES = $(this).find("input#frames").val();
        createGrid();
    })

    // document.querySelectorAll(".hex-color-picker-wrapper").forEach(e => e.onclick = (event) => {
    //     selectedColour = event.srcElement.style.backgroundColor;
    //     document.getElementById("selectedColour").style.backgroundColor = event.srcElement.style.backgroundColor;
    // })
    $(".hex-color-picker-wrapper").on("click", function(e) {
        selectedColour = $(this).find(".selected-color").val();
        $(".selectedColour").first().css("background-color",selectedColour);
    })

    $("#table .frame-wrapper").first().css("display","inline-block");
    $(".current-frame").first().html((currentFrame + 1) + "/" + FRAMES);

    $(".navigation button").on("click", function(){
        $("#table .frame-wrapper.frame" + currentFrame).css("display","none");
        if ($(this).hasClass("back") && currentFrame != 0) {
            currentFrame --;
        }
        if ($(this).hasClass("forward") && currentFrame + 1 < FRAMES) {
            currentFrame ++
        }
        $("#table .frame-wrapper.frame" + currentFrame).css("display","inline-block");
        $(".current-frame").first().html((currentFrame + 1) + "/" + FRAMES);
    })
});

function createGrid() {
    $("#table").empty();
    for (let frame = 0; frame < FRAMES; frame++) {
        newFrame = document.createElement("div");
        newFrame.classList.add("frame" + frame);
        newFrame.classList.add("frame-wrapper");
        for (let row = 0; row < GRIDHEIGHT; row++) {
            newRow = document.createElement("tr");
            newRow.classList.add("row" + row);
            newRow.classList.add("animationGrid");
            for(let col = 0; col < GRIDWIDTH; col++) {
                newCol = document.createElement("td");
    
                newCol.classList.add("col" + col);
                //newCol.classList.add((col + row)%2?"dark":"light")
                if(row == 0 || row == GRIDHEIGHT - 1 || col == 0 || col == GRIDWIDTH - 1)
                    newCol.classList.add("dark");
    
                newCol.onmouseover = (target) => {
                    if (!isClicked)
                        return;
                    if(row == 0 || row == GRIDHEIGHT - 1 || col == 0 || col == GRIDWIDTH - 1)
                        target.srcElement.style.backgroundColor = selectedColour
                    else
                        target.srcElement.style.backgroundColor = "#C3C3C3"
    
                }
                newRow.appendChild(newCol);
            }
            newFrame.appendChild(newRow);
        }
        document.getElementById("table").appendChild(newFrame);
    }
}
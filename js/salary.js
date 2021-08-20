var slider = document.getElementById("Range");
var output = document.getElementById("salary");

output.innerHTML = slider.value;

slider.oninput = function() {
    output.innerHTML = slider.value;
}

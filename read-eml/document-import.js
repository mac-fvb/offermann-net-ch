function previewFile() {
    const fileInput = document.querySelector('#inputfile');
     
    var files = fileInput.files;
  
    for (i = 0; i < files.length; i++){  
        var f = files[i];
        var reader = new FileReader();

        var listContainer = document.createElement("ul");
    
        reader.onload = (function(theFile) {
            return function(e) {
                var content = document.createElement("li");
                content.innerText = e.target.result;
                listContainer.appendChild(content);
            };
        })
        (f);
    reader.readAsText(f);
    document.querySelector(".output").insertBefore(listContainer, null);
    } 
}

const clearButton = document.querySelector("#clearForm")

clearButton.addEventListener("click", event => {
    document.querySelector(".output").innerHTML = "<p></p>"
});
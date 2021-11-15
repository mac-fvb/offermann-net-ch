function isSupportedFileAPI() {
    return window.File && window.FileReader && window.FileList && window.Blob;
  }

  function formatEmail(data) {
    return data.name ? data.name + " [" + data.email + "]" : data.email;
  }

  function parseHeaders(headers) {
    var parsedHeaders = {};
    if (!headers) {
      return parsedHeaders;
    }
    var headerRegEx = /(.*)\: (.*)/g;
    while (m = headerRegEx.exec(headers)) {
      // todo: Pay attention! Header can be presented many times (e.g. Received). Handle it, if needed!
      parsedHeaders[m[1]] = m[2];
    }
    return parsedHeaders;
  }

  function getMsgDate(rawHeaders) {
    // Example for the Date header
    var headers = parseHeaders(rawHeaders);
    if (!headers['Date']){
      return '-';
    }
    return new Date(headers['Date']);
  }


  $(function () {

    if (isSupportedFileAPI()) {
      $('.src-file').change(function () {
        var newList = document.createElement("ul");
        newList.classList.add("output-list");
        document.querySelector(".body-email").appendChild(newList);
         for (i=0; i < this.files.length; i++){
            var selectedFile = this.files[i];

            if (!selectedFile) {
            $('.msg-info, .incorrect-type').hide();
            return;
            }

            if (selectedFile.name.indexOf('.msg') == -1) {
            $('.msg-info').hide();
            $('.incorrect-type').show();
            return;
           }
          $('.msg-example .msg-file-name').html(selectedFile.name);
          $('.incorrect-type').hide();

        // read file...
        var fileReader = new FileReader();
        fileReader.onload = function (evt) {

          var buffer = evt.target.result;
          var msgReader = new MSGReader(buffer);
          var fileData = msgReader.getFileData();

 
          if (!fileData.error) {
    
/*             $('.msg-example .msg-body').html(
                fileData.body ? fileData.body.substring(0, Math.min(500, fileData.body.length))
                + (fileData.body.length > 500 ? '...' : '') : '');
            if (fileData.bodyHTML) {
              $('.msg-example .msg-body-html').html(fileData.bodyHTML).closest('div.field-block').show();
            } else {
              $('.msg-example .msg-body-html').closest('div.field-block').hide();
            } */


            var re = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/g;
            var emailRe = fileData.body.match(re); 
            
            if (!emailRe) {
              var errorMail = `${selectedFile.name} konnte keine E-Mailadresse gefunden werden. HTML-Mail?`
              var newError = document.createElement("p");
              newError.innerText = errorMail;
              document.querySelector(".email-error").appendChild(newError);}
            else{
            var addedEmail = emailRe[0]
            //console.log(addedEmail);
            
            var newListElement = document.createElement("li");
            newListElement.innerText = addedEmail;
            document.querySelector(".output-list").appendChild(newListElement);}

            

            $('.msg-info').show();

            // Use msgReader.getAttachment to access attachment content ...
            // msgReader.getAttachment(0) or msgReader.getAttachment(fileData.attachments[0])
          } else {
            $('.msg-info').hide();
            $('.incorrect-type').show();
          }

        };
        fileReader.readAsArrayBuffer(selectedFile);
      }  

      // from here we can work with the email addresses in one array    

    }
      );

    } else {
      $('.msg-example').hide();
      $('.file-api-not-available').show();
    }

  });

const clearEmail = document.querySelector("#clearEmail")

clearEmail.addEventListener("click", event => {
    document.querySelector(".body-email").innerHTML = "<p></p>"
    document.querySelector(".email-error").innerText = ""
});
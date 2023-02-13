var psList = document.getElementById("acmicpc");

const owner = "leeminseo0923";
const repo = "Competive-Programming";

const path = ["/acimpic"];

const url = `https://api.github.com/repos/${owner}/${repo}/contents${path[0]}`;

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const fileNames = data;
    fileNames.forEach((item) => {
      var fileName = item.name;
      var fileUrl = item.html_url;
      if (fileName.includes(".c")) {
        extensionId = fileName.indexOf(".c");
        var innertext = fileName.slice(0, extensionId);

        var fileList = document.createElement("ol");
        fileList.style.width = "max(38vw, 38vh)";

        var fileContainer = document.createElement("div");
        fileContainer.classList.add("textList");

        var questionName = document.createElement("a");
        questionName.href = `https://acmicpc.net/problem/${innertext}`;

        var containerUrl = document.createElement("a");
        containerUrl.href = fileUrl;
        containerUrl.innerText = "source code..";
        containerUrl.classList.add("codeUrl");

        questionName.innerText = innertext;
        questionName.style.display = "inline-block";

        var addReview = document.createElement("i");
        addReview.classList.add("fa-solid");
        addReview.classList.add("fa-plus");
        addReview.style.fontSize = "min(3vw, 3vh)";

        var addButton = document.createElement("a");
        addButton.appendChild(addReview);
        addButton.href = "./post.html";

        fileContainer.appendChild(questionName);
        fileContainer.appendChild(containerUrl);
        fileList.appendChild(fileContainer);
        fileList.appendChild(addButton);

        psList.appendChild(fileList);
      }
    });
  })
  .catch((error) => {
    console.error(error);
  });

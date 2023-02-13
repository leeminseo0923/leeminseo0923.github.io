var psList = document.getElementById("acimpic");

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

        var fileContainer = document.createElement("a");
        fileContainer.href = `https://acmicpc.net/problem/${innertext}`;
        fileList.classList.add("textList");

        var containerUrl = document.createElement("a");
        containerUrl.href = fileUrl;
        containerUrl.innerText = "source code..";
        containerUrl.classList.add("codeUrl");

        fileContainer.innerText = innertext;
        fileContainer.style.display = "inline-block";

        fileList.style.justifyContent = "space-between";

        fileList.appendChild(fileContainer);
        fileList.appendChild(containerUrl);

        psList.appendChild(fileList);
      }
    });
  })
  .catch((error) => {
    console.error(error);
  });

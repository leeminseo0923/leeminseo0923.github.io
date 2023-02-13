var psList = document.getElementById("pslist");

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

        var fileContainer = document.createElement("ol");
        fileContainer.classList.add("textList");

        var containerUrl = document.createElement("a");
        containerUrl.href = fileUrl;
        containerUrl.innerText = innertext;

        console.log(fileContainer);

        fileContainer.appendChild(containerUrl);
        psList.appendChild(fileContainer);
      }
    });
  })
  .catch((error) => {
    console.error(error);
  });

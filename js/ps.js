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

        var button = document.createElement("a");
        var review = undefined;

        var mdList = [];

        fetch(`https://api.github.com/repos/${owner}/leeminseo0923.github.io/contents/md`)
          .then((response) => response.json())
          .then((data) => {
            data.forEach((item) => {
              mdList.push(item.name);
            });
          })
          .then(() => {
            if (mdList.includes(innertext + ".md")) {
              review = document.createElement("button");
              review.innerText = "Review";
              review.onclick = () => (location.href = `./review.html?${innertext}`);
            } else {
              review = document.createElement("i");
              review.classList.add("fa-solid");
              review.classList.add("fa-plus");
              review.style.marginLeft = "min(1vw, 1vh)";
              review.style.fontSize = "min(3vw, 3vh)";
              button.href = `./post.html?${innertext}`;
            }
          })

          .then(() => {
            button.appendChild(review);

            fileContainer.appendChild(questionName);
            fileContainer.appendChild(containerUrl);
            fileList.appendChild(fileContainer);
            fileList.appendChild(button);

            psList.appendChild(fileList);
          });
      }
    });
  })
  .catch((error) => {
    console.error(error);
  });

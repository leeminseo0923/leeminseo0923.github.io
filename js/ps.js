var psList = document.getElementById("acmicpc");

const owner = "leeminseo0923";
const repo = "Competive-Programming";

const path = ["/acimpic"];

const url = `https://api.github.com/repos/${owner}/${repo}/contents${path[0]}`;

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    var fileNames = [];
    data.forEach((item) => {
      if (item.name.includes(".c")) {
        extensionId = item.name.indexOf(".c");

        fileNames.push([item.name.slice(0, extensionId), item.html_url]);
      }
    });
    fileNames.sort((a, b) => {
      a_ = parseInt(a[0]);
      b_ = parseInt(b[0]);
      return a_ - b_;
    });
    fileNames.forEach((item) => {
      const fileName = item[0];
      const fileUrl = item[1];
      var fileList = document.createElement("ol");
      fileList.style.width = "max(38vw, 38vh)";

      var fileContainer = document.createElement("div");
      fileContainer.classList.add("textList");

      var questionName = document.createElement("a");
      questionName.href = `https://acmicpc.net/problem/${fileName}`;

      var containerUrl = document.createElement("a");
      containerUrl.href = fileUrl;
      containerUrl.innerText = "source code..";
      containerUrl.classList.add("codeUrl");

      questionName.innerText = fileName;
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
          if (mdList.includes(fileName + ".md")) {
            review = document.createElement("button");
            review.innerText = "Review";
            review.onclick = () => (location.href = `./review.html?${fileName}`);
          } else {
            review = document.createElement("i");
            review.classList.add("fa-solid");
            review.classList.add("fa-plus");
            review.style.marginLeft = "min(1vw, 1vh)";
            review.style.fontSize = "min(3vw, 3vh)";
            button.href = `./post.html?${fileName}`;
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
    });
  })
  .catch((error) => {
    console.error(error);
  });

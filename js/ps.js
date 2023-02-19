import { Octokit } from "https://cdn.skypack.dev/@octokit/rest";
var psList = document.getElementById("acmicpc");

const octokit = new Octokit({});

let codeList = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
  owner: "leeminseo0923",
  repo: "Competive-Programming",
  path: "acmicpc",
});

let mdData = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
  owner: "leeminseo0923",
  repo: "leeminseo0923.github.io",
  path: "md",
});

var mdList = [];

mdData.data.forEach((item) => {
  mdList.push(item.name);
});

var fileNames = [];

codeList.data.forEach((item) => {
  if (item.name.includes(".c")) {
    let extensionId = item.name.indexOf(".c");

    fileNames.push([item.name.slice(0, extensionId), item.html_url]);
  }
});

fileNames.sort((a, b) => {
  return parseInt(a) - parseInt(b);
});
fileNames.forEach((item) => {
  const fileName = item[0];
  const fileUrl = item[1];

  var fileList = document.createElement("li");
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
  questionName.style.textDecoration = "none";

  var button = document.createElement("a");
  var review = undefined;

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

  button.appendChild(review);

  fileContainer.appendChild(questionName);
  fileContainer.appendChild(containerUrl);
  fileList.appendChild(fileContainer);
  fileList.appendChild(button);

  psList.appendChild(fileList);
});

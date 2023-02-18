import { Octokit } from "https://cdn.skypack.dev/@octokit/rest";

const octokit = new Octokit({});

const questionName = location.href.split("?")[1];
const owner = "leeminseo0923";
const repo = "leeminseo0923.github.io";
const path = `/md/${questionName}.md`;

const api = `GET /repos/${owner}/${repo}/contents${path}`;

const title = document.querySelector(".title");

title.innerHTML = `${questionName} Review`;

const htmlOutput = document.getElementById("html-output");
octokit
  .request(api)
  .then((data) => {
    let base64 = data.data.content;
    const byteArr = new Uint8Array(
      atob(base64)
        .split("")
        .map((char) => char.charCodeAt(0))
    );

    const decoder = new TextDecoder("utf-8");
    const markdown = decoder.decode(byteArr);

    var html = marked.parse(markdown);

    htmlOutput.innerHTML = html;
  })
  .then(() => {
    Prism.highlightAll();
  });

const editButton = document.querySelector("button");

editButton.addEventListener("click", () => {
  location.href = `./edit.html?${questionName}`;
});

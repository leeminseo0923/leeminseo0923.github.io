const questionName = location.href.split("?")[1];
const owner = "leeminseo0923";
const repo = "leeminseo0923.github.io";
const path = `/md/${questionName}.md`;

const url = `https://api.github.com/repos/${owner}/${repo}/contents${path}`;

const title = document.querySelector(".title");

title.innerHTML = `${questionName} Review`;

const htmlOutput = document.getElementById("html-output");
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    base64 = data.content;
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
    // const code = document.querySelector("code");
    // const pre = document.querySelector("pre");
    // pre.classList.add("language-cpp");
    // code.classList.add("language-cpp");
    // // code.innerHTML = Prism.highlight;
  });

const editButton = document.querySelector("button");

editButton.addEventListener("click", () => {
  location.href = `./edit.html?${questionName}`;
});

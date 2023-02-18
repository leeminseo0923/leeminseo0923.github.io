import { Octokit } from "https://cdn.skypack.dev/@octokit/rest";
const octokit = new Octokit({
  auth: "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",
});

const questionName = location.href.split("?")[1];

const title = document.getElementById("title");

title.innerText = `${questionName} Review`;

const submit = document.getElementById("postingForm");

const owner = "leeminseo0923";
const repo = "leeminseo0923.github.io";

const path = `/md/${questionName}.md`;

const api = `GET /repos/${owner}/${repo}/contents${path}`;

const backBtn = document.getElementById("back-button");

octokit.request(api).then((data) => {
  let base64 = data.data.content;
  const byteArr = new Uint8Array(
    atob(base64)
      .split("")
      .map((char) => char.charCodeAt(0))
  );

  const decoder = new TextDecoder("utf-8");
  const text = decoder.decode(byteArr);

  text.replace(/(?:\r\n|\r|\n)/g, "&nbsp");

  textArea.innerHTML = text;
});

backBtn.href = `./review.html?${questionName}`;

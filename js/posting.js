import { Octokit } from "https://cdn.skypack.dev/@octokit/rest";

const questionName = location.href.split("?")[1];

const title = document.getElementById("title");

title.innerText = `${questionName} Review`;

const submit = document.getElementById("postingForm");

const owner = "leeminseo0923";
const repo = "leeminseo0923.github.io";

const path = `md/${questionName}.md`;
const message = `Add Review of ${questionName}`;

const api = `GET /repos/${owner}/${repo}/contents/${path}`;

submit.addEventListener("submit", (event) => {
  event.preventDefault();
  var content = event.target[0].value;
  var key = event.target[1].value;
  const octokit = new Octokit({
    auth: key,
  });

  const encoder = new TextEncoder();
  const encodedContent = encoder.encode(content);

  var fileNames = [];

  octokit
    .request(`GET /repos/${owner}/${repo}/contents/md`)
    .then((data) => {
      data.data.forEach((element) => {
        fileNames.push(element.name);
      });
    })
    .then(() => {
      if (fileNames.includes(`${questionName}.md`)) {
        octokit
          .request(api)
          .then((data) => {
            const sha = data.data.sha;

            octokit
              .request("PUT /repos/{owner}/{repo}/contents/{path}", {
                owner: owner,
                repo: repo,
                path: path,
                message: message,
                sha: sha,
                content: btoa(String.fromCharCode(...encodedContent)),
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        octokit
          .request("PUT /repos/{owner}/{repo}/contents/{path}", {
            owner: owner,
            repo: repo,
            path: path,
            message: message,
            content: content,
          })
          .catch((error) => {
            alert(error);
          });
      }
    })
    .then(() => {
      alert("Done!");
    });
});

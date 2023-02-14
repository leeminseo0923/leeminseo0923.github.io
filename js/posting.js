const questionName = location.href.split("?")[1];

const title = document.getElementById("title");

title.innerText = `${questionName} Review`;

const submit = document.getElementById("postingForm");

const owner = "leeminseo0923";
const repo = "leeminseo0923.github.io";

const path = `/md/${questionName}.md`;
const message = `Add Review of ${questionName}`;

const url = `https://api.github.com/repos/${owner}/${repo}/contents${path}`;

const backBtn = document.getElementById("back-button");

submit.addEventListener("submit", (event) => {
  const href = backBtn.href;
  backBtn.href = "#";
  event.preventDefault();
  var content = event.target[0].value;
  var key = event.target[1].value;

  const encoder = new TextEncoder();
  const encodedContent = encoder.encode(content);

  const headers = {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };

  var fileNames = [];

  fetch(`https://api.github.com/repos/${owner}/${repo}/contents/md`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        fileNames.push(element.name);
      });
    })
    .then(() => {
      if (fileNames.includes(`${questionName}.md`)) {
        fetch(url, {
          method: "GET",
          headers: headers,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            const sha = data.sha;

            const body = {
              message: message,
              content: btoa(String.fromCharCode(...encodedContent)), // base64-encoded content
              sha: sha,
            };

            fetch(url, {
              method: "PUT",
              headers: headers,
              body: JSON.stringify(body),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        const body = {
          message: message,
          content: btoa(String.fromCharCode(...encodedContent)), // base64-encoded content
        };

        fetch(url, {
          method: "PUT",
          headers: headers,
          body: JSON.stringify(body),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    })
    .then(() => {
      backBtn.href = href;
    });
});

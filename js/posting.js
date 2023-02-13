const questionName = location.href.split("?")[1];

const title = document.getElementById("title");

title.innerText = `${questionName} Review`;

const submit = document.getElementById("postingForm");

const owner = "leeminseo0923";
const repo = "leeminseo0923.github.io";

const path = `/md/${questionName}.md`;
const message = `Add Review of ${questionName}`;

const url = `https://api.github.com/repos/${owner}/${repo}/contents${path}`;

submit.addEventListener("submit", (event) => {
  event.preventDefault();
  var content = event.target[0].value;
  var key = event.target[1].value;

  const headers = {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };

  const body = {
    message: message,
    content: btoa(decodeURIComponent(encodeURIComponent(content))),
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
      console.log(error);
    });
});

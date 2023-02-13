const questionName = location.href.split("?")[1];

const title = document.getElementById("title");

title.innerText = `${questionName} Review`;

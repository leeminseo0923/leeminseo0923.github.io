const textArea = document.querySelector("textarea");

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
    const text = decoder.decode(byteArr);

    text.replace(/(?:\r\n|\r|\n)/g, "&nbsp");

    textArea.innerHTML = text;
  });

const backBtn = document.querySelector("#back-button");

backBtn.href = `./review.html?${questionName}`;

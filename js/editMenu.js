const textArea = document.querySelector("textarea");

const titleBtn = document.querySelector("#size");

titleBtn.addEventListener("click", () => {
  var selectionStart = textArea.selectionStart;
  var selectionEnd = textArea.selectionEnd;
  addCtn = 0;
  start = textArea.value.lastIndexOf("\n", selectionStart);
  if (start === selectionStart) {
    start = textArea.value.lastIndexOf("\n", selectionStart - 1) + 1;
  }
  if (textArea.value.substring(start, start + 3) === "###") {
    textArea.value = textArea.value.substring(0, start) + textArea.value.substring(start + 4);
    addCtn = -4;
  } else {
    head = textArea.value.substring(0, start);
    tail = textArea.value.substring(start);
    if (textArea.value[start] !== "#") {
      if (!textArea.value[start]) {
        textArea.value = head + "# new section" + tail;
        addCtn += 13;
      } else {
        textArea.value = head + "# " + tail;
        addCtn += 2;
      }
    } else {
      textArea.value = head + "#" + tail;
      addCtn += 1;
    }
  }
  const newSelectionStart = selectionStart + addCtn;
  const newSelectionEnd = selectionEnd + addCtn;
  textArea.setSelectionRange(newSelectionStart, newSelectionEnd);

  textArea.focus();
});

const boldBtn = document.querySelector("#bold");

boldBtn.addEventListener("click", () => {
  var selectionStart = textArea.selectionStart;
  var selectionEnd = textArea.selectionEnd;
  addCtn = 0;
  start = textArea.value.lastIndexOf("\n", selectionStart);
  if (textArea.value.substring(start, start + 2) === "**") {
    textArea.value = textArea.value.replace("**", "");
    textArea.value = textArea.value.replace("**", "");
  }

  const newSelectionStart = selectionStart + addCtn;
  const newSelectionEnd = selectionEnd + addCtn;
  textArea.setSelectionRange(newSelectionStart, newSelectionEnd);

  textArea.focus();
});

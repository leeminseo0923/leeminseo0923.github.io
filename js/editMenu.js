const textArea = document.querySelector("textarea");

const titleBtn = document.querySelector("#size");

titleBtn.addEventListener("click", () => {
  var selectionStart = textArea.selectionStart;
  var selectionEnd = textArea.selectionEnd;
  addCtn = 0;
  var start = textArea.value.lastIndexOf("\n", selectionStart - 1) + 1;
  var end = textArea.value.indexOf("\n", selectionStart - 1) + 1;
  if (textArea.value.substring(start, start + 3) === "###") {
    textArea.value = textArea.value.substring(0, start) + textArea.value.substring(start + 4);
    addCtn = start - selectionStart;
  } else {
    head = textArea.value.substring(0, start);
    tail = textArea.value.substring(start);
    if (textArea.value[start] !== "#") {
      console.log(end, start);
      if (end === start) {
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
  var addStart = 0;
  var addEnd = 0;

  var lines = textArea.value.substring(selectionStart, selectionEnd).split("\n");

  if (selectionStart !== selectionEnd) {
    var sumLine = "";

    lines.forEach((line) => {
      var newLine = "";
      if (line.startsWith("**") && line.endsWith("**")) {
        newLine = line.substring(2, line.length - 2);
      } else if (line) {
        newLine = "**" + line + "**";
      }
      sumLine += newLine + "\n";
      addEnd += newLine.length - line.length;
    });
    sumLine = sumLine.slice(0, -1);

    console.log(sumLine, sumLine.length);

    textArea.value =
      textArea.value.substring(0, selectionStart) +
      sumLine +
      textArea.value.substring(selectionEnd);
    console.log(addEnd);
  } else {
    var startWord = Math.max(
      textArea.value.lastIndexOf(" ", selectionStart) + 1,
      textArea.value.lastIndexOf("\n", selectionStart)
    );
    var endWord = textArea.value.indexOf(" ", selectionStart);

    if (endWord < 0) {
      endWord = textArea.value.length;
    }

    var endLine = textArea.value.indexOf("\n", selectionStart);
    if (endLine < 0) {
      endLine = textArea.value.length;
    }

    endWord = Math.min(endWord, endLine);

    var curLine = textArea.value.substring(startWord, endWord);
    console.log(curLine);
    var newLine = "";
    if (!curLine) {
      newLine = "**Bold Text**";
    } else {
      newLine = "**" + curLine + "**";
    }

    textArea.value =
      textArea.value.substring(0, startWord) + newLine + textArea.value.substring(endWord);
    addStart = startWord - selectionStart;
    addEnd = newLine.length - curLine.length + endWord - selectionEnd;
  }

  const newSelectionStart = selectionStart + addStart;
  const newSelectionEnd = selectionEnd + addEnd;
  textArea.setSelectionRange(newSelectionStart, newSelectionEnd);

  textArea.focus();
});

const italicBtn = document.querySelector("#italic");

italicBtn.addEventListener("click", () => {
  var selectionStart = textArea.selectionStart;
  var selectionEnd = textArea.selectionEnd;
  var addStart = 0;
  var addEnd = 0;

  var lines = textArea.value.substring(selectionStart, selectionEnd).split("\n");

  if (selectionStart !== selectionEnd) {
    var sumLine = "";

    lines.forEach((line) => {
      var newLine = "";
      if (
        (line.startsWith("***"), line.endsWith("***")) ||
        (line.startsWith("*") &&
          line.endsWith("*") &&
          !(line.startsWith("**") && line.endsWith("**")))
      ) {
        newLine = line.substring(1, line.length - 1);
      } else if (line) {
        newLine = "*" + line + "*";
      }
      sumLine += newLine + "\n";
      addEnd += newLine.length - line.length;
    });
    sumLine = sumLine.slice(0, -1);

    textArea.value =
      textArea.value.substring(0, selectionStart) +
      sumLine +
      textArea.value.substring(selectionEnd);
  } else {
    var startWord = Math.max(
      textArea.value.lastIndexOf(" ", selectionStart) + 1,
      textArea.value.lastIndexOf("\n", selectionStart)
    );
    var endWord = textArea.value.indexOf(" ", selectionStart);

    if (endWord < 0) {
      endWord = textArea.value.length;
    }

    var endLine = textArea.value.indexOf("\n", selectionStart);
    if (endLine < 0) {
      endLine = textArea.value.length;
    }

    endWord = Math.min(endWord, endLine);

    var curLine = textArea.value.substring(startWord, endWord);

    var newLine = "";
    if (!curLine) {
      newLine = "*Italic Text*";
    } else {
      newLine = "*" + curLine + "*";
    }

    textArea.value =
      textArea.value.substring(0, startWord) + newLine + textArea.value.substring(endWord);
    addStart = startWord - selectionStart;
    addEnd = newLine.length - curLine.length + endWord - selectionEnd;
  }

  const newSelectionStart = selectionStart + addStart;
  const newSelectionEnd = selectionEnd + addEnd;
  textArea.setSelectionRange(newSelectionStart, newSelectionEnd);

  textArea.focus();
});

const codeBtn = document.querySelector("#menubar > #code");

codeBtn.addEventListener("click", () => {
  var selectionStart = textArea.selectionStart;
  var selectionEnd = textArea.selectionEnd;

  if (selectionStart === selectionEnd) {
    var endLine = textArea.value.indexOf("\n", selectionStart);
    if (endLine < 0) {
      endLine = textArea.value.length - 1;
    }
    var newText = "\n```\nCode Text\n```\n";

    textArea.value =
      textArea.value.substring(0, endLine) + newText + textArea.value.substring(endLine);
  } else {
    var curText = textArea.value.substring(selectionStart, selectionEnd);
    var newText = "";

    if (curText.startsWith("`") && curText.endsWith("`")) {
      newText = curText.slice(1, curText.length - 1);
    } else {
      newText = "`" + curText + "`";
    }

    textArea.value =
      textArea.value.substring(0, selectionStart) +
      newText +
      textArea.value.substring(selectionEnd);
  }
});

const linkBtn = document.querySelector("#menubar > #link");

linkBtn.addEventListener("click", () => {
  var selectionStart = textArea.selectionStart;
  var selectionEnd = textArea.selectionEnd;
  var selection = "";
  if (selectionStart === selectionEnd) {
    selection = "Link Text";
  } else {
    selection = textArea.value.substring(selectionStart, selectionEnd);
  }
  var newText = `[${selection}](https://)`;

  textArea.value =
    textArea.value.substring(0, selectionStart) + newText + textArea.value.substring(selectionEnd);
});

const indentBtn = document.querySelector("#menubar > #indent");

indentBtn.addEventListener("click", () => {
  var selectionStart = textArea.selectionStart;
  var selectionEnd = textArea.selectionEnd;
  var addStart = 0;
  var addEnd = 0;

  var startLine = textArea.value.lastIndexOf("\n", selectionStart - 1);

  if (textArea.value.includes("> ", startLine)) {
    textArea.value =
      textArea.value.substring(0, startLine + 1) + textArea.value.substring(startLine + 3);
    addStart -= 2;
    addEnd -= 2;
  } else {
    var newText = "> ";

    textArea.value =
      textArea.value.substring(0, startLine + 1) +
      newText +
      textArea.value.substring(startLine + 1);

    addStart += 2;
    addEnd += 2;
  }

  const newSelectionStart = selectionStart + addStart;
  const newSelectionEnd = selectionEnd + addEnd;
  textArea.setSelectionRange(newSelectionStart, newSelectionEnd);

  textArea.focus();
});

const olBtn = document.querySelector("#menubar > #ol");
olBtn.addEventListener("click", () => {
  var selectionStart = textArea.selectionStart;
  var selectionEnd = textArea.selectionEnd;

  if (selectionStart === selectionEnd) {
    var endLine = textArea.value.indexOf("\n", selectionStart);
    if (endLine < 0) {
      endLine = textArea.value.length - 1;
    }
    var newText = "\n1.   add Item\n2.   add Item\n";

    textArea.value =
      textArea.value.substring(0, endLine) + newText + textArea.value.substring(endLine);
  }
});

const ulBtn = document.querySelector("#menubar > #ul");
ulBtn.addEventListener("click", () => {
  var selectionStart = textArea.selectionStart;
  var selectionEnd = textArea.selectionEnd;

  if (selectionStart === selectionEnd) {
    var endLine = textArea.value.indexOf("\n", selectionStart);
    if (endLine < 0) {
      endLine = textArea.value.length - 1;
    }
    var newText = "\n*   add Item\n*   add Item\n";

    textArea.value =
      textArea.value.substring(0, endLine) + newText + textArea.value.substring(endLine);
  }
});

const lineBtn = document.querySelector("#menubar > #line");

lineBtn.addEventListener("click", () => {
  var selectionStart = textArea.selectionStart;

  var endLine = textArea.value.indexOf("\n", selectionStart);
  if (endLine < 0) {
    endLine = textArea.value.length - 1;
  }
  var newText = "\n---\n";

  textArea.value =
    textArea.value.substring(0, endLine) + newText + textArea.value.substring(endLine);
});

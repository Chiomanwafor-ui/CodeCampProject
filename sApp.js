const { useState } = React;

function App() {
  const defaultMarkdown = `# Welcome to my Markdown Previewer!
  
## This is a sub-heading

Here is a [link](https://www.freecodecamp.org)

Here is some inline code: \`<div></div>\`

\`\`\`
// This is a code block
function helloWorld() {
  return "Hello, world!";
}
\`\`\`

- List item 1
- List item 2
- List item 3

> This is a blockquote

![React Logo](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg)

**This is bold text**
`;

  const [text, setText] = useState(defaultMarkdown);

  return (
    <div className="container">
      <h1 className="title">Markdown Previewer</h1>
      <div className="editor-container">
        <textarea
          id="editor"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <div
        id="preview"
        className="preview"
        dangerouslySetInnerHTML={{ __html: marked.parse(text) }}
      ></div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

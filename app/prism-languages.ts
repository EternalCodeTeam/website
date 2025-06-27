import { languages } from "prismjs";

import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markdown";

import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-go";
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-swift";

import "prismjs/components/prism-bash";
import "prismjs/components/prism-docker";
import "prismjs/components/prism-git";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-groovy";

languages.typescript = languages.extend("javascript", {
  keyword:
    /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|type|typeof|undefined|var|void|while|with|yield)\b/,
  builtin:
    /\b(?:string|Function|Object|Boolean|Number|Array|Date|RegExp|Promise|any|void|never|unknown)\b/,
});

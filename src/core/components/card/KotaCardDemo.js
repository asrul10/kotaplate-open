import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import htmlAutoIndent from "../../utility/htmlAutoIndent";
import jsxString from "../../utility/jsxString";
import style from "../../utility/kotaPrismStyle";

SyntaxHighlighter.registerLanguage("jsx", jsx);

const jsxAsExample = (component) => {
  if (!component) {
    return "";
  }
  return jsxString(component);
};

const KotaExampleCode = ({ children, className, ...props }) => {
  const [toggleCode, setToggleCode] = useState(false);
  const rawHtml = children.props?.dangerouslySetInnerHTML?.__html;
  const jsxExample = jsxAsExample(children);
  let example = "";
  if (jsxExample) {
    example = jsxExample;
  }
  if (rawHtml) {
    example = rawHtml;
  }
  const exampleCode = example ? htmlAutoIndent(example) : "";
  className = `content-demo mb-3 ${className || ""}`;

  return (
    <>
      <div className={className} {...props}>
        {children}
        <button
          onClick={() => setToggleCode(!toggleCode)}
          type="button"
          className="btn btn-anchor p-0 mb-0 mt-2"
        >
          <FontAwesomeIcon icon={faCode} /> {toggleCode ? "Hide" : "Show"} code
        </button>
      </div>
      {toggleCode && (
        <div className="highlight mb-3">
          <SyntaxHighlighter language="jsx" wrapLongLines={true} style={style}>
            {exampleCode}
          </SyntaxHighlighter>
        </div>
      )}
    </>
  );
};

const KotaCardDemo = ({ title, children }) => {
  return (
    <div className="card card-demo">
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        {children}
      </div>
    </div>
  );
};

export { KotaExampleCode };
export default KotaCardDemo;

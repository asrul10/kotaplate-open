import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KotaCardDemo, {
  KotaExampleCode,
} from "../core/components/card/KotaCardDemo";
import KotaBreadcrumb from "../core/components/breadcrumb/KotaBreadcrumb";

const CardContent = ({ content }) => {
  if (!content.element) {
    return <></>;
  }
  if (content.type === "desc") {
    return <p dangerouslySetInnerHTML={{ __html: content.element }} />;
  }
  if (content.type === "code") {
    return (
      <KotaExampleCode>
        <div dangerouslySetInnerHTML={{ __html: content.element }} />
      </KotaExampleCode>
    );
  }
  return <></>;
};

const BootstrapComponent = ({ data }) => {
  const pageTitle = data.title;
  const breadcrumb = [{ href: "/", label: pageTitle, current: true }];
  const docs = data.link;
  const content = data.content;
  const splitContent = () => {
    if (content.length === 3) {
      return 1;
    }
    return content.length / 2;
  };
  const gutterContent = Math.ceil(splitContent());

  return (
    <>
      <h2 className="page-title">{pageTitle}</h2>
      <KotaBreadcrumb navItems={breadcrumb} />
      <div className="full-doc">
        <a
          href={docs}
          className="btn btn-secondary btn-sm"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faBook} /> Documentation
        </a>
      </div>
      <div className="row">
        <div className="col">
          {content.map((val, index) => {
            if (gutterContent < index) {
              return "";
            }
            return (
              <KotaCardDemo title={val.title} key={index}>
                {val.contents.map((content, idx) => (
                  <CardContent content={content} key={idx} />
                ))}
              </KotaCardDemo>
            );
          })}
        </div>
        <div className="col">
          {content.map((val, index) => {
            if (gutterContent >= index) {
              return "";
            }
            return (
              <KotaCardDemo title={val.title} key={index}>
                {val.contents.map((content, idx) => (
                  <CardContent content={content} key={idx} />
                ))}
              </KotaCardDemo>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BootstrapComponent;

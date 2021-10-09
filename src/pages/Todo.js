import KotaBreadcrumb from "../core/components/breadcrumb/KotaBreadcrumb";

const pageTitle = "Todo";
const breadcrumb = [{ href: "/", label: "Todo", current: true }];

const Todo = () => {
  return (
    <>
      <h2 className="page-title">{pageTitle}</h2>
      <KotaBreadcrumb navItems={breadcrumb} />
    </>
  );
};

export default Todo;

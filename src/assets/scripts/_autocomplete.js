export default () => {
  const autoCompleteEle = $(".input-autocomplete");
  if (autoCompleteEle.length === 0) {
    return;
  }

  for (let index = 0; index < autoCompleteEle.length; index++) {
    const autoComplete = $(autoCompleteEle[index]);
    const prefix = autoComplete.attr("data-prefix") || "";
    const suffix = autoComplete.attr("data-suffix") || "";
    let dataSource = autoComplete.attr("data-source");

    dataSource = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.whitespace,
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      prefetch: dataSource,
    });

    autoComplete.typeahead(
      {
        hint: true,
        highlight: false,
        minLength: 1,
      },
      {
        source: dataSource,
        templates: {
          notFound: () => {
            return "<span class='dropdown-item-text'>Not Found</span>";
          },
          suggestion: (data) => {
            return ["<div>", prefix, data, suffix, "</div>"].join("");
          },
        },
      }
    );
  }
};
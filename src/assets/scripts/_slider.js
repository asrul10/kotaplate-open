export default () => {
  const allRanges = document.querySelectorAll(".slider-with-tooltip");
  const sliderTooltip = $(
    ".slider-with-tooltip.tooltip-on-focus input[type='range']"
  );
  const sliderIconEle = ".slider-with-icon input";
  const sliderInputEle = ".slider-with-input .slider-input";
  const sliderRangeEle = ".slider-with-input input[type='range']";

  if ($(sliderIconEle).length !== 0) {
    $("body").on("input", sliderIconEle, (e) => {
      const currentTarget = $(e.currentTarget);
      const firstRange = currentTarget.attr("data-first-icon-range").split("-");
      const secondRange = currentTarget
        .attr("data-second-icon-range")
        .split("-");
      const sliderContainer = currentTarget.parent();
      const firstIcon = sliderContainer.find(".first-icon");
      const secondIcon = sliderContainer.find(".second-icon");
      const value = currentTarget.val();

      if (
        value >= parseInt(firstRange[0]) &&
        value <= parseInt(firstRange[1])
      ) {
        firstIcon.addClass("active");
      } else {
        firstIcon.removeClass("active");
      }
      if (
        value >= parseInt(secondRange[0]) &&
        value <= parseInt(secondRange[1])
      ) {
        secondIcon.addClass("active");
      } else {
        secondIcon.removeClass("active");
      }
    });
  }

  if ($(sliderInputEle).length !== 0) {
    $(sliderInputEle).on("change", (e) => {
      const currentTarget = $(e.currentTarget);
      const parent = currentTarget.parent();
      const range = parent.find("input[type='range']");
      const value = currentTarget.val();
      const maxValue = range.attr("max") || 100;
      const minValue = range.attr("min") || 0;

      console.log(maxValue);
      let setValue = value;
      if (parseInt(value) > parseInt(maxValue)) {
        setValue = maxValue;
      }
      if (parseInt(value) < parseInt(minValue)) {
        setValue = minValue;
      }
      range.val(setValue);
      currentTarget.val(setValue);
      console.log(setValue);
    });
  }

  if ($(sliderRangeEle).length !== 0) {
    $("body").on("input", sliderRangeEle, (e) => {
      const currentTarget = $(e.currentTarget);
      const parent = currentTarget.parent();
      const input = parent.find(".slider-input");
      const value = currentTarget.val();
      input.val(value);
    });
  }

  const setTooltip = (range, tooltip) => {
    const val = range.value;
    const min = range.min ? range.min : 0;
    const max = range.max ? range.max : 100;
    const newVal = Number(((val - min) * 100) / (max - min));
    tooltip.innerHTML = val;

    tooltip.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
  };

  if (allRanges.length !== 0) {
    allRanges.forEach((e) => {
      const range = e.querySelector("input[type='range']");
      const tooltip = e.querySelector(".slider-tooltip");

      range.addEventListener("input", () => {
        setTooltip(range, tooltip);
      });
      setTooltip(range, tooltip);
    });
  }

  if (sliderTooltip.length !== 0) {
    sliderTooltip.on("mouseover", (e) => {
      const tooltip = $(e.currentTarget).parent().find(".slider-tooltip");
      tooltip.show();
    });

    sliderTooltip.on("mouseout", (e) => {
      const tooltip = $(e.currentTarget).parent().find(".slider-tooltip");
      tooltip.hide();
    });
  }
}
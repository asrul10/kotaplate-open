export default () => {
  const stepperEle = ".bs-stepper";
  const nextEle = ".stepper-next";
  const prevEle = ".stepper-previous";

  if ($(stepperEle).length !== 0) {
    $(stepperEle).each((index, ele) => {
      const stepContainer = $(ele);
      const options = {
        linear: true,
        animation: false,
      };
      if (stepContainer.attr("data-linear") == "off") {
        options.linear = false;
      }
      const steps = new Stepper($(ele)[0], options);
      const nextBtn = stepContainer.find(nextEle);
      const prevBtn = stepContainer.find(prevEle);
      nextBtn.on("click", (e) => {
        steps.next();
      });
      prevBtn.on("click", (e) => {
        steps.previous();
      });
    });
  }
};
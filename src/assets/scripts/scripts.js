import $ from "jquery";
import srollbar from "./_scrollbar";
import select, { formSelectEle } from "./_select";
import breadcrumb from "./_breadcrumb";
import cardDemo from "./_card-demo";
import sidebar from "./_sidebar";
import sidepage from "./_sidepage";
import tooltip from "./_tooltip";
import popover, { popoverEle } from "./_popover";
import searchbar from "./_searchbar";
import slider from "./_slider";
import togglePassword from "./_toggle-password";
import clearInput from "./_clear-input";
import rating from "./_rating";
import step from "./_step";
import autocomplete from "./_autocomplete";
import datepicker from "./_datepicker";
import inputNumber from "./_input-number";
import timepicker from "./_timepicker";
import exampleCodes from "./_codes";

exampleCodes();
srollbar(formSelectEle, popoverEle);
cardDemo();
breadcrumb();
sidebar();
sidepage();
tooltip();
popover();
searchbar();
timepicker();
slider();
select();
togglePassword();
clearInput();
rating();
step();
autocomplete();
datepicker();
inputNumber();

/**
 *
 * Need clean code bellow
 *
 */

//message
$.notifyDefaults({
  element: "body",
  position: null,
  type: "Notify_custom_color",
  allow_dismiss: false,
  newest_on_top: false,
  showProgressbar: false,
  placement: {
    from: "top",
    align: "center",
  },
  offset: 20,
  spacing: 10,
  z_index: 1031,
  delay: 3000,
  timer: 1000,
  url_target: "_blank",
  mouse_over: null,
  animate: {
    enter: "animated fadeInDown",
    exit: "animated fadeOutUp",
  },
  onShow: null,
  onShown: null,
  onClose: null,
  onClosed: null,
  icon_type: "class",
  template:
    '<div data-notify="container" class="alert alert-{0}" role="alert">' +
    "<div class='notify-box' >" +
    '<div class="d-flex justify-content-center" >' +
    '<span class="px-2 notify-icon"  data-notify="icon"></span> ' +
    "<div>" +
    '<span class="notify-massage" data-notify="message">{2}</span>' +
    "</div>" +
    "</div>" +
    "</div>" +
    '<a href="{3}" target="{4}" data-notify="url"></a>' +
    "</div>",
});

const showMessage = $(".show-message");
if (showMessage.length) {
  for (let index = 0; index < showMessage.length; index++) {
    const showMessageCustom = $(showMessage[index]);
    showMessageCustom.click(function () {
      $.notify({
        icon: "fa fa-smile-o",
        message: "This is a normal message",
        url: "#",
        target: "_blank",
      });
    });
  }
}

const showMessageTimer = $(".show-message-timer");
if (showMessageTimer.length) {
  for (let index = 0; index < showMessageTimer.length; index++) {
    const showMessageTimerCustom = $(showMessageTimer[index]);
    showMessageTimerCustom.click(function () {
      $.notify(
        {
          icon: "fa fa-smile-o",
          message: "This is a normal message for 10sec",
        },
        {
          delay: 10000,
        }
      );
    });
  }
}

const loadMessage = $(".load-message");
if (loadMessage.length) {
  for (let index = 0; index < loadMessage.length; index++) {
    const loadMessageCustom = $(loadMessage[index]);
    loadMessageCustom.click(function () {
      $.notify(
        {
          message: " loading...",
        },
        {
          template:
            '<div data-notify="container" class="alert alert-{0}" role="alert">' +
            "<div class='notify-box' >" +
            '<div class="d-flex justify-content-center" >' +
            '<span class="spinner spinner-border spinner-border-sm mr-2"  data-notify="icon"></span> ' +
            "<div>" +
            '<span class="notify-massage" data-notify="message">{2}</span>' +
            "</div>" +
            "</div>" +
            "</div>" +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            "</div>",
        }
      );
    });
  }
}

//tree
const jsTree = $(".jstree");
if (jsTree.length) {
  for (let index = 0; index < jsTree.length; index++) {
    const jsTreeCustom = $(jsTree[index]);
    jsTreeCustom.jstree();
  }
}

const jsTreeWithBox = $(".jstreewithbox");
if (jsTreeWithBox.length) {
  for (let index = 0; index < jsTreeWithBox.length; index++) {
    const jsTreeWithBoxCustom = $(jsTreeWithBox[index]);
    jsTreeWithBoxCustom.jstree({
      plugins: ["checkbox"],
    });
  }
}

const jsTreeWithIcon = $(".jstreewithicon");
if (jsTreeWithIcon.length) {
  for (let index = 0; index < jsTreeWithIcon.length; index++) {
    const jsTreeWithIconCustom = $(jsTreeWithIcon[index]);
    jsTreeWithIconCustom.jstree({
      types: {
        default: {
          icon: "fa fa-check",
        },
      },
      plugins: ["types"],
    });
  }
}

const jsTreeWithIconBox = $(".jstreewithiconbox");
if (jsTreeWithIconBox.length) {
  for (let index = 0; index < jsTreeWithIconBox.length; index++) {
    const jsTreeWithIconBoxCustom = $(jsTreeWithIconBox[index]);
    jsTreeWithIconBoxCustom.jstree({
      types: {
        default: {
          icon: "fa fa-check",
        },
      },
      plugins: ["types", "checkbox"],
    });
  }
}

const jsTreeWithOpen = $(".jstreewithopen");
if (jsTreeWithOpen.length) {
  for (let index = 0; index < jsTreeWithOpen.length; index++) {
    const jsTreeWithOpenCustom = $(jsTreeWithOpen[index]);
    jsTreeWithOpenCustom.jstree({
      types: {
        default: {
          icon: "fa fa-check",
        },
      },
      plugins: ["types", "checkbox"],
    });
  }
}

// Tree
const jsTreeWithDisable = $(".jstreewithdisable");
if (jsTreeWithDisable.length) {
  for (let index = 0; index < jsTreeWithDisable.length; index++) {
    const jsTreeWithDisableCustom = $(jsTreeWithDisable[index]);
    jsTreeWithDisableCustom.jstree({
      types: {
        default: {
          icon: "fa fa-check",
        },
      },
      plugins: ["types", "checkbox"],
    });
  }
}

const jsTreeWithMultipleIcon = $(".jstreewithmultipleicon");
if (jsTreeWithMultipleIcon.length) {
  for (let index = 0; index < jsTreeWithMultipleIcon.length; index++) {
    const jsTreeWithMultipleIconCustom = $(jsTreeWithMultipleIcon[index]);
    jsTreeWithMultipleIconCustom.jstree({
      types: {
        default: {
          icon: "fa fa-check",
        },
        demo: {
          icon: "fa fa-heart-o",
        },
        demo2: {
          icon: "fa fa-smile-o",
        },
      },
      plugins: ["types", "checkbox"],
    });
  }
}

const jsTreeDragable = $(".jstreedragable");
if (jsTreeDragable.length) {
  for (let index = 0; index < jsTreeDragable.length; index++) {
    const jsTreeDragableCustom = $(jsTreeDragable[index]);
    jsTreeDragableCustom.jstree({
      types: {
        default: {
          icon: "fa fa-check",
        },
        demo: {
          icon: "fa fa-heart-o",
        },
        demo2: {
          icon: "fa fa-smile-o",
        },
      },
      core: {
        check_callback: true,
      },
      plugins: ["types", "checkbox", "dnd"],
    });
  }
}

//upload
//----------------upload--------------------
const inputFile = $(".input-file");
if (inputFile.length) {
  for (let index = 0; index < inputFile.length; index++) {
    const inputFileCustom = $(inputFile[index]);
    inputFileCustom.fileinput({
      uploadUrl: "/file-upload-batch/1",
      uploadAsync: false,
      showUpload: false,
      showRemove: false,
      showBrowse: true,
      showCaption: false,
      browseLabel: "Upload File",
      dropZoneEnabled: false,
      browseClass: "btn upload-btn",
    });
  }
}

const inputFileOutline = $(".input-file-outline");
if (inputFileOutline.length) {
  for (let index = 0; index < inputFileOutline.length; index++) {
    const inputFileOutlineCustom = $(inputFileOutline[index]);
    inputFileOutlineCustom.fileinput({
      uploadUrl: "/file-upload-batch/1",
      uploadAsync: false,
      showUpload: false,
      showRemove: false,
      showBrowse: true,
      showCaption: false,
      browseLabel: "Upload File",
      dropZoneEnabled: false,
      browseClass: "btn upload-btn outlined",
    });
  }
}

const inputFileNoBrowse = $(".input-file-no-browse");
if (inputFileNoBrowse.length) {
  for (let index = 0; index < inputFileNoBrowse.length; index++) {
    const inputFileNoBrowseCustom = $(inputFileNoBrowse[index]);
    inputFileNoBrowseCustom.fileinput({
      uploadUrl: "/file-upload-batch/1",
      uploadAsync: false,
      showUpload: false,
      showRemove: false,
      showBrowse: false,
      showCaption: false,
      dropZoneEnabled: true,
    });
  }
}

//stepper
function Complete(event, idSelector) {
  var index = event.detail.indexStep;
  var numberOfSteps = idSelector.querySelectorAll(".line").length;
  var numberOfStep = idSelector.querySelectorAll(".step").length;
  var line = idSelector.getElementsByClassName("line");
  var step = idSelector.getElementsByClassName("step");

  for (let i = 0; i < index; i++) {
    line[i].classList.add("crossed");

    for (let j = index; j < numberOfSteps; j++) {
      line[j].classList.remove("crossed");
    }
  }
  if (event.detail.to == 0) {
    for (let k = index; k < numberOfSteps; k++) {
      line[k].classList.remove("crossed");
    }
    line[0].classList.remove("crossed");
  }
  for (let i = 0; i < index; i++) {
    step[i].classList.add("crossed");

    for (let j = index; j < numberOfStep; j++) {
      step[j].classList.remove("crossed");
    }
  }
  if (event.detail.to == 0) {
    for (let k = index; k < numberOfStep; k++) {
      step[k].classList.remove("crossed");
    }
    step[0].classList.remove("crossed");
  }
}

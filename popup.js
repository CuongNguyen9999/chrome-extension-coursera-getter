// window.onload = function () {
//   var txtAreas = document.getElementsByTagName("textarea");
//   for (var i = 0; i < txtAreas.length; i++) {
//     document.getElementById("abc").value = txtAreas[i].id;
//   }
// };
// var tab_title = '';
// function display_h1 (results){
//     console.log(results);
//   h1=results;
//   document.querySelector("#abc").value = h1;

// }
// chrome.tabs.query({active: true}, function(tabs) {
//   var tab = tabs[0];
//   tab_title = tab.title;
//   chrome.tabs.executeScript(tab.id, {
//     code: 'document.querySelector("._10nd10j").id'
//   }, display_h1);
// });

var submissionID = "";
function displayLink(id) {
  if (id == null || id[0] == null) {
    document.querySelector(".input-group").style.display = "none";
    document.querySelector(".container").innerHTML += `
    <div class="alert alert-warning" role="alert">
        Sorry, There is no link available current browser tab. 
        Please make sure you are in the <strong>"My submission"</strong> tab
    </div>
    `;
  } else {
    submissionID = id[0].substring(0, id[0].indexOf("~"));
    browser.tabs.query({ active: true, currentWindow: true }, function (tab) {
      //Be aware that `tab` is an array of Tabs
      let fromIndex = 0;
      let countSlash = 0;
      //https://www.coursera.org/learn/detect-mitigate-ethical-risks/peer/oqeJE/algorithmic-impact-assessment-aia/submit
      //      ^^                ^     ^                             ^    ^     ^                                 ^
      //Total 8 slash before the end of "real" link
      //So we will scan ultil slash number 8 and then stop
      while (tab[0].url.indexOf("/", fromIndex) != -1) {
        fromIndex = tab[0].url.indexOf("/", fromIndex + 1);
        countSlash++;
        if (countSlash >= 8) break;
      }
      document.querySelector("#shareLink").value =
        tab[0].url.substring(0, fromIndex) + "/review/" + submissionID;
    });
  }
}
browser.tabs.query({ active: true }, function (tabs) {
  var tab = tabs[0];
  tab_title = tab.title;
  browser.tabs.executeScript(
    tab.id,
    {
      code: 'document.getElementsByClassName("_10nd10j")[0].id',
    },
    displayLink
  );
});
window.onload = function () {
  "use strict";

  function copyToClipboard(elem) {
    var target = elem;

    // select the content
    var currentFocus = document.activeElement;

    target.focus();
    target.setSelectionRange(0, target.value.length);

    // copy the selection
    var succeed;

    try {
      succeed = document.execCommand("copy");
    } catch (e) {
      console.warn(e);

      succeed = false;
    }

    // Restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
      currentFocus.focus();
    }

    if (succeed) {
      document.getElementsByClassName("copied")[0].style.display = "inline";
    }

    return succeed;
  }
  document.getElementById("copyButton").addEventListener("click", function () {
    copyToClipboard(document.getElementById("shareLink"));
  });
  document.getElementById("shareLink").addEventListener("click", function () {
    copyToClipboard(document.getElementById("shareLink"));
  });
  //   console.log(document.querySelector("#shareLink"));
  //   $("#copyButton, #shareLink").on("click", function () {
  //     copyToClipboard(document.getElementById("shareLink"));
  //   });
};

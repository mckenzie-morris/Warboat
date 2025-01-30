// IIFE for theme control
const themeControl = (() => {
    // obtain current theme (if defined)
    const theme = sessionStorage.getItem("theme");
    // obtain html's class (theme)
    const htmlElmt = document.getElementsByTagName("html")[0].classList;
    // if theme exists on session storage, and browser is reloaded, re-apply the theme to html
    if (theme && !htmlElmt.value) {
      htmlElmt.add(sessionStorage.getItem("theme"));
      return console.log(`${theme} color theme added`);
    }
    // if theme does not exist on session storage, initialize it and apply it to html
    else {
      sessionStorage.setItem("theme", "pastel");
      htmlElmt.add(sessionStorage.getItem("theme"));
      return console.log("pastel color theme initialized");
    }
  })();

  export {themeControl}
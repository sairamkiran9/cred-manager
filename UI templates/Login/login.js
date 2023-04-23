document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#do_login").addEventListener("click", function () {
    closeLoginInfo();
    var spans = this.parentNode.querySelectorAll('span');
    for (var i = 0; i < spans.length; i++) {
      spans[i].style.display = "none";
      spans[i].classList.remove("i-save");
      spans[i].classList.remove("i-warning");
      spans[i].classList.remove("i-close");
    }
    var proceed = true;
    document.querySelectorAll("#login_form input").forEach(function (input) {
      if (!input.value.trim()) {
        input.parentNode.querySelector('span').classList.add("i-warning");
        input.parentNode.querySelector('span').style.display = "block";
        proceed = false;
      }
    });
    if (proceed) {
      spans.forEach(function (span) {
        span.classList.add("i-save");
        span.style.display = "block";
      });
    }
  });
  document.querySelectorAll("#login_form input").forEach(function (input) {
    input.addEventListener("keyup", function () {
      this.parentNode.querySelector('span').style.display = "none";
    });
  });

  openLoginInfo();
  setTimeout(closeLoginInfo, 500);
});

function openLoginInfo() {
  // document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.b-form').forEach(function (form) {
      form.style.opacity = "0.01";
    });
    document.querySelectorAll('.box-form').forEach(function (form) {
      form.style.left = "-37%";
    });
    document.querySelectorAll('.box-info').forEach(function (form) {
      form.style.right = "-37%";
    });
  // });
}

function closeLoginInfo() {
  // document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.b-form').forEach(function (form) {
      form.style.opacity = "1";
    });
    document.querySelectorAll('.box-form').forEach(function (form) {
      form.style.left = "0px";
    });
    document.querySelectorAll('.box-info').forEach(function (form) {
      form.style.right = "-5px";
    });
  // });
}

window.addEventListener('resize', function () {
  closeLoginInfo();
});
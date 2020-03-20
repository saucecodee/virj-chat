const $ = n => document.querySelector(n);

function snack(text) {
  $('.snack-bar').style.display = "block";
  $('.snack-bar').textContent = text;

  const timed = setTimeout(() => $('.snack-bar').style.display = "none", 2000);
}


$('.create-village-button').onclick = e => {
  e.preventDefault();
  const val1 = $('.create-form')['username'].value.trim();
  const val2 = $('.create-form')['group-code'].value.trim();


  if (val1.length > 0 && val2.length > 0) {
    // Check for server responce
    if (true) {
      // navigate to that group
    }
    else {
      $('.failure-cont').style.display = "block";
    }
  }
  else {
    snack("Please fill the form")
  }
}
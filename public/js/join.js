const $ = n => document.querySelector(n);

function snack(text) {
  $('.snack-bar').style.display = "block";
  $('.snack-bar').textContent = text;

  const timed = setTimeout(() => $('.snack-bar').style.display = "none", 2000);
}

$('.create-village-button').onclick = e => {
  e.preventDefault();
  const val1 = $('.create-form')['username'].value.trim();
  const val2 = $('.create-form')['village-id'].value.trim();

  if (val1.length > 0 && val2.length > 0) {
    // Check for server responce
    $('.loader-cont').style.display = "block";

    let village_creation_status = $('#village-creation-status-control').checked;

    if (!village_creation_status){
      $('.failure-cont').style.display = "block";
      $('.loader-cont').style.display = "none";
    }
    else {
      $('.failure-cont').style.display = "none";
      "Navigate to the required village chat"
    }
  }
  else {
    snack("Please fill the form")
  }
}
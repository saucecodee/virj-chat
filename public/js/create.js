const $ = n => document.querySelector(n);

function snack(text){
  $('.snack-bar').style.display = "block";
  $('.snack-bar').textContent = text;

  const timed = setTimeout(()=> $('.snack-bar').style.display = "none", 2000);
}

$('.create-group-button').onclick = e => {
  e.preventDefault();
  const val = $('.create-form')['username'].value.trim();

  if (val.length > 0) {
    // Check for server responce
    if (true) {
      // dummy group id
      const groupID = "dihf4"
      $('.success-cont').style.display = "block";
      $('.group-id-cont').textContent = `Your group id is ${groupID}`;
    }
    else {
      $('.failure-cont').style.display = "block";
    }
  }
  else {
    snack("Please write a username")
  }
}
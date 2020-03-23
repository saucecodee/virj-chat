const $ = n => document.querySelector(n);

document.getElementById('joinVillage').addEventListener('click', joinGroup)

function snack(text) {
  $('.snack-bar').style.display = "block";
  $('.snack-bar').textContent = text;

  const timed = setTimeout(() => $('.snack-bar').style.display = "none", 2000);
}

$('.join-village-button').onclick = e => {
  e.preventDefault();
  const val1 = $('.create-form')['username'].value.trim();
  const val2 = $('.create-form')['village-id'].value.trim();

  if (val1.length > 0 && val2.length > 0) {
    // Check for server responce
    $('.loader-cont').style.display = "block";

    let village_creation_status = $('#village-creation-status-control').checked;

    if (!village_creation_status) {
      $('.failure-cont').style.display = "block";
      $('.loader-cont').style.display = "none";
    }
    else {
      $('.failure-cont').style.display = "none";
      "Navigate to the required village chat"
      $('.join-village-button').style.display = "none";
    }
  }
  else {
    snack("Please fill the form")
  }
}

function joinGroup(e) {
  e.preventDefault();

  let code = document.getElementById('villageId').value;

  let userName = document.getElementById('username').value;


  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({ "code": code, "username": userName });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://virj-chat.herokuapp.com/api/groups/join", requestOptions)
    .then(response => response.json())
    .then(result => {
      if(result.message == 'group joined'){
        window.location.href = 'chat.html';
      }
      console.log(result);
      // localStorage.setItem(data, result)
      $('.failure-cont').innerHTML = `<h3 id="success">${result.message}</h3>`;
      $('.failure-cont').style.display = "flex";
      $('.loader-cont').style.display = "none";

      console.log(result.message);
    })
    .catch(error => console.log('error', error));
}
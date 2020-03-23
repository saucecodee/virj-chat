const $ = n => document.querySelector(n);

function snack(text) {
  $('.snack-bar').style.display = "block";
  $('.snack-bar').textContent = text;

  const timed = setTimeout(() => $('.snack-bar').style.display = "none", 2000);
}

$('.create-village-button').onclick = e => {
  e.preventDefault();
  const val1 = $('.create-form')['username'].value.trim();
  const val2 = $('.create-form')['village-name'].value.trim();

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
      $('.create-village-button').style.display = "none";
    }
  }
  else {
    snack("Please fill the form")
  }
}

document.getElementById('createGroup').addEventListener('click', createGroup)

function createGroup(e) {
  e.preventDefault();

  let groupName = document.getElementById('VillageName').value;
  let userName = document.getElementById('username').value;

  var headers = new Headers()
  headers.append("Content-Type", "application/json");
  var raw = JSON.stringify({ groupName: groupName, username: userName });
  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: raw,
    redirect: 'follow'
  };

  let currentHost = window.location.host;

  fetch("https://virj-chat.herokuapp.com/api/groups", requestOptions)
    .then(response => response.json())
    .then(result => {
      if (result.data.code) {
        localStorage.setItem('data', JSON.stringify(result.data));
        window.location.href = 'chat.html';
        console.log(result.data.code);
        
      };
      $('.failure-cont').textContent = result.data.code + " is your tribal mark";
      console.log(result.data.code);

    })
    .catch(error => console.log('error', error));
}


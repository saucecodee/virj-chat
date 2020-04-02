const $ = n => document.querySelector(n);

function snack(text) {
  $('.snack-bar').style.display = "block";
  $('.snack-bar').textContent = text;

  const timed = setTimeout(() => $('.snack-bar').style.display = "none", 4000);
}

$('.create-village-button').onclick = e => {
  e.preventDefault();
  const userName = $('.create-form')['username'].value.trim();
  const villageName = $('.create-form')['village-name'].value.trim();

  if (userName.length > 0 && villageName.length > 0) {
    createGroup(userName, villageName)
  }
  else {
    snack("Don't be faster than your shadow, Please fill the form 😋")
  }
}


function createGroup(userName, villageName) {
  const headers = new Headers()
  headers.append("Content-Type", "application/json");
  const raw = JSON.stringify({ groupName: villageName, username: userName });
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: raw,
    redirect: 'follow'
  };

  let currentHost = window.location.host;
  $('.loader-cont').style.display = "block";
  $('.create-village-button').style.display = "none";

  fetch("https://virj-chat.herokuapp.com/api/groups", requestOptions)
    .then(response => response.json())
    .then(result => {
      if (result.success == true) {
        localStorage.setItem('data', JSON.stringify(result.data));
        window.location.href = 'chat.html';
      } else {
        $('.failure-cont').textContent = result.data.code + " is your tribal mark";
        $('.loader-cont').style.display = "none";
        $('.create-village-button').style.display = "block";
      }
    })
    .catch(error => {
      console.log('error', error);
      $('.failure-cont').textContent = result.data.code + " is your tribal mark";
      $('.loader-cont').style.display = "none";
      $('.create-village-button').style.display = "block";
    });
}


const $ = n => document.querySelector(n);

document.getElementById('joinVillage').addEventListener('click', joinGroup)

function snack(text) {
  $('.snack-bar').style.display = "block";
  $('.snack-bar').textContent = text;

  const timed = setTimeout(() => $('.snack-bar').style.display = "none", 2000);
}

$('.join-village-button').onclick = e => {
  e.preventDefault();
  const code = $('.create-form')['village-id'].value.trim();
  const userName = $('.create-form')['username'].value.trim();

  if (code.length > 0 && userName.length > 0) {
    $('.loader-cont').style.display = "block";
    $('.join-village-button').style.display = "none";
    joinGroup(code, userName);
  }
  else {
    snack("Please fill the form")
  }
}

function joinGroup(code, userName) {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({ "code": code, "username": userName });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://virj-chat.herokuapp.com/api/groups/join", requestOptions)
    .then(response => response.json())
    .then(result => {
      if(result.success == true){
        localStorage.setItem('data', JSON.stringify(result.data));
        window.location.href = 'chat.html';
      }
      console.log(result);
      $('.join-village-button').style.display = "block";
      $('.failure-cont').innerHTML = `<h3 class="failure-message">${result.message}</h3>`;
      $('.failure-cont').style.display = "flex";
      $('.loader-cont').style.display = "none";
    })
    .catch(error => console.log('error', error));
}
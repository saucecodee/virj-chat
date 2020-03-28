const modal = document.querySelector("#village-modal-wrapper");
const memberContainer = $('#listContainer');

function showVillagers() {
  modal.style.display = "block";
  getMembers()
}

function closeVillageModal() {
  modal.style.display = "none";
}

window.onclick = () => {
  if (event.target == modal) {
    this.closeVillageModal();
  }
}

function getMembers() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(`https://virj-chat.herokuapp.com/api/groups/${app.data.groupId}/members`, requestOptions)
    .then(response => response.text())
    .then(result => {
      let output = ``;
      JSON.parse(result).data.forEach(data => {
        output += `<p>${data.username}</p>`
      })

      memberContainer.innerHTML = output;

    })
    .catch(error => console.log('error', error));
}
const modal = document.querySelector("#village-modal-wrapper");

function showVillagers() {
  modal.style.display = "block";
}

function closeVillageModal() {
  modal.style.display = "none";
}

window.onclick = () => {
  if (event.target == modal) {
    this.closeVillageModal();
  }
}

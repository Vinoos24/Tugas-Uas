function backupData() {
    const backupText = document.getElementById('backupData').value;
    if (backupText.trim() === '') {
        alert("Data backup tidak boleh kosong!");
        return;
    }
    // Simulasikan proses backup
    alert("Data backup berhasil!");
}

function restoreData() {
    const restoreText = document.getElementById('restoreData').value;
    if (restoreText.trim() === '') {
        alert("Data pemulihan tidak boleh kosong!");
        return;
    }
    // Simulasikan proses pemulihan
    alert("Data berhasil dipulihkan!");
}

function printPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const backupText = document.getElementById('backupData').value;
    const restoreText = document.getElementById('restoreData').value;

    doc.text("Backup dan Pemulihan Data", 10, 10);
    doc.text("Data Backup:", 10, 20);
    doc.text(backupText || "Tidak ada data backup.", 10, 30);
    doc.text("Data Pemulihan:", 10, 40);
    doc.text(restoreText || "Tidak ada data pemulihan.", 10, 50);

    doc.save("backup_pemulihan_data.pdf");
}


// batas
// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};
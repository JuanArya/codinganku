// Mendefinisikan array untuk menyimpan data dari tabel
var data = [];

// Membuat fungsi untuk menyimpan data ke localStorage
function simpanData() {
    
   // Mengubah array menjadi string JSON
   var dataJSON = JSON.stringify(data);

   // Menyimpan string JSON ke localStorage dengan kunci "data"
   localStorage.setItem("data", dataJSON);
}

// Membuat fungsi untuk memuat data dari localStorage
function muatData() {
    
   // Mengambil string JSON dari localStorage dengan kunci "data"
   var dataJSON = localStorage.getItem("data");

   // Mengubah string JSON menjadi array
   data = JSON.parse(dataJSON);

   // Jika data tidak ada atau kosong, maka membuat array kosong
   if (!data) {
       data = [];
   }
}

// Membuat fungsi untuk menampilkan data dari array ke tabel
function tampilkanData() {
    
   // Mengambil elemen tabel
   var tabel = document.getElementById("tabelData");

   // Menghapus semua baris dari tabel, kecuali baris pertama (header)
   while (tabel.rows.length > 1) {
       tabel.deleteRow(1);
   }

   // Melakukan iterasi pada setiap elemen array
   for (var i = 0; i < data.length; i++) {
       // Mendapatkan nilai nama, jumlah, dan harga dari setiap elemen
       var nama = data[i].nama;
       var jumlah = data[i].jumlah;
       var harga = data[i].harga;

       // Membuat elemen baru untuk baris tabel
       var tr = document.createElement("tr");

       // Membuat elemen baru untuk sel tabel
       var tdNama = document.createElement("td");
       var tdJumlah = document.createElement("td");
       var tdHarga = document.createElement("td");
       var tdAksi = document.createElement("td");

       // Membuat elemen baru untuk button hapus
       var button = document.createElement("button");
       button.innerText = "Hapus";
       button.onclick = function() {
           hapusData(this);
       };

       // Menambahkan teks ke sel tabel
       tdNama.innerText = nama;
       tdJumlah.innerText = jumlah;
       tdHarga.innerText = harga;

       // Menambahkan button ke sel aksi
       tdAksi.appendChild(button);

       // Menambahkan sel ke baris tabel
       tr.appendChild(tdNama);
       tr.appendChild(tdJumlah);
       tr.appendChild(tdHarga);
       tr.appendChild(tdAksi);

       // Menambahkan baris ke tabel
       tabel.appendChild(tr);
   }

   // Memperbarui total harga
   tampilkanTotalHarga();
}

// Membuat fungsi untuk menambahkan data baru ke array dan tabel
function tambahData() {
    
   // Mendapatkan nilai input dari form
   var nama = document.getElementById("nama-barang").value;
   var jumlah = parseInt(document.getElementById("jumlah-barang").value);
   var harga = parseInt(document.getElementById("harga-barang").value);

   // Menambahkan data baru ke array
   data.push({nama: nama, jumlah: jumlah, harga: harga});

   // Menyimpan data ke localStorage
   simpanData();

   // Menampilkan data ke tabel
   tampilkanData();

   // Mengosongkan input form
   document.getElementById("nama-barang").value = "";
   document.getElementById("jumlah-barang").value = "";
   document.getElementById("harga-barang").value = "";
}

// Membuat fungsi untuk menghapus data dari array dan tabel
function hapusData(button) {
    
   // Mendapatkan indeks baris yang akan dihapus
   var row = button.parentNode.parentNode;
   var index = row.rowIndex - 1;

   // Menghapus data dari array
   data.splice(index, 1);

   // Menyimpan data ke localStorage
   simpanData();

   // Menampilkan data ke tabel
   tampilkanData();
}

// Membuat fungsi untuk menghitung total harga dari semua barang yang dipesan
function hitungTotalHarga() {
    
   // Mendefinisikan variabel untuk menyimpan total harga
   var total = 0;

   // Melakukan iterasi pada setiap elemen array
   for (var i = 0; i < data.length; i++) {
       // Menghitung total harga dari setiap barang
       var subtotal = data[i].jumlah * data[i].harga;

       // Menambahkan subtotal ke total
       total += subtotal;
   }

   // Mengembalikan nilai total
   return total;
}

// Membuat fungsi untuk menampilkan total harga dalam bentuk teks
function tampilkanTotalHarga() {
    
   // Mendapatkan elemen total harga
   var p = document.getElementById("total-harga");

   // Menampilkan total harga dari semua barang yang dipesan
   p.innerText = hitungTotalHarga();
}

// Memanggil fungsi untuk memuat data dari localStorage saat pertama kali membuka halaman
muatData();

// Memanggil fungsi untuk menampilkan data ke tabel saat pertama kali membuka halaman
tampilkanData();

// Membuat fungsi untuk menambahkan data baru ke array dan tabel
function tambahData() {
}
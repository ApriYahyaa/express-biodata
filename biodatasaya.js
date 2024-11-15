const express = require('express');
const app = express(); // disini kita akan menggunakan library express
const PORT = 9000; // 9000 adalah port server 

const { logger } = require('./biodataKu/log.middlewareku.js'); // code untuk mengetes di terminal


app.use(express.json());  //middleware untuk penerimaan json dari express
app.use(logger);


app.listen(PORT, 'localhost', () => { // output untuk server ketika berhasil dijalankan
    console.log(`Server Kamu Berhasil Untuk dijalankan!`) ;
});

// representasi atau isi dari database biodata saya, yang saya gunakan
let biodata = [
        {id: 1, name: "Muhammad Apri Yahya"},
        {id: 2, age: "17"},
        {id: 3, my_address: "Mutiara Gading Timur"},
        {id: 4, social_media: "@apriyhya"},
        {id: 5, telephone: "+6282112677557"},
];

// Membagikan respon kepada user ketika request berhasil diterima
app.get('/biodata', (request, response) => {
    response.status(200).json(biodata); // mjawaban untuk json
});

// memberikan respon (ada kondisi berhasil dan gagal)
app.get('/biodata/:id', (request, response) => {
    const biodataku = biodata.find(data => data.id === parseInt(request.params.id));

    if(biodataku) {
        response.json(biodataku); //  memberikan jawaban ketika berhasil diupdate 
    }else{
        response.status(400).json({ // tetapi jika gagal, akan:
            pesan: "Error! Biodata Kamu Tidak Ditemukan."
        });
    }
});

// Membuat biodata yang baru
app.post('/biodata', (request, response) => {
    const biodataBaru = {
        id: biodata.length + 1, 
        ...request.body,
    };

    biodata.push(biodataBaru); // menambahkan biodata baru ke dalam biodataku yang tadi
    response.status(201).json(biodataBaru); // memberikan jawaban ketika berhasil diupdate
});

// mengupdate atau menambahkan biodata yang sebelumnya sudah ada
app.put('/biodata/:id', (request, response) => {
    const biodataku = biodata.find(
    data => data.id === parseInt(request.params.id));
    
    if(biodataku) {
        biodataku.name = request.body.name; // meminta isi nama
        biodataku.age = request.body.age; // meminta umur
        biodataku.my_address = request.body.my_address; // meminta alamat
        biodataku.social_media = request.body.social_media; // meminta nama sosial medianya
        biodataku.telephone = request.body.telephone; // meminta nomor telepon
    
        response.json(biodataku); // memberikan jawaban ketika berhasil diupdate 

    }else{
        response.status(404).json({ // jika gagal, akan :
            pesan: "Error! Biodatamu tidak ditemukan."
            });
    }
});

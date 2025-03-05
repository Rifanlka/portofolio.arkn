// Toggle Menu
let menuIcon = document.querySelector('.menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-menu-alt-right');
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Tutup navbar saat menu diklik (mobile)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        menuIcon.classList.add('bx-menu-alt-right');
        navbar.classList.remove('active');
    });
});

// Scrollspy (Highlight menu saat scroll)
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });
};

// Smooth Scrolling saat klik menu
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const id = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(id);

        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
    });
});

// Scrollspy saat halaman dimuat ulang
window.addEventListener('load', () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });
});

// Form Submission ke Google Sheets + Validasi Nomor Telepon
document.addEventListener("DOMContentLoaded", function () {
    const form = document.forms["submit-to-google-sheet"];
    const successMessage = document.createElement("p");
    successMessage.style.color = "green";
    successMessage.style.marginTop = "10px";
    form.appendChild(successMessage);

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Mencegah reload halaman

        const phoneInput = form["nomor"].value.trim();

        // Validasi panjang nomor (minimal 10 angka)
        if (!/^\d{10,}$/.test(phoneInput)) {
            alert("Nomor telepon harus minimal 10 angka!");
            return; // Jangan lanjutkan jika nomor tidak valid
        }

        const formData = new FormData(form);

        fetch("https://script.google.com/macros/s/AKfycbyOcMIg0ohlm_vrsOY-RoUKMKUs2ox0bHLhefhPyVWK-VHMMAHbqerhJU8f53LNSMD6/exec", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            console.log("Success:", data);
            
            // Kosongkan form setelah sukses
            form.reset();

            // Tampilkan pesan berhasil
            successMessage.textContent = "Pesan telah terkirim!";
            
            // Hapus pesan setelah 3 detik
            setTimeout(() => {
                successMessage.textContent = "";
            }, 3000);
        })
        .catch(error => {
            console.error("Error:", error);
            successMessage.textContent = "Terjadi kesalahan, coba lagi.";
            successMessage.style.color = "red";

            setTimeout(() => {
                successMessage.textContent = "";
            }, 3000);
        });
    });
});



// function handleCredentialResponse(response) {
//     // Decode token dari Google
//     const data = JSON.parse(atob(response.credential.split('.')[1]));
    
//     // Masukkan email ke dalam input form
//     document.querySelector('input[name="email"]').value = data.email;
// }
const form = document.getElementById("film-form");
const titleElement = document.getElementById("title");
const directorElement = document.getElementById("director");
const urlElement = document.getElementById("url");
const cardbody = document.querySelectorAll(".card-body");

//UI Objesini Başlatma
const ui = new UI();
// storage objesi üretme
const storage = new Storage;
// Tüm Eventleri yükleme

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    });
    
    cardbody.forEach(function(card) {
        card.addEventListener("click", deleteFilm);
    });
    // Tüm filmleri temizleme butonu için olay dinleyici
    document.getElementById("clear-films").addEventListener("click", clearAllFilms);
}
function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if(title === "" || director === "" || url === ""){
        //hata
        ui.displayMessages("Tüm alanları doldurunuz...","danger")
    }
    else{
        // yeni film
        const newFilm = new Film(title,director,url);

        ui.addFilmToUI(newFilm); //arayüze film ekleme
        storage.addFilmToStorage(newFilm); //Storage'a film ekleme
        ui.displayMessages("Film başarıyla eklendi...","success")
        

    }
    ui.clearInputs(titleElement,directorElement,urlElement); //film eklendikten sonra textboxları silme
    e.preventDefault();
}

function deleteFilm(e){
    if(e.target.id === "delete-film"){
        ui.deleteFilmFromUI(e.target); // UI'dan silme
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent); // Storage'dan silme
        ui.displayMessages("Film başarıyla silindi...", "success");
    }
}
function clearAllFilms(){
    if(confirm("Emin misiniz ?")){
        // UI'dan tüm filmleri kaldır
    ui.clearAllFilmsFromUI();
    
    // Storage'dan tüm filmleri kaldır
    storage.clearAllFilmsFromStorage();
    
    ui.displayMessages("Tüm filmler başarıyla temizlendi...", "success");
    }
    else{
        
    }
    
}
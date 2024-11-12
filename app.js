var session = pl.create();

const facts = "\n\
auto('Dacia Logan'). \n\
auto('BMW X1'). \n\
auto('Skoda Fabia').\n \
\n \
emisja_spalin('Dacia Logan', niska).\n \
emisja_spalin('BMW X1', wysoka).\n \
emisja_spalin('Skoda Fabia', niska).\n \
\n \
paliwo('Dacia Logan', benzyna).\n \
paliwo('BMW X1', benzyna).\n \
paliwo('Skoda Fabia', benzyna).\n \
\n \
ilosc_miejsc('Dacia Logan', 2).\n \
ilosc_miejsc('BMW X1', 5).\n \
ilosc_miejsc('Skoda Fabia', 5).\n \
\n \
cena('Dacia Logan', 50000).\n \
cena('BMW X1', 200000).\n \
cena('Skoda Fabia', 70000).\n \
\n \
ekologiczne(Nazwa, Paliwo, Miejsca, MaxCena) :- paliwo(Nazwa, Paliwo), emisja_spalin(Nazwa, niska), ilosc_miejsc(Nazwa, Miejsca), cena(Nazwa, CenaAuta), CenaAuta =< MaxCena.\n \
\n \
rodzinne(Nazwa, Paliwo, MaxCena, Spaliny) :- paliwo(Nazwa, Paliwo), cena(Nazwa, CenaAuta), CenaAuta =< MaxCena, emisja_spalin(Nazwa, Spaliny).\n \
\n \
auto_z_przedzialu(Nazwa, MaxCena, MinCena, Paliwo) :- paliwo(Nazwa, Paliwo), cena(Nazwa, CenaAuta), CenaAuta =< MaxCena, cena(Nazwa, CenaAuta), CenaAuta >= MinCena.\n \
";
console.log(facts);

session.consult(facts);

document.getElementById('eco').addEventListener('click', function(){
var a = document.getElementById('wybor_paliwa1').value;
var b = document.getElementById('miejsca1').value;
var c = document.getElementById('max_cena1').value;
var q1 = 'ekologiczne(Nazwa, ' + a +', ' + b + ', ' + c +').';
session.query(q1);
session.answer(function(answer){
    var finalA = session.format_answer(answer).replace('Nazwa =', '');
    if(finalA != 'false'){
        var myModal = document.getElementById('exampleModal')
        var myInput = document.getElementById('eco')
        myModal.addEventListener('shown.bs.modal', function () {
        myInput.focus()
})
    }
    else{
        alert(finalA);
    }
});
}, false);

document.getElementById('family').addEventListener('click', function(){
var aa = document.getElementById('wybor_paliwa2').value;
var bb = document.getElementById('max_cena2').value;
var cc = document.getElementById('wybor_emisji1').value;
var q1 = 'rodzinne(Nazwa, ' + aa +', ' + bb + ', ' + cc +').';
session.query(q1);
session.answer(function(answer){
    var finalA = session.format_answer(answer).replace('Nazwa =', '');
    if(finalA != 'false'){
        document.getElementById('respond2').innerHTML = '\
        <div data-bs-toggle="modal" data-bs-target="#exampleModal"></div>\
        <div class="exampleModal" tabindex="-1">\
            <div class="modal-dialog">\
                <div class="modal-content">\
                    <div class="modal-header">\
                        <h5 class="modal-title">Modal title</h5>\
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>\
                    </div>\
                    <div class="modal-body">\
                        <p>'+ finalA+'</p>\
                    </div>\
                    <div class="modal-footer">\
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>\
                        <button type="button" class="btn btn-primary">Save changes</button>\
                    </div>\
                </div>\
            </div>\
        </div>';
    }
    else{
        document.getElementById('respond2').innerHTML = '\
        <div data-bs-toggle="modal" data-bs-target="#exampleModal"></div>\
        <div class="exampleModal" tabindex="-1">\
            <div class="modal-dialog">\
                <div class="modal-content">\
                    <div class="modal-header">\
                        <h5 class="modal-title">Modal title</h5>\
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>\
                    </div>\
                    <div class="modal-body">\
                        <p>'+ finalA+'</p>\
                    </div>\
                    <div class="modal-footer">\
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>\
                        <button type="button" class="btn btn-primary">Save changes</button>\
                    </div>\
                </div>\
            </div>\
        </div>';
    }
});
}, false);

document.getElementById('price_pool').addEventListener('click', function(){
var aaa = document.getElementById('max_cena3').value;
var bbb = document.getElementById('min_cena1').value;
var ccc = document.getElementById('wybor_paliwa3').value;
var q1 = 'auto_z_przedzialu(Nazwa, ' + aaa +', ' + bbb + ', ' + ccc +').';
session.query(q1);
session.answer(function(answer){
    var finalA = session.format_answer(answer).replace('Nazwa =', '');
    if(finalA != 'false'){
        alert(finalA);
    }
    else{
        alert("Brak aut spełniających kryteria");
    }
});
}, false);



/*
<div class="modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
*/
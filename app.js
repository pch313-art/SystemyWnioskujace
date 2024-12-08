var session = pl.create(1000);

const facts = "\n\
auto('Dacia Logan'). \n \
auto('BMW X1'). \n \
auto('Skoda Fabia').\n \
auto('Audi A3').\n \
auto('Audi A4').\n \
auto('Chevrolet Spark').\n \
auto('Citroen C3').\n \
auto('Fiat 500').\n \
auto('Hyundai i30').\n \
auto('Honda Accord').\n \
auto('Nissan Note').\n \
auto('Seat Ibiza').\n \
auto('Suzuki Ignis').\n \
auto('Toyota Yaris').\n \
auto('Volvo S40').\n \
\n \
emisja_spalin('Dacia Logan', niska).\n \
emisja_spalin('BMW X1', wysoka).\n \
emisja_spalin('Skoda Fabia', niska).\n \
emisja_spalin('Audi A3', srednia).\n \
emisja_spalin('Audi A4', wysoka).\n \
emisja_spalin('Chevrolet Spark', niska).\n \
emisja_spalin('Citroen C3', niska).\n \
emisja_spalin('Fiat 500', srednia).\n \
emisja_spalin('Hyundai i30', srednia).\n \
emisja_spalin('Honda Accord', wysoka).\n \
emisja_spalin('Nissan Note', srednia).\n \
emisja_spalin('Seat Ibiza', niska).\n \
emisja_spalin('Suzuki Ignis', niska).\n \
emisja_spalin('Toyota Yaris', niska).\n \
emisja_spalin('Volvo S40', wysoka).\n \
\n \
paliwo('Dacia Logan', benzyna).\n \
paliwo('BMW X1', benzyna).\n \
paliwo('Skoda Fabia', benzyna).\n \
paliwo('Audi A3', benzyna).\n \
paliwo('Audi A4', diesel).\n \
paliwo('Chevrolet Spark', benzyna).\n \
paliwo('Citroen C3', ev).\n \
paliwo('Fiat 500', benzyna).\n \
paliwo('Hyundai i30', diesel).\n \
paliwo('Honda Accord', diesel).\n \
paliwo('Nissan Note', benzyna).\n \
paliwo('Seat Ibiza', ev).\n \
paliwo('Suzuki Ignis', ev_benz).\n \
paliwo('Toyota Yaris', ev_benz).\n \
paliwo('Volvo S40', diesel).\n \
\n \
ilosc_miejsc('Dacia Logan', 2).\n \
ilosc_miejsc('BMW X1', 5).\n \
ilosc_miejsc('Skoda Fabia', 5).\n \
ilosc_miejsc('Audi A3', 5).\n \
ilosc_miejsc('Audi A4', 5).\n \
ilosc_miejsc('Chevrolet Spark', 4).\n \
ilosc_miejsc('Citroen C3', 4).\n \
ilosc_miejsc('Fiat 500', 4).\n \
ilosc_miejsc('Hyundai i30', 5).\n \
ilosc_miejsc('Honda Accord', 5).\n \
ilosc_miejsc('Nissan Note', 5).\n \
ilosc_miejsc('Seat Ibiza', 5).\n \
ilosc_miejsc('Suzuki Ignis', 5).\n \
ilosc_miejsc('Toyota Yaris', 5).\n \
ilosc_miejsc('Volvo S40', 5).\n \
\n \
cena('Dacia Logan', 50000).\n \
cena('BMW X1', 200000).\n \
cena('Skoda Fabia', 70000).\n \
cena('Audi A3', 130000).\n \
cena('Audi A4', 150000).\n \
cena('Chevrolet Spark', 30000).\n \
cena('Citroen C3', 40000).\n \
cena('Fiat 500', 50000).\n \
cena('Hyundai i30', 110000).\n \
cena('Honda Accord', 120000).\n \
cena('Nissan Note', 90000).\n \
cena('Seat Ibiza', 75000).\n \
cena('Suzuki Ignis', 70000).\n \
cena('Toyota Yaris', 110000).\n \
cena('Volvo S40', 40000).\n \
\n \
ekologiczne(Nazwa, Paliwo, Miejsca, MaxCena) :- paliwo(Nazwa, Paliwo), emisja_spalin(Nazwa, niska), ilosc_miejsc(Nazwa, Miejsca), cena(Nazwa, CenaAuta), CenaAuta =< MaxCena.\n \
\n \
rodzinne(Nazwa, Paliwo, MaxCena, Spaliny) :- paliwo(Nazwa, Paliwo), cena(Nazwa, CenaAuta), CenaAuta =< MaxCena, emisja_spalin(Nazwa, Spaliny), ilosc_miejsc(Nazwa, Liczba), Liczba>2.\n \
\n \
auto_z_przedzialu(Nazwa, MaxCena, MinCena, Paliwo) :- paliwo(Nazwa, Paliwo), cena(Nazwa, CenaAuta), CenaAuta =< MaxCena, cena(Nazwa, CenaAuta), CenaAuta >= MinCena.\n \
";

session.consult(facts);
//Dodanie akcji po kliknięciu przycisku na pierwszym formularzu
document.getElementById('eco').addEventListener('click', function(){
    document.getElementById("responseModal").innerHTML = '';
    var paliwo1 = document.getElementById('wybor_paliwa1').value;
    var miejsca1 = document.getElementById('miejsca1').value;
    var maxCena1 = document.getElementById('max_cena1').value;
    var qEkologiczne = 'ekologiczne(Nazwa, ' + paliwo1 +', ' + miejsca1 + ', ' + maxCena1 +').';
    session.query(qEkologiczne);
    session.answers(ekologiczne(), 1000);
    function ekologiczne() {
        // Zainicjowanie zmiennej do odpowiedzi
        var result = document.getElementById("responseModal");
        // Weryfikacja odpowiedzi
        return function(answer) {
                //Weryfikacja odpowiedzi, czy posiada wartość przypisaną do zmiennej
                if(pl.type.is_substitution(answer)) {
                //Usunięcie nazwy zmiennej z odpowiedzi
                var car = answer.lookup("Nazwa");
                //Dodanie odpowiedzi jako kolejnego znacznika HTML
                result.innerHTML += "<div>" + car +"</div>";
                }
                else{
                    //Każdorazowe zwrócenie false powoduje wejście w alternatywę. Należy sprawdzić, czy zostały zwrócone jakieś odpowiedzi
                    if(result.innerHTML != ""){
                        result.innerHTML += "";
                    }
                    else{
                        //Odpowiedź, jeśli nie zwrócono odpowiedzi
                        result.innerHTML += "<div>Brak aut spełniających kryteria</div>";
                    }
                    
                }
     
        };
    };
//Wyświetlenie modala z wykorzystaniem metody Bootstrapa
var myModal = new bootstrap.Modal(document.getElementById('myModal'));

myModal.show();
}, false);
//Dodanie akcji po kliknięciu przycisku na drugim formularzu
document.getElementById('family').addEventListener('click', function(){
    document.getElementById("responseModal").innerHTML = '';
    var paliwo2 = document.getElementById('wybor_paliwa2').value;
    var maxCena2 = document.getElementById('max_cena2').value;
    var emisja = document.getElementById('wybor_emisji1').value;
    var qRodzinne = 'rodzinne(Nazwa, ' + paliwo2 +', ' + maxCena2 + ', ' + emisja +').';
    session.query(qRodzinne);
    session.answers(rodzinne(), 1000);
    function rodzinne() {
        // Zainicjowanie zmiennej do odpowiedzi
        var result = document.getElementById("responseModal");
        // Weryfikacja odpowiedzi
        return function(answer) {
                //Weryfikacja odpowiedzi, czy posiada wartość przypisaną do zmiennej
                if(pl.type.is_substitution(answer)) {
                //Usunięcie nazwy zmiennej z odpowiedzi
                var car = answer.lookup("Nazwa");
                //Dodanie odpowiedzi jako kolejnego znacznika HTML
                result.innerHTML += "<div>" + car +"</div>";
                }
                else{
                    //Każdorazowe zwrócenie false powoduje wejście w alternatywę. Należy sprawdzić, czy zostały zwrócone jakieś odpowiedzi
                    if(result.innerHTML != ""){
                        result.innerHTML += "";
                    }
                    else{
                        //Odpowiedź, jeśli nie zwrócono odpowiedzi
                        result.innerHTML += "<div>Brak aut spełniających kryteria</div>";
                    }
                    
                }
     
        };
    };
//Wyświetlenie modala z wykorzystaniem metody Bootstrapa
var myModal = new bootstrap.Modal(document.getElementById('myModal'));

        myModal.show();
}, false);
//Dodanie akcji po kliknięciu przycisku na trzecim formularzu
document.getElementById('price_pool').addEventListener('click', function(){
document.getElementById("responseModal").innerHTML = '';
var maxCena3 = document.getElementById('max_cena3').value;
var minCena1 = document.getElementById('min_cena1').value;
var paliwo3 = document.getElementById('wybor_paliwa3').value;
var qPrzedzial = 'auto_z_przedzialu(Nazwa, ' + maxCena3 +', ' + minCena1 + ', ' + paliwo3 +').';
session.query(qPrzedzial);
session.answers(przedzial(), 1000);
//Metoda wyszukująca odpowiedzi
function przedzial() {
	// Zainicjowanie zmiennej do odpowiedzi
	var result = document.getElementById("responseModal");
	// Weryfikacja odpowiedzi
	return function(answer) {
            //Weryfikacja odpowiedzi, czy posiada wartość przypisaną do zmiennej
            if(pl.type.is_substitution(answer)) {
			//Usunięcie nazwy zmiennej z odpowiedzi
            var car = answer.lookup("Nazwa");
            //Dodanie odpowiedzi jako kolejnego znacznika HTML
			result.innerHTML += "<div>" + car +"</div>";
		    }
            else{
                //Każdorazowe zwrócenie false powoduje wejście w alternatywę. Należy sprawdzić, czy zostały zwrócone jakieś odpowiedzi
                if(result.innerHTML != ""){
                    result.innerHTML += "";
                }
                else{
                    //Odpowiedź, jeśli nie zwrócono odpowiedzi
                    result.innerHTML += "<div>Brak aut spełniających kryteria</div>";
                }
                
            }
 
	};
};
//Wyświetlenie modala z wykorzystaniem metody Bootstrapa
var myModal = new bootstrap.Modal(document.getElementById('myModal'));

        myModal.show();
        
}, false);

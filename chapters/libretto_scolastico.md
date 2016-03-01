# Libretto scolastico

La seconda applicazione tiene traccia dei voti di scuola

### Screenschot
[](TODO: Aggiungere screenshot)

## Specifiche

La pagina permette di inserire un nuovo voto, consultare quelli vecchi.

È possibile aggiungere un voto tramite il form

##Info
Difficoltà: 1.  
Tempo di sviluppo: 15 minuti.  
Tecnologie e API utilizzate:
* HTML Form
* LocalStorage

## Carta d'identità
Per poter installare una app abbiamo bisogno di un manifest con le indicazioni necessarie per il sistema. Questo manifest è molto semplice e incompleto.

```js
{
  "name": "Libretto Scolastico",
  "description": "a school marks keeper",
  "launch_path": "/index.html"
}
```

## La struttura

La struttura dell'applicazione è contenuta nel file ```index.html```, usando i tag HTML inseriamo i contenuti di cui hai bisogno.

```html
<html>
  <head>
    <title>Libretto scolastico</title>
  </head>
  <body>
    <form id="form">
        <label for="subject_name">Materia</label>
        <input id="subject_name" name="materia" type="text">
        
        <label for="subject_mark">Voto</label>
        <input id="subject_mark" name="voto" type="number" value="6">

        <label for="subject_date">Data</label>
        <input id="subject_date" type="date">
        <button id="today_button">Today</type>

        <input type="submit" value="Salva">
    </form>
    <script src="app.js"></script>
  </body>
</html>
```
In questo esempio c'è un modulo da riempire, per creare il modulo abbiamo usato il **tag** `form` e ogni informazione da inserire è rappresentata con un tag `input` ed è descritta da un tag `label`.

È molto importante inserire le etichette perché aiutano chi non può interagire con il pc in modo convenzionale.

Una volta riempito il modulo basta premere il pulsante **Salva**  perché venga salvato il voto. Il pulsante salva è sempre un tag `input` dentro il form, di nuovo, questo è molto importante per l'accessibilità.

Per gestire il salvataggio è la visione dei voti inseriamo il tag `script` a fine pagina e diciamo che vogliamo che vengano eseguite le istruzioni nel file `app.js`

## La logica dell'applicazione

Passiamo al comportamento dell'app che troviamo nel file `app.js`.

Anche in questo caso spieghiamo come reagire ad un evento che coinvolge la nostra interfaccia.

```js
for.addEventListener("submit", addVoto)
```

Quando viene premuto il pulsante **Salva** il form viene inviato (`submit`) ad un indirizzo preciso su internet. Noi però non l'abbiamo specificato perché intercettiamo questo evento e fermiamo l'invio per accedere ai dati.

```js
function addVoto (event) {
        /* non spedire i dati su internet */
        event.preventDefault();
        /* senza questa istruzione la pagina viene caricata di nuovo */
        event.stopPropagation();

        /* vogliamo salvare i valori quindi dobbiamo 
        *andare a prenderli da dove sono stati inseriti */
        var mat = (document.querySelector("input[name=materia]")).value;
        var vot = (document.querySelector("input[name=voto]")).value;
        var dat = (document.querySelector("input[name=data]")).value;}

        /* adesso abbiamo dato dei nomi a questi valori
        * esempio:
        * mat => "Matematica"
        * vot => 10
        * dat => qualcosa che rappresenta una data per il computer */
        
        /* per salvare i dati sul telefono è utile pensare a
        * qualcosa che li leghi assieme
        * Voto è una scatola magica che tiene questi tre dati assieme */
        var myvoto = new Voto(mat, vot, dat);
        
        /* una volta che abbiamo il contenitore con le informazioni 
        * giuste possiamo salvarle nel telefono */
        my.addVoto(myvoto);
        
```

il resto del file è usato per definire le due scatole magiche che creano la lista dei voti e la scatola per tenere i voti.

Per definire un oggetto che mantenga nella memoria temporanea il voto ci serve qualcosa che abbia 3 attributi; la **materia**, il **voto** e la **data**.

Per creare un oggetto del genere scriviamo questo codice

```js
function Voto(materia, voto, data){
  /* L'oggetto Voto ha un attributo materia associato */
  this.materia =  materia;
  /* L'oggetto Voto ha un attributo voto associato */
  this.voto =  voto;
  /* L'oggetto Voto ha un attributo data associato */
  this.data = new Date(data);
}
```

Se vogliamo creare un oggetto Voto con gli attributi **materia**, **voto** e **data** scriviamo

```js
var a = new Voto("matematica", 10, Date.now());
```

In questo modo abbiamo creato l'oggetto e l'abbiamo associato alla variabile `a`

Purtroppo avere solo `Voto` a disposizione rende la memoria temporanea, appena chiusa la pagina i voti registrati sono persi per sempe. Per rimediare creiamo un oggetto che mantenga una lista di voti e possa essere salvato in memoria in modo da poter accedere ai voti registrati anche in futuro.

```js
function Libretto(){
  /* Campi */
  this.list = [];

  /* Metodi */
  this.addVoto = function(newVoto){
    /* prende l'attributo lista e aggiunge in fondo alla lista il nuovo voto */
    this.list.push(newVoto);
    /* salviamo la lista nella memoria a lungo termine */
    this.save();
    /* aggiunge alla nella pagina il nuovo voto */
    this.renderVoto(newVoto);
  }

  this.save = function(){
    /* localstorage  è la memoria a lungo termine del browser, settare la chiave **voti**
     * al valore di this.list permette di ritrovare i valori usando la chiave **voti**.
     * Perché usiamo `JSON.stringify(this.list)` invece di `this.list`? Perché localstorage
     * può memorizzare solo stringhe e quindi dobbiamo usare una trasformazione (stringify)
     * per ottenere una stringa invece che l'oggetto lista
     */
    localStorage.setItem("voti", JSON.stringify(this.list));
  }

  this.renderVoto = function(voto){
    /* crea un nuovo pezzo della pagina */
    var contenitore = document.createElement("li");
    /* scrive all'interno di questo contenitore la presentazione dei dati */
    contenitore.innerHTML = "Il " + new Date(voto.data).toDateString() + " ho preso " + voto.voto + " in " + voto.materia;
    /* aggiunge alla lista della pagina il nuovo elemento */
    librettoWrapper.appendChild(contenitore);
  }

  if(localStorage.getItem("voti")){
    /* se localStorage ha già in memoria la chiave **voti** assegna il contenuto di localStorage all'attributo this.list*/
    this.list = JSON.parse(localStorage.getItem("voti"));
    /* per ogni voto nella lista crea il contenitore e mostralo sulla pagina */
    for(index in this.list){
      this.renderVoto(this.list[index])
    }
  }
}
```
[](TODO:Aggiungere il localStorage) 

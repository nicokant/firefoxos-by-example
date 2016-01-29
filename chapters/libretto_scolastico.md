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

```
{
  "name": "Libretto Scolastico",
  "description": "a school marks keeper",
  "launch_path": "/index.html"
}
```

## La struttura

La struttura dell'applicazione è contenuta nel file ```index.html```, usando i tag HTML inseriamo i contenuti di cui hai bisogno.

```
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

Passiamo al comportamento dell'app che troviamo nel file `app.js'.

Anche in questo caso spieghiamo come reagire ad un evento che coinvolge la nostra interfaccia.

```
for.addEventListener("submit", addVoto)
```

Quando viene premuto il pulsante **Salva** il form viene inviato (`submit`) ad un indirizzo preciso su internet. Noi però non l'abbiamo specificato perché intercettiamo questo evento e fermiamo l'invio per accedere ai dati.

```
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

il resto del file è usato per definire le due scatole magiche che creano la lista dei voti e la scatola per tenere i voti

[](TODO:Aggiungere il localStorage) 
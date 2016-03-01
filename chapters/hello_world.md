# Hello World
La prima applicazione manderà un avviso all'utente utilizzando il metodo `alert()`.

## Specifiche
La pagina dovrà contenere un bottone che quando premuto aprirà un **popup**.

## La struttura
La struttura dell'applicazione è contenuta nel file `index.html`, usando i tag HTML inseriamo i contenuti di cui hai bisogno.

```js
<html>
  <head>
    <title>Hello Fox</title>
  </head>
  <body>
    <h2>Yell "hello" to the World</h2>
    <em>press the button</em>
    <button id='press-me'>Yell</button>
    <script src="app.js"></script>
  </body>
</html>
```
Questa pagina di esempio contiene un bottone che ha un `id="press-me"`; questo servirà come "ancora" a questo elemento della pagina.
Subito prima della chiusura del `body` inserisci il tag `script` che provvederà a caricare il file `app.js` nella pagina.

## La logica dell'applicazione

Tutta la logica di questa applicazione sarà contenuta nel file `app.js`, con queste poche righe di codice potrai creare un **listener**, ossia una funzione che farà qualcosa quando un certo evento accadrà. Nel nostro caso il **listerer** aprirà un popup con scritto "Hello World".

```js
var button = document.getElementById("press-me");

button.addEventListener("click", function(){
  alert("Hello World!");
});
```

Assegnamo la variabile `button` come riferimento al pulsante nella pagina e aggiungiamo un **listener** che viene eseguito ad ogni `click`. La funzione contiene una sola istruzione che mostrerà all'utente la stringa `"Hello World"` in un popup.

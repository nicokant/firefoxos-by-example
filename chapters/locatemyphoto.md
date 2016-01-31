# LocateMyPhoto
Immagina di avere un applicazione che ti permette di posizionare le tue foto su una mappa in base a dove le hai scattate: questa è LocateMyPhoto.

### Screenshot
![](path/to/image)

## Info
Difficoltà: 2.  
Tempo di sviluppo: 30 minuti.  
Tecnologie e API utilizzate:
* API 1
* API 2

## Specifiche
Hai appena scattato una foto e decidi di aggiungere la sua posizione su LocateMyPhoto. Una volta aperta l'app hai una mappa e un pulsante a forma di più. Premendo il bottone compare una schermata da cui puoi scegliere o scattare una foto. Sotto di questa puoi usare la geolocazione per aggiungere la tua posizione, oppure puoi inserire l'indirizzo a cui è stata fatta. Premendo aggiungi la foto viene mostrata sulla mappa nel punto corrispondente.

## Prerequisiti
È necessario scaricare la libreria JavaScript [leaflet.js]("http://leafletjs.org") e inserire i file leaflet.js e leaflet.css nella vostra cartella.

## Carta d'identità
Oltre alle informazioni basilari, questa volta dobbiamo richiedere il permesso per la geolocazione; possiamo fare questo specificando nei permessi il campo `geolocation`.
```
{
  "name": "locateMyPhoto",
  "description": "Posiziona le tue foto sulla mappa",
  "launch_path": "/index.html",
  "icons": {
    "16": "/icons/icon16x16.png",
    "48": "/icons/icon48x48.png",
    "60": "/icons/icon60x60.png",
    "128": "/icons/icon128x128.png"
  },
  "developer": {
    "name": "nicokant",
    "url": "http://nicokant.xyz"
  },
  "permissions":
   {
     "geolocation": {}
   }
}
```

## La struttura
Mostrare il codice html e spiegare la struttura della pagina

## La logica dell'applicazione
Spiegare passo passo come ottenere il risultato tramite JavaScript

## La Grafica
Qualche dritta su come rendere bellissima l'applicazione

## Esercizi
Qualche suggerimento per ampliare e migliorare l'app realizzata
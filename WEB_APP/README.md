<h1 algin="center">Web app per un e-commerce di prodotti italiani.</h1>

<details open="open">
  <summary>Sommario</summary>
  <ol>
    <li>
      <a href="#informazioni-sul-progetto">Informazioni sul progetto</a>
      <ul>
        <li><a href="#costruito-con">Costruito con</a></li>
      </ul>
    </li>
   <li><a href="#descrizione">Descrizione</a>
     <ul>
        <li><a href="#Download-e-testare-app-in-locale">Download e testare app in locale</a></li>
      </ul>
    </li>
   <li><a href="#licenza">Licenza</a></li>
  <ol>
</details>

<!-- Informazioni sul progetto-->

## Informazioni sul progetto

Si suppone che un supermarket "L'Angolo della Bontà"  vuole aprire un piccolo e-commerce totalmente mobile. Per sperimentare questa nuova possibilità di business chiede di sviluppare una  web app dall’esperienza minimale.

#### <h3>Costruito con:</h3>

- [Vue.js] (https://vuejs.org/)
- [Pinia] (https://pinia.vuejs.org/)
- [Pinia-plugin-persistedstate] (https://github.com/prazdevs/pinia-plugin-persistedstate)
- [Bootstrap] (https://getbootstrap.com/)

Esegue delle chiamate all'API RESTfull presente in questo repository nella folder API
- [API] ('../API')

<!--Descrizione-->

## Descrizione

### Descrizione Funzionamento

L’applicazione web, è un’app mobile first creata in Vue.js, composta da quattro viste principali:

 - Vista categorie  (HomeView.vue)
 - Vista Lista prodotti in base alla categoria scelta (ProductList.vue)
 - Vista detaglio prodotto (ProductView.vue)
 - Carrello (CartProduct.vue)

L' applicazione esegue delle chiamate ad un'API RESTful appositamente sviluppata che gestisce:
 -  un sistema di login/logouth , registarzione dell'utente , e recupero password;
 - un sistema per il recupero dei prodotti dal DB in base alla categoria, e il recupero di eventuali prodotti presenti nel carrello per ogni singolo utente registrato.

L'utente non autenticato puo navigare fino alla pagina dettaglio prodotto per aggiungere un prodotto nel carrello prima si deve login/registrazione .
</br>
</br>
Si è stabilito che sè il cliente acquista più di 3 prodotti, riceve uno sconto del 10% sul totale.
</br>
</br>
![](/src/assets/img/imgdescr.png) 

### Download e testare app in locale

- Sul proprio dispositivo è necessario installare: 
   - Nodo.js
   - gestore di pachetti npm. 

L'app può essere testata in locale eseguendo i seguenti passaggi:

- Clonare il repository del progetto in locale 

- Aprire la folder del progetto con un terminale, ed eseguire il comando "npm install".

- Testare l'app in locale tramite il comando "npm run dev".
##
![](/src/assets/img/run.png)

## Licenza

    Distribuito con licenza MIT. Vedere "LICENSE" per ulteriori informazioni.


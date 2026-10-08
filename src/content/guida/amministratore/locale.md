# Il locale: tavoli, menu, destinazioni

[← Amministratore](/guida/amministratore)

## Tavoli

Qui disegni la piantina del locale, quella che i camerieri vedono a ogni serata.

<img src="/guida/img/admin-tavoli.png" alt="Piantina in modifica" width="280">

### Le sale

- **Nuova sala**: tocca **+ STANZA** in alto, scrivi il **Nome della sala**, la **Larghezza** e la **Profondità** in
  metri (servono a disegnarla in scala) e tocca **Aggiungi**.
- **Modificare una sala**: apri la sala e tocca la **matita** accanto alle schede.
- **Eliminare una sala**: tocca il **cestino** accanto alle schede e conferma. Spariscono anche i suoi tavoli.

### I tavoli

- **Nuovo tavolo**: apri la sala e tocca **+ TAVOLO** in basso a destra.
- **Spostare**: trascina il tavolo con il dito o con il mouse. Mentre sistemi la sala, un puntino ogni 50 cm aiuta
  ad allineare i tavoli.
- **Modificare**: tocca il tavolo. In cima vedi un'anteprima del tavolo con le sue sedie, che cambia mentre scrivi.
  - **Nome o numero**: come lo chiamano i camerieri (12, Bancone, Divanetto…);
  - **Forma**: *Rettangolo* o *Tondo*;
  - **Misure comuni**: un tocco imposta misure e posti di un tavolo tipico (*Da 2*, *Da 4*, *Ø 90*…);
  - **Posti** (con **−** e **+**), **Larghezza** e **Profondità** in centimetri.

  Poi **Salva** (**Aggiungi** per un tavolo nuovo).

  <img src="/guida/img/admin-tavolo-modifica.png" alt="Modifica di un tavolo, con l'anteprima" width="280">
- **Eliminare**: tocca il tavolo e poi **Elimina**. Non c'è se il tavolo è in uso.

**Importante**: le modifiche diventano definitive solo quando tocchi **Salva** in alto. Con **Annulla** torni alla
piantina salvata.

Per ingrandire, rimpicciolire o adattare la sala allo schermo usa i pulsanti in alto a destra sulla piantina.

Le modifiche fatte qui valgono dalla prossima serata. Durante una serata, camerieri e cassieri possono cambiare la
piantina solo per quella sera da **Gestione Tavoli** (vedi [Cameriere](/guida/cameriere#gestione-tavoli)).

## Menu

La sezione **Menu** ha tre schede: **Menu**, **Categorie** e **Opzioni**.

<img src="/guida/img/admin-menu.png" alt="Elenco dei menu" width="280">

### I menu

Puoi avere più menu (es. *Menu Principale*, *Menu Festa*) e scegliere quale usare a ogni evento.

- **Nuovo menu**: tocca **+** in basso a destra, scrivi il **Nome** e tocca **CONFERMA**. Per partire da un menu
  esistente attiva **Copia da un altro menu** e scegli quale: si copiano anche descrizioni, allergeni, IVA e opzioni.
- **Rinominare**: **MODIFICA**.
- **Eliminare**: **ELIMINA**. Non si può se il menu è usato da un evento attivo o programmato.
- **Vedere i prodotti**: **ESPLORA**.
- **Lavorare in un foglio di calcolo**: **CSV** → **Esporta** o **Importa…** (vedi [Import ed export del menu](/guida/amministratore/menu-csv)).

### I prodotti

Da **ESPLORA** vedi tutti i prodotti del menu, con categoria, prezzo, IVA, destinazione e disponibilità; sotto il nome,
la descrizione e gli allergeni. Usa **Cerca** per trovarne uno.

<img src="/guida/img/admin-prodotto-modifica.png" alt="Modifica di un prodotto" width="280">

- **Da togliere dal menu per un po'?** Spegni l'interruttore **Disponibile** nella sua riga: i camerieri e il menu
  pubblico non lo vedono più, finché non lo riaccendi.
- **Finito stasera?** Meglio **ESAURITI** in alto (lo trovano anche bar e cassa): il prodotto resta visibile, grigio e
  con la scritta *Esaurito*, e alla chiusura della serata torna disponibile da solo. Vedi
  [Barista e cucina](/guida/barista#esauriti).
- **Modificare**: tocca la riga, cambia i campi e tocca **AGGIORNA**:
  - **Nome**, **Prezzo**, **Disponibile**;
  - **Categoria**: la sotto-categoria in cui compare al cameriere;
  - **Destinazione**: dove va preparato;
  - **Aliquota IVA**: 4, 5, 10 o 22%; *Quella del locale* usa l'aliquota predefinita delle
    [Impostazioni](/guida/amministratore/impostazioni#nome-e-colori). Gli ordini tengono l'aliquota del momento in cui sono stati presi;
  - **Opzioni**: i gruppi di opzioni che il prodotto offre (es. *Cottura*, *Aggiunte*), nell'ordine in cui il cameriere
    li vede. I gruppi si creano nella scheda **Opzioni** (vedi [Opzioni](/guida/amministratore/opzioni));
  - **Descrizione**: ingredienti o una riga per il cliente, al massimo 300 caratteri. La vede il cameriere e, se c'è,
    il menu pubblico;
  - **Allergeni contenuti** e **Può contenere tracce di**: i 14 allergeni di legge. Un allergene già contenuto non va
    ripetuto nelle tracce. Lasciare vuoto vuol dire *non indicato*, non *senza allergeni*.
- **Nuovo prodotto**: tocca **+** in basso a destra, compila e tocca **CONFERMA**.
- **Eliminare**: tocca la riga, poi **ELIMINA** e conferma.

Per tornare all'elenco dei menu tocca la **freccia** in alto a destra.

### Categorie e sotto-categorie

<img src="/guida/img/admin-categorie.png" alt="Categorie e sotto-categorie con le frecce per l'ordine" width="280">

- Le **Categorie** sono i gruppi grandi (es. *Bevanda*, *Cibo*): servono per i conteggi in fondo alla schermata del
  cameriere e nel resoconto, e sono le sezioni del menu pubblico.
- Le **Sotto-Categorie** (es. *Cocktail*, *Panino*) sono i gruppi che il cameriere apre per scegliere i prodotti.

Tocca **+** accanto al titolo per crearne una; tocca una riga per modificarla. Scegli **Nome**, **Icona** e, per le
sotto-categorie, la **Categoria** a cui appartengono, poi **CONFERMA**. Si può eliminare solo una categoria senza
prodotti.

**L'ordine**: con le **frecce** nella colonna *Ordine* sposti una categoria su o giù; una sotto-categoria si sposta
tra quelle della sua categoria. L'ordine vale subito per il cameriere, il menu pubblico e il file CSV. Quelle nuove
vanno in fondo.

## Destinazioni

Le destinazioni sono le postazioni dove si preparano i prodotti (es. *Bar*, *Cucina*). Ognuna ha la sua scheda nella
schermata iniziale per baristi e camerieri.

<img src="/guida/img/admin-destinazioni.png" alt="Elenco delle destinazioni" width="280">

- **Nuova destinazione**: tocca **+** in basso a destra, scrivi **Nome** e **Minuti attesa servizio**, tocca
  **CONFERMA**.
- **Minuti attesa servizio**: dopo quanti minuti un ordine non completato diventa rosso nella lista della postazione.
- **Lavora per uscite** (solo con la funzione opzionale *Uscite* accesa): la postazione riceve la 2ª e la 3ª uscita
  solo quando il cameriere le manda. Si usa per la cucina; il bar di solito no (le bevande arrivano subito).
- **Modificare**: **MODIFICA**.
- **Eliminare**: **ELIMINA**. Non si può finché ci sono prodotti del menu collegati: spostali prima su un'altra
  destinazione.

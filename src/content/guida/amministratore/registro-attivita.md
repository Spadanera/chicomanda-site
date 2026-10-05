# Registro attività

[← Amministratore](/guida/amministratore)

Il **registro attività** dice chi ha fatto cosa nel locale, e quando: ordini, pagamenti, storni, sconti, prodotti
eliminati, modifiche al menu, alle serate e allo staff, accessi. Serve, per esempio, a capire perché la cassa di una
serata non torna o chi ha cambiato un prezzo.

Lo vede solo l'**amministratore** del locale: in *Amministrazione* tocca **Registro**.

<img src="/guida/img/admin-registro.png" alt="Registro attività sul telefono" width="280">

## Come si legge

Ogni riga è una frase, per esempio:

- *Marco ha ordinato 2 × Spritz e Nachos (18,00 €) per il tavolo 7*
- *Giulia ha eliminato Spritz (6,00 €) dal tavolo 12*
- *Giulia ha chiuso il tavolo 7: 24,00 € (contanti)*
- *Anna ha modificato Spritz: prezzo 6,00 € → 6,50 €*

Sotto la frase ci sono l'**ora** e la **categoria**; l'icona e il colore cambiano con la categoria. Storni, prodotti
eliminati e pagamenti non riusciti hanno l'icona rossa, così si notano subito.

Le righe sono raggruppate per **serata** (anche quando la serata va oltre la mezzanotte) e, fuori dalle serate, per
**giorno**. Le più recenti sono in alto. Date e ore sono quelle del locale.

I nomi restano quelli del momento: se un tavolo viene chiuso, un prodotto rinominato o una persona tolta dallo staff, la
riga dice ancora quello che è successo.

## I dettagli

Tocca una riga per aprire i dettagli: i campi cambiati, con il valore di prima barrato e quello nuovo, oppure i
prodotti di un ordine, il metodo e l'importo di un pagamento.

<img src="/guida/img/admin-registro-dettaglio.png" alt="Dettaglio di un pagamento nel registro" width="280">

Dai dettagli puoi restringere l'elenco con un tocco: **Solo Giulia** (le azioni di quella persona), **Solo questo
tavolo**, **Solo questa serata**.

## Filtri

In alto c'è la ricerca: scrivi un nome, un tavolo, un prodotto o una parola della frase (per esempio *stornato*).

Su tablet e computer i filtri sono sempre visibili; sul telefono tocca **FILTRI** (tra parentesi quanti ne sono attivi).

<img src="/guida/img/admin-registro-filtri.png" alt="Filtri del registro" width="280">

- **Serata**: una sola serata, anche già chiusa o eliminata.
- **Persona**: chi ha fatto l'azione.
- **Dal** / **Al**: un periodo.
- **Categorie**: tocca una o più categorie per vedere solo quelle; toccala di nuovo per toglierla.
- **TOGLI I FILTRI** riporta l'elenco completo.

I filtri restano nell'indirizzo della pagina: puoi salvarla nei preferiti o mandare il link a un altro amministratore
del locale, che vedrà lo stesso elenco.

| Categoria | Cosa contiene |
|---|---|
| **Ordini** | Ordini, tavoli aperti e spostati, prodotti eliminati, prodotti segnati pronti |
| **Cassa** | Pagamenti (registrati, avviati, confermati, annullati, non riusciti), sconti, prodotti segnati pagati o stornati, tavoli chiusi e riaperti |
| **Menu** | Menu, prodotti (prezzo, disponibilità…), categorie |
| **Eventi** | Serate create, modificate, avviate, chiuse, eliminate; la sala della serata |
| **Persone** | Inviti, ruoli, blocchi, persone tolte dallo staff, inviti accettati |
| **Impostazioni** | Nome, colori e logo, destinazioni, piantina, metodi di pagamento |
| **Accessi** | Accessi, uscite, scelta del locale |

## Esportare

**ESPORTA CSV** scarica un file con le righe dell'elenco, **con gli stessi filtri** (data, ora, persona, categoria,
attività, dettagli). Si apre con Excel, Numbers o Fogli Google.

## Cosa non c'è nel registro

- **Password, chiavi e codici**: mai. Per i metodi di pagamento il registro dice solo *quali* campi sono cambiati
  (per esempio *API key*), non il loro valore.
- **Immagini**: il cambio del logo è registrato, l'immagine no; le foto del profilo non sono registrate.
- **Messaggi allo staff** e preferenze delle notifiche sul proprio telefono.
- **Operazioni non riuscite**: un ordine rifiutato o un pagamento con importo sbagliato non compaiono. Un ordine
  rimandato più volte da un telefono con la connessione instabile compare **una volta sola**.
- **Accessi non riusciti**: li vede l'amministratore della piattaforma, non il locale.

Le righe più vecchie di **24 mesi** vengono cancellate da sole.

Se l'amministratore della piattaforma lavora nel tuo locale, nel registro compare con *(piattaforma)* accanto al nome.

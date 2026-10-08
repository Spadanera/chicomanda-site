# Opzioni: varianti e aggiunte

[← Amministratore](/guida/amministratore)

Le opzioni sono le scelte che un prodotto offre al cliente: la **cottura** della carne, l'**impasto** della piadina,
le **aggiunte** a pagamento. Le prepari una volta sola, in gruppi, e le colleghi a tutti i prodotti che le offrono.

## I gruppi di opzioni

In *Amministrazione → Menu* apri la scheda **Opzioni**.

<img src="/guida/img/admin-opzioni.png" alt="Elenco dei gruppi di opzioni" width="280">

Per ogni gruppo vedi le regole di scelta, quanti prodotti lo usano e le opzioni con i supplementi.

**Nuovo gruppo**: tocca **+** accanto al titolo.

<img src="/guida/img/admin-opzione-modifica.png" alt="Modifica di un gruppo di opzioni" width="280">

1. **Nome del gruppo**: quello che legge il cameriere (es. *Cottura*, *Aggiunte*).
2. **Obbligatoria**: acceso, il cameriere deve scegliere almeno un'opzione prima di aggiungere il prodotto.
3. **Più scelte insieme**: spento, si sceglie **una sola** opzione (es. la cottura); acceso, se ne possono scegliere
   più d'una (es. le aggiunte). In **Al massimo** puoi mettere un limite (vuoto = nessun limite).
4. **Opzioni**: per ognuna il nome e, se serve, il supplemento nel campo **+ €** (es. *1,50*). Il supplemento si somma al prezzo del
   prodotto; può essere anche negativo per una riduzione (es. *-0,50* per «senza mozzarella»). Con la freccia cambi
   l'ordine, con la **×** togli un'opzione, con **Aggiungi opzione** ne aggiungi una.
5. Tocca **CONFERMA**.

Esempi:

| Gruppo | Obbligatoria | Più scelte | Opzioni |
|---|---|---|---|
| Cottura | sì | no | Al sangue, Media, Ben cotta |
| Impasto | sì | no | Classico, Integrale (+0,50), Senza glutine (+1,50) |
| Aggiunte | no | sì, al massimo 3 | Patatine (+1,50), Doppio formaggio (+1,00), Senza salse |

Per **modificare** un gruppo tocca la sua riga: le modifiche valgono per tutti i prodotti che lo usano, dagli ordini
successivi. **ELIMINA** lo toglie da tutti i prodotti. Gli ordini già fatti tengono sempre le opzioni e i prezzi del
momento in cui sono stati presi.

## Collegare le opzioni a un prodotto

In **ESPLORA** tocca il prodotto e scegli i gruppi in **Opzioni (varianti e aggiunte)**, nell'ordine in cui il
cameriere li vedrà. Tocca **AGGIORNA**.

## Cosa succede durante il servizio

- Il cameriere, toccando il prodotto, vede una finestra con i gruppi e il prezzo aggiornato (vedi
  [Cameriere](/guida/cameriere#opzioni-cottura-impasto-aggiunte)).
- Il prezzo lo calcola sempre il server: prodotto + supplementi delle opzioni scelte, controllate rispetto ai gruppi
  del prodotto in quel momento.
- Bar, cucina e cassa vedono le opzioni sotto il nome del prodotto.
- Un'opzione finita si segna **esaurita** come un prodotto (pulsante **ESAURITI**).
- Nei [Report](/guida/amministratore/report#prodotti) la tabella **Opzioni più scelte** dice quante volte è stata scelta ogni opzione e
  quanto hanno reso i supplementi.

# Pagamenti

[← Indice](/guida)

Questa pagina spiega la finestra di pagamento della [Cassa](/guida/cassa): come scegliere il metodo e cosa succede con
ogni metodo.

## I metodi

Il cassiere vede solo i metodi che l'amministratore ha attivato per il locale. Se c'è solo **Contanti**, la scelta
del metodo non compare e basta toccare **CONFERMA**.

<img src="/guida/img/cassa-pagamento.png" alt="Pulsanti dei metodi di pagamento" width="280">

### Pagamenti registrati

Il cliente paga fuori dall'app; il cassiere registra **come** ha pagato, così l'incasso della serata è diviso per
metodo.

| Pulsante | Quando |
|---|---|
| **Contanti** | Sempre disponibile |
| **Carta (POS)** | Il cliente paga con carta sul POS del locale, di qualsiasi banca |
| **Satispay (app)** | Il cliente paga il negozio Satispay del locale dalla sua app |
| **Buoni pasto** | Buoni pasto, cartacei o elettronici |

1. Fai pagare il cliente (POS, app, contanti…).
2. Quando il pagamento è andato a buon fine, tocca il metodo usato.
3. Tocca **CONFERMA**.

Chi Comanda non controlla il POS né l'app del cliente: tocca **CONFERMA** solo dopo aver visto che il pagamento è
riuscito.

### Pagamenti elettronici

> **Funzione opzionale** · Solo se il locale ha attivato i pagamenti elettronici e configurato un servizio.

Con questi metodi è l'app a chiedere il pagamento, e il tavolo si chiude da solo quando il pagamento arriva.

| Pulsante | Cosa succede |
|---|---|
| **Satispay (QR)** | Sullo schermo compare un QR code: il cliente apre l'app Satispay e lo inquadra |
| **Link (SumUp)** | Compare un QR code e un link di pagamento: il cliente lo inquadra o tu gli mandi il link (tasto copia) |
| **App SumUp** | Si apre l'app SumUp sul tablet della cassa: il cliente avvicina o inserisce la carta nel lettore |
| **Solo (SumUp)** | Il pagamento arriva al terminale SumUp Solo: il cliente avvicina o inserisce la carta |

1. Scegli il metodo e tocca **AVVIA PAGAMENTO**.
2. Mostra il codice al cliente o fagli usare il lettore. In basso leggi «In attesa di pagamento…».
3. Quando il pagamento arriva leggi **Pagamento ricevuto!**: il tavolo (o la parte pagata) si chiude da solo.

Durante l'attesa:

- **Verifica ora** chiede subito l'esito, senza aspettare l'aggiornamento automatico;
- **Annulla** interrompe l'attesa e torna alla scelta del metodo. Con Satispay annulla anche la richiesta di
  pagamento, così il cliente non può più pagarla;
- con **App SumUp**, **Riapri app SumUp** riapre l'app se l'hai chiusa. Se il cliente ha pagato ma l'app non lo
  conferma, controlla sull'app SumUp e tocca **Confermo pagamento ricevuto**.

Se leggi **Pagamento non riuscito**, chiedi al cliente di riprovare o scegli un altro metodo.

Non chiudere la pagina mentre aspetti un pagamento elettronico. Se la connessione cade, alla riapertura l'app chiede
di nuovo l'esito del pagamento in corso.

## Incassi della serata

Ogni pagamento viene registrato con il suo metodo. L'amministratore vede il totale per metodo nel resoconto
dell'evento, scheda **Incassi** (vedi [Eventi](/guida/amministratore/eventi)).

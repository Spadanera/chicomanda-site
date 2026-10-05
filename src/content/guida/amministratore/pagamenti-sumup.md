# Pagamenti elettronici con SumUp

[← Amministratore](/guida/amministratore) · [Impostazioni e pagamenti](/guida/amministratore/impostazioni#pagamenti)

Con SumUp configurato, la cassa chiede il pagamento direttamente da Chi Comanda e il tavolo si chiude da solo quando
il pagamento arriva (vedi [Pagamenti](/guida/pagamenti)). Si configura una volta sola, da *Amministrazione →
Pagamenti*. Serve un account **amministratore** del locale.

## Quale metodo scegliere

| Hai… | Usa | In cassa |
|---|---|---|
| un lettore **SumUp Solo** | **SumUp Solo (lettore collegato a internet)** · consigliato | La cassa manda l'importo al Solo; funziona da telefono, tablet o computer |
| nessun lettore | **SumUp link / QR (senza lettore)** | Compare un QR: il cliente paga dal suo telefono (carta, Apple Pay, Google Pay) |
| un lettore **Air** o **3** con l'app SumUp sul telefono/tablet della cassa | **App SumUp sullo stesso telefono o tablet** | Si apre l'app SumUp con l'importo già scritto, poi torna a Chi Comanda |

Puoi attivarne più di uno: in cassa si sceglie al momento.

L'**App SumUp** funziona solo da un telefono o tablet (Android, iPhone, iPad) su cui è installata l'app SumUp:
Chi Comanda riconosce da solo il tipo di dispositivo. Da un computer il pulsante non compare. SumUp considera questo
collegamento superato: se puoi, preferisci il Solo.

## Prima: le chiavi su SumUp

Fallo dal computer, sul sito di SumUp, con l'account del locale.

### API Key (per tutti i metodi)

1. Vai su **me.sumup.com** e accedi.
2. Apri il menu del tuo profilo (in alto a destra) → **Impostazioni** (*Settings*).
3. Vai in **Per sviluppatori** (*For Developers*) → **Toolkit** → **API Keys**.
4. Tocca **Create**, dai un nome (per esempio *Chi Comanda*).
5. **Copia subito la chiave** (inizia con `sup_sk_`) e tienila da parte: SumUp non la mostra più. Non usare la
   *Public Key* che compare nella stessa pagina.

### Affiliate Key (per il Solo e per l'App SumUp)

1. Sempre in **Per sviluppatori** → **Toolkit**, apri **Affiliate Keys**.
2. In **Application identifier** scrivi esattamente:

   ```
   com.chicomanda.app
   ```

3. Tocca **Add** e copia la chiave che compare.

Il codice esercente non serve cercarlo: Chi Comanda lo trova da solo dalla API Key.

## SumUp Solo (lettore collegato a internet)

Il Solo deve essere carico (meglio se sotto carica), acceso e collegato al Wi-Fi.

1. In Chi Comanda apri **Amministrazione → Pagamenti**, scheda **SumUp Solo**, tocca **CONFIGURA**.
2. Attiva **Abilitato**.
3. Incolla **API Key** e **Affiliate Key**.
4. In **Nome del lettore** scrivi un nome per riconoscerlo, per esempio *Bancone*.
5. Ora prendi il Solo:
   1. se sul Solo sei dentro l'account SumUp, esci: menu in alto → **Impostazioni** → **Info** → **Esci**;
   2. menu in alto → **Connessioni** → controlla il **Wi-Fi**;
   3. menu → **Connessioni** → **API** → **Connetti**: sullo schermo compare un **codice di abbinamento**.
6. Scrivi quel codice in **Codice di abbinamento del Solo** e tocca **Salva** entro 5 minuti.
7. Sul Solo compare la conferma. Nella scheda di Chi Comanda leggi *esercente MC… · lettore Bancone*.

Se leggi «abbinamento non riuscito», il codice è scaduto: sul Solo genera un nuovo codice (**API** → **Connetti**) e
salva di nuovo.

## SumUp link / QR (senza lettore)

1. **Amministrazione → Pagamenti**, scheda **SumUp link / QR**, tocca **CONFIGURA**.
2. Attiva **Abilitato**, incolla l'**API Key**, tocca **Salva**.
3. Nella scheda leggi *esercente MC…*: la chiave funziona.

Il link di pagamento vale 30 minuti.

## App SumUp sullo stesso telefono o tablet

1. Sul telefono o tablet della cassa installa l'**app SumUp**, accedi con l'account del locale e abbina il lettore
   (Air o 3) come indica l'app.
2. In Chi Comanda: **Amministrazione → Pagamenti**, scheda **App SumUp**, **CONFIGURA**.
3. Attiva **Abilitato**, incolla l'**Affiliate Key** e anche l'**API Key**: è facoltativa ma consigliata, perché così
   Chi Comanda controlla con SumUp l'esito di ogni pagamento.
4. Tocca **Salva**.

La valuta deve essere la stessa del conto SumUp (di solito EUR).

## Se hai già configurato SumUp con una versione precedente

Apri ogni scheda SumUp attiva, tocca **Modifica**, incolla di nuovo l'**API Key** (e l'**Affiliate Key** per Solo e
App SumUp) e salva. Per il Solo rifai anche l'abbinamento con il codice. I vecchi campi *URL pubblico del server* e
*Codice reader* non servono più.

## Prova prima del servizio

Fai una prova con un importo piccolo, in un momento tranquillo, per ogni metodo attivo:

1. Apri un tavolo di prova con un prodotto economico.
2. In **Cassa** apri il tavolo, scegli il metodo, tocca **AVVIA PAGAMENTO** e paga con una tua carta.
3. Controlla che il tavolo si chiuda da solo e che il pagamento compaia in *Eventi* → serata → **Riepilogo** →
   **Incassi per metodo**.
4. Rimborsa il pagamento di prova da me.sumup.com (**Transazioni** → il pagamento → **Rimborsa**).

## Se qualcosa non va

- **«la API key non è valida o è stata revocata»**: creane una nuova su me.sumup.com e salvala.
- **«la chiave vale per più attività»**: l'account SumUp ha più attività. Scrivi in **Codice esercente** il codice
  dell'attività del locale (lo trovi su me.sumup.com, nel profilo, inizia con *M*).
- **«Il lettore Solo non è pronto»**: controlla che il Solo sia acceso, connesso al Wi-Fi e senza un altro pagamento
  in corso.
- **Il pagamento resta «In attesa»**: tocca **Verifica ora**. Se non cambia, controlla l'esito su SumUp prima di
  chiudere il tavolo in un altro modo, per non far pagare due volte il cliente.
- **App SumUp: il cliente ha pagato ma Chi Comanda non lo sa** (per esempio hai chiuso il browser): tocca
  **Confermo pagamento ricevuto**. Se hai inserito l'API Key, Chi Comanda controlla con SumUp e rifiuta un pagamento
  che SumUp segna come non riuscito.

# Pagamenti con Satispay

[← Amministratore](/guida/amministratore) · [Impostazioni e pagamenti](/guida/amministratore/impostazioni#pagamenti)

Chi Comanda accetta Satispay in due modi:

| Metodo | Come funziona | Cosa serve |
|---|---|---|
| **Satispay (app)** | Il cliente paga il negozio Satispay del locale dalla sua app, come al solito; il cassiere registra il pagamento | Solo accendere il metodo in *Amministrazione → Pagamenti*, **Pagamenti registrati** |
| **Satispay (QR)** | La cassa mostra un QR code con l'importo; il cliente lo inquadra con l'app e il tavolo si chiude da solo | L'attivazione descritta in questa pagina |

Questa pagina riguarda **Satispay (QR)**.

## Cosa serve

- Un account **Satispay Business** del locale.
- Un **codice di attivazione**, generato da Satispay Business nella sezione per sviluppatori o integrazioni. Il codice
  vale **una volta sola**.

Non devi creare né copiare chiavi: le genera Chi Comanda al momento dell'attivazione e non escono mai dal server.

## Attivare

1. In *Amministrazione → Pagamenti*, sulla scheda **Satispay (QR code)**, tocca **CONFIGURA**.
2. Attiva **Abilitato**.
3. Incolla il **Codice di attivazione**.
4. In **Ambiente** lascia **production** (vedi la prova qui sotto per **sandbox**).
5. Tocca **Salva**.

Se l'attivazione non riesce, l'app dice perché:

- **codice già usato**: genera un nuovo codice da Satispay Business;
- **codice non trovato**: controlla di aver scelto l'ambiente giusto (un codice di prova funziona solo in *sandbox*).

Per passare da *sandbox* a *production* serve un nuovo codice di attivazione.

## Provare prima di usarlo

Consigliato prima della prima serata:

1. Chiedi a Satispay un codice di attivazione per l'ambiente di prova (*sandbox*) e la loro app di prova.
2. Attiva Satispay come sopra, ma con **Ambiente: sandbox** e il codice di prova.
3. Apri un tavolo di prova e chiudilo in cassa con **Satispay (QR)**, **AVVIA PAGAMENTO**.
4. Inquadra il QR code con l'app di prova e paga: il tavolo deve chiudersi da solo con «Pagamento ricevuto!».
5. Prova anche **Annulla**: avvia un altro pagamento e annullalo prima di pagare. Il pagamento non deve più essere
   pagabile dall'app.
6. Quando tutto funziona, genera da Satispay Business il codice vero e riconfigura con **Ambiente: production**.

## In servizio

- Il cassiere sceglie **Satispay (QR)** e tocca **AVVIA PAGAMENTO**; il cliente inquadra il codice.
- Il tavolo si chiude da solo appena Satispay conferma. **Verifica ora** chiede subito l'esito.
- **Annulla** cancella la richiesta anche presso Satispay, così il cliente non può pagarla dopo.
- I pagamenti compaiono negli **Incassi** della serata come *Satispay (QR)*.

## Disattivare

Sulla scheda **Satispay (QR code)** tocca **Disabilita**: il metodo sparisce dalla cassa e la configurazione resta per
riattivarlo.

# Import ed export del menu (CSV)

[← Amministratore](/guida/amministratore)

Per sistemare tanti prodotti insieme (prezzi nuovi, descrizioni, allergeni, un menu da un altro programma) puoi
lavorare in un foglio di calcolo: esporti il menu in un file CSV, lo modifichi con Excel, Numbers o Fogli Google e lo
importi di nuovo.

## Esportare

In *Amministrazione → Menu*, sul riquadro del menu tocca **CSV → Esporta**. Scarichi un file che Excel in italiano
apre già diviso in colonne, con i prodotti nell'ordine delle categorie.

## Le colonne

La prima riga del file contiene i nomi delle colonne, in quest'ordine:

| Colonna | Cosa scrivere | Obbligatoria |
|---|---|---|
| **categoria** | La categoria (es. *Bevanda*). Se non esiste viene creata | sì |
| **sottocategoria** | La sotto-categoria (es. *Cocktail*). Se non esiste viene creata | sì |
| **nome** | Il nome del prodotto: è quello che collega la riga al prodotto del menu | sì |
| **descrizione** | Al massimo 300 caratteri | no |
| **prezzo** | Con la virgola o il punto: *6,50* | sì |
| **destinazione** | La postazione dove si prepara (es. *Bar*), che deve già esistere | sì |
| **aliquota IVA** | *4*, *5*, *10* o *22*; vuoto = quella del locale | no |
| **allergeni** | Separati da virgole, col nome o il numero: *Glutine, Latte* oppure *1, 7* | no |
| **tracce** | Come gli allergeni | no |
| **disponibile** | *sì* o *no*; vuoto = sì | no |

Una colonna non obbligatoria che manca dal file lascia com'è quel dato dei prodotti. Le opzioni (cottura, aggiunte…)
non sono nel file: si gestiscono nella scheda [Opzioni](/guida/amministratore/opzioni).

**File d'esempio**: [menu-esempio.csv](menu-esempio.csv). Scaricalo, aprilo e sostituisci i prodotti con i tuoi.

## Importare

1. Sul riquadro del menu tocca **CSV → Importa…** e scegli il file.
2. L'app mostra cosa succederebbe, **senza cambiare ancora nulla**:
   - **nuovi**: prodotti che non c'erano;
   - **modificati**: prodotti già nel menu con qualcosa di diverso (l'app dice cosa: prezzo, descrizione…);
   - **invariati**: uguali a come sono (li vedi con *Mostra anche gli invariati*);
   - **con errori**: righe da correggere, con il motivo (un prezzo non valido, una destinazione che non esiste, lo
     stesso nome su due righe…);
   - le **categorie che verrebbero create**.
3. Se ci sono errori, correggi il file e sceglilo di nuovo: finché ce n'è anche uno solo **non viene importato
   nulla**.
4. Tocca **Importa N prodotti**.

<img src="/guida/img/admin-import-csv.png" alt="Anteprima dell'import di un file CSV" width="280">

Da sapere:

- I prodotti si riconoscono dal **nome** (maiuscole e accenti non contano). Rinominare un prodotto nel file vuol dire
  crearne uno nuovo: per rinominare, fallo dall'app.
- I prodotti del menu che **non sono nel file** restano come sono: l'import non cancella niente.
- Le categorie create dall'import hanno l'icona *Altro* e vanno in fondo: cambiale in **Categorie**.
- Se Excel salva il file senza «UTF-8», l'app riconosce comunque le lettere accentate.
- L'import finisce nel [registro attività](/guida/amministratore/registro-attivita), con i nomi dei prodotti nuovi e modificati.

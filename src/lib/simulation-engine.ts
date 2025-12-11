import { UserProfile, SimulationScenario, Task } from "@/types/simulation";

const roleMap: Record<string, Record<string, { role: string; explanation: string }>> = {
  "UX/UI Design": {
    default: {
      role: "Junior UX/UI Designer",
      explanation: "Il tuo background si fonde con la sensibilità visiva e l'approccio centrato sull'utente tipico del design digitale.",
    },
    marketing: {
      role: "UX Designer con focus Marketing",
      explanation: "La tua esperienza nel marketing si combina perfettamente con il design per creare esperienze che convertono.",
    },
    tech: {
      role: "Product Designer",
      explanation: "Le tue competenze tecniche ti permettono di dialogare efficacemente con gli sviluppatori mentre progetti interfacce.",
    },
  },
  "Web Development": {
    default: {
      role: "Junior Frontend Developer",
      explanation: "Il tuo percorso formativo ti ha preparato a trasformare design in codice funzionante e performante.",
    },
    creative: {
      role: "Creative Developer",
      explanation: "La tua creatività ti permette di costruire esperienze web uniche che vanno oltre il convenzionale.",
    },
    business: {
      role: "Full-Stack Developer Junior",
      explanation: "La tua comprensione del business ti aiuta a sviluppare soluzioni complete che risolvono problemi reali.",
    },
  },
  "Digital Marketing": {
    default: {
      role: "Digital Marketing Specialist Junior",
      explanation: "Il tuo background ti ha dato la sensibilità per comunicare efficacemente nel mondo digitale.",
    },
    analytical: {
      role: "Growth Marketing Analyst",
      explanation: "Le tue capacità analitiche si combinano con il marketing per ottimizzare campagne basate sui dati.",
    },
    creative: {
      role: "Content & Social Media Strategist",
      explanation: "La tua creatività trova espressione nella creazione di contenuti che coinvolgono e convertono.",
    },
  },
  "Data Analysis e Data Science": {
    default: {
      role: "Junior Data Analyst",
      explanation: "Il tuo approccio metodico si traduce perfettamente nell'analisi di dati per supportare decisioni aziendali.",
    },
    tech: {
      role: "Data Engineer Junior",
      explanation: "Le tue competenze tecniche ti permettono di costruire pipeline di dati efficienti e scalabili.",
    },
    business: {
      role: "Business Intelligence Analyst",
      explanation: "La tua comprensione del business ti aiuta a tradurre i dati in insight strategici.",
    },
  },
  "Non lo so": {
    default: {
      role: "Digital Project Coordinator",
      explanation: "Le tue competenze trasversali ti rendono ideale per coordinare progetti digitali multidisciplinari.",
    },
  },
};

const getBackgroundType = (background: string): string => {
  const lowerBg = background.toLowerCase();
  if (lowerBg.includes("marketing") || lowerBg.includes("comunicazione")) return "marketing";
  if (lowerBg.includes("informatica") || lowerBg.includes("ingegneria") || lowerBg.includes("programmazione")) return "tech";
  if (lowerBg.includes("arte") || lowerBg.includes("design") || lowerBg.includes("creativ")) return "creative";
  if (lowerBg.includes("economia") || lowerBg.includes("management") || lowerBg.includes("business")) return "business";
  if (lowerBg.includes("statistica") || lowerBg.includes("matematica") || lowerBg.includes("fisica")) return "analytical";
  return "default";
};

const generateTasks = (area: string): Task[] => {
  const tasksByArea: Record<string, Task[]> = {
    "UX/UI Design": [
      {
        id: 1,
        title: "Analisi del Brief del Cliente",
        context: "Sono le 9:15. Apri la mail del tuo team lead. C'è il brief per un nuovo progetto: riprogettare l'app mobile di un'azienda di food delivery chiamata 'QuickBite'. Il cliente lamenta che 'gli utenti abbandonano il carrello troppo spesso'.",
        challenge: "Leggi il brief e identifica qual è la VERA priorità su cui concentrarti nella prima fase di analisi:",
        choices: [
          {
            id: "a",
            text: "Analizzare i dati di abbandono carrello per capire in quale step gli utenti escono",
            isCorrect: true,
            feedback: "Perfetto! Prima di proporre soluzioni, devi capire DOVE e PERCHÉ gli utenti abbandonano. I dati ti diranno se il problema è nel checkout, nei prezzi, o altrove.",
          },
          {
            id: "b",
            text: "Iniziare subito a ridisegnare il flusso di checkout più corto",
            feedback: "Attenzione! Stai assumendo che il checkout sia il problema senza dati. Potresti sprecare tempo risolvendo il problema sbagliato.",
          },
          {
            id: "c",
            text: "Proporre una riunione con tutto il team per fare brainstorming",
            feedback: "Il brainstorming è utile, ma senza dati concreti rischi di basare le idee su opinioni. Prima raccogli informazioni, poi coinvolgi il team.",
          },
        ],
        skill: "Problem Framing",
        lesson: "Nel UX Design, resistere all'impulso di progettare subito è fondamentale. Il 50% del lavoro è capire il problema giusto da risolvere.",
      },
      {
        id: 2,
        title: "Costruzione User Persona",
        context: "Hai analizzato i dati. Il 68% degli abbandoni avviene nella schermata 'Riepilogo Ordine'. Ora il team lead ti chiede di creare una user persona basata sulle interviste utente della scorsa settimana.",
        challenge: "Hai 3 profili di utenti intervistati. Quale scegli come persona PRIMARIA per guidare il redesign?",
        choices: [
          {
            id: "a",
            text: "Marco, 22 anni, studente: ordina 2 volte a settimana, molto sensibile ai prezzi, abbandona spesso per costi di consegna inaspettati",
            isCorrect: true,
            feedback: "Ottima scelta! Marco rappresenta il segmento più grande (45% degli utenti) e il suo pain point (costi nascosti) è direttamente collegato al problema di abbandono.",
          },
          {
            id: "b",
            text: "Laura, 35 anni, manager: ordina 1 volta al mese, budget alto, abbandona perché l'app è lenta",
            feedback: "Laura è un utente valido ma minoritario (12%). Ottimizzare per lei potrebbe non impattare significativamente il problema principale.",
          },
          {
            id: "c",
            text: "Giuseppe, 45 anni, padre di famiglia: ordina per tutta la famiglia, si perde nei menu complessi",
            feedback: "Giuseppe ha un problema reale ma diverso (navigazione, non checkout). Risolvere il suo problema non ridurrà l'abbandono nel riepilogo ordine.",
          },
        ],
        skill: "User Research Prioritization",
        lesson: "La persona primaria deve rappresentare il segmento più impattante per il problema specifico che stai risolvendo, non l'utente 'ideale'.",
      },
      {
        id: 3,
        title: "Wireframing della Soluzione",
        context: "Con Marco come persona primaria, sai che il problema sono i costi nascosti. Apri Figma e devi progettare il wireframe della nuova schermata 'Riepilogo Ordine'.",
        challenge: "Quale approccio di design scegli per risolvere il problema dei costi nascosti?",
        choices: [
          {
            id: "a",
            text: "Mostrare il costo totale stimato (inclusa consegna) già dalla selezione del ristorante, non solo nel riepilogo",
            isCorrect: true,
            feedback: "Eccellente! Anticipare l'informazione elimina la 'sorpresa' negativa. Gli utenti decidono con tutte le informazioni fin dall'inizio. Questo si chiama 'progressive disclosure' fatto bene.",
          },
          {
            id: "b",
            text: "Aggiungere un popup che spiega nel dettaglio come vengono calcolati i costi di consegna",
            feedback: "Spiegare non risolve il problema: l'utente è già frustrato quando vede il costo. Stai trattando il sintomo, non la causa.",
          },
          {
            id: "c",
            text: "Rendere la sezione 'Costi' più visibile con colori e icone nel riepilogo ordine",
            feedback: "Rendere più visibile un problema non lo risolve. L'utente vedrà meglio il costo che non si aspettava, ma sarà comunque deluso.",
          },
        ],
        skill: "Solution Design",
        lesson: "Il buon design anticipa i problemi invece di reagire ad essi. Mostra le informazioni critiche quando l'utente può ancora agire.",
      },
      {
        id: 4,
        title: "Review con il Team",
        context: "Sono le 16:00. Presenti il tuo wireframe al team. Il developer senior alza la mano: 'Bello, ma mostrare il costo stimato prima richiede una chiamata API extra per ogni ristorante. Rallenterà l'app.'",
        challenge: "Come rispondi a questa obiezione tecnica?",
        choices: [
          {
            id: "a",
            text: "'Possiamo calcolare una stima client-side basata sulla distanza media, e poi aggiornare con il costo reale nel carrello?'",
            isCorrect: true,
            feedback: "Perfetto! Hai proposto un compromesso tecnico che mantiene il valore UX. Mostrare una stima (es. '€2-4 consegna') è meglio di nessuna informazione, e l'API precisa viene chiamata solo nel carrello.",
          },
          {
            id: "b",
            text: "'L'esperienza utente è più importante della performance, dobbiamo trovare un modo'",
            feedback: "Attenzione: ignorare i vincoli tecnici crea conflitti e soluzioni irrealizzabili. Il buon designer collabora con gli sviluppatori, non li sfida.",
          },
          {
            id: "c",
            text: "'Ok, allora torniamo al design originale e cerchiamo un'altra soluzione'",
            feedback: "Arrendersi alla prima obiezione significa perdere una buona soluzione. Prima esplora i compromessi, poi eventualmente cambia direzione.",
          },
        ],
        skill: "Cross-functional Collaboration",
        lesson: "I migliori designer sanno negoziare tra UX ideale e vincoli reali. La soluzione perfetta che non può essere implementata non esiste.",
      },
    ],
    "Web Development": [
      {
        id: 1,
        title: "Code Review del Collega",
        context: "Sono le 9:30. Il tuo lead ti assegna la review del codice di un altro stagista. Ha creato un componente React per la card prodotto, ma qualcosa non ti convince nel codice.",
        challenge: "Guardi il codice e noti che usa `document.getElementById` dentro un useEffect per manipolare il DOM. Cosa fai?",
        choices: [
          {
            id: "a",
            text: "Lasci un commento spiegando che in React si usa useRef per accedere al DOM, e alleghi un esempio di come refactorare",
            isCorrect: true,
            feedback: "Perfetto! Hai identificato un anti-pattern (manipolazione DOM diretta in React) e hai fornito la soluzione corretta con un esempio. Una code review costruttiva insegna, non critica.",
          },
          {
            id: "b",
            text: "Approvi il PR, funziona comunque e non vuoi sembrare pignolo con un altro stagista",
            feedback: "Attenzione! Il codice 'che funziona' oggi può causare bug domani. Approvare codice problematico non aiuta il collega a crescere e peggiora la qualità del codebase.",
          },
          {
            id: "c",
            text: "Riscrivi tu il componente nel modo corretto e sostituisci il suo codice",
            feedback: "Riscrivere il codice di qualcun altro senza discussione è irrispettoso e toglie l'opportunità di apprendimento. La code review è collaborazione, non imposizione.",
          },
        ],
        skill: "Code Review & Mentorship",
        lesson: "Una buona code review bilancia qualità del codice e crescita del team. Spiega il 'perché', non solo il 'cosa'.",
      },
      {
        id: 2,
        title: "Implementazione Feature",
        context: "Dal backlog Jira prendi il ticket 'Creare componente ProductCard responsive'. I requisiti: immagine, titolo, prezzo, bottone 'Aggiungi'. Il designer ti ha passato le specifiche.",
        challenge: "Inizi a scrivere il componente. Come strutturi le props di ProductCard?",
        choices: [
          {
            id: "a",
            text: "Props tipizzate: { product: Product } dove Product è un'interfaccia con id, title, price, imageUrl, onAddToCart callback",
            isCorrect: true,
            feedback: "Eccellente! Hai creato un'interfaccia chiara e riutilizzabile. Passare l'intero oggetto Product rende il componente flessibile, e il callback onAddToCart mantiene la logica nel parent.",
          },
          {
            id: "b",
            text: "Props singole: { title: string, price: number, image: string } più semplice e diretto",
            feedback: "Funziona per casi semplici, ma quando avrai bisogno di id, stock, categoria, avrai 10+ props. Raggruppare in un oggetto Product scala meglio.",
          },
          {
            id: "c",
            text: "Nessuna prop: il componente fa fetch dei dati del prodotto internamente dato un productId",
            feedback: "Questo viola il principio di 'dumb components'. Una ProductCard che fa fetch è difficile da testare, riutilizzare e può causare waterfall di richieste.",
          },
        ],
        skill: "Component Architecture",
        lesson: "Componenti ben strutturati sono riutilizzabili, testabili e scalabili. Investi tempo nel design delle props, ripaga nel lungo termine.",
      },
      {
        id: 3,
        title: "Debugging Misterioso",
        context: "La chiamata API per il catalogo prodotti restituisce 500 in alcuni casi. Apri i DevTools e noti che fallisce solo quando l'utente ha più di 50 prodotti nel carrello.",
        challenge: "Hai identificato il pattern. Qual è il prossimo step di debugging?",
        choices: [
          {
            id: "a",
            text: "Controlli il payload della request per vedere se supera un limite di dimensione, poi verifichi i log del backend per l'errore specifico",
            isCorrect: true,
            feedback: "Perfetto! Hai seguito un processo sistematico: prima confermi l'ipotesi (payload size), poi cerchi l'errore esatto nei log. Il debugging metodico batte il 'provare a caso'.",
          },
          {
            id: "b",
            text: "Aggiungi un try-catch nel frontend per gestire l'errore e mostrare un messaggio generico all'utente",
            feedback: "Stai nascondendo il problema, non risolvendolo. Gli utenti con 50+ prodotti continueranno a non poter completare l'ordine.",
          },
          {
            id: "c",
            text: "Scrivi subito al team backend dicendo che la loro API è rotta",
            feedback: "Segnalare senza investigare è poco professionale. Potrebbe essere un problema frontend (payload malformato), un limite intenzionale, o un bug backend. Prima capisci, poi comunica.",
          },
        ],
        skill: "Systematic Debugging",
        lesson: "Il debugging efficace segue un metodo: riproduci, isola, verifica l'ipotesi, trova la root cause. Mai saltare alla soluzione.",
      },
      {
        id: 4,
        title: "Deploy Venerdì Sera",
        context: "Sono le 17:30 di venerdì. La tua feature è pronta, i test passano. Il lead chiede: 'Puoi fare merge e deploy? Così lunedì il cliente vede la nuova feature.'",
        challenge: "Cosa fai?",
        choices: [
          {
            id: "a",
            text: "Fai merge su staging, verifichi che funzioni, ma proponi di deployare in produzione lunedì mattina con il team presente",
            isCorrect: true,
            feedback: "Ottima gestione del rischio! Hai completato il lavoro (staging) ma evitato il rischio di un deploy il venerdì sera senza supporto. Se qualcosa va storto nel weekend, nessuno può intervenire.",
          },
          {
            id: "b",
            text: "Deploy immediato in produzione: i test passano, cosa può andare storto?",
            feedback: "Il famoso 'Friday deploy' è un anti-pattern per un motivo. I test non coprono tutto: integrazioni, edge cases, comportamenti reali. Se esplode sabato, chi interviene?",
          },
          {
            id: "c",
            text: "Dici al lead che preferisci non fare deploy oggi perché è venerdì",
            feedback: "Rifiutare senza proporre alternative non è professionale. Meglio offrire un compromesso (staging oggi, prod lunedì) che un semplice 'no'.",
          },
        ],
        skill: "Risk Management",
        lesson: "'Deploy on Friday' è un meme per un motivo. I developer esperti bilanciano velocità e rischio, proponendo alternative quando necessario.",
      },
    ],
    "Digital Marketing": [
      {
        id: 1,
        title: "Analisi Campagna Social",
        context: "Sono le 9:00. Apri Meta Business Suite. La campagna Instagram 'Summer Sale' è terminata. Budget: €500. Devi preparare il report per il cliente.",
        challenge: "Vedi questi dati: Reach 45.000, Engagement Rate 1.2%, Link Clicks 380, Purchases 12. Il cliente si aspettava 50 vendite. Come presenti i risultati?",
        choices: [
          {
            id: "a",
            text: "Analizzi il funnel: 'Il problema non è la campagna ma la landing page. 380 click ma solo 12 acquisti = 3% conversion rate, molto sotto la media del 5-8%. Propongo A/B test sulla pagina.'",
            isCorrect: true,
            feedback: "Eccellente analisi! Hai identificato dove si perde il traffico (landing page, non ads) e proposto una soluzione concreta. Il cliente apprezzerà la diagnosi precisa invece di scuse vaghe.",
          },
          {
            id: "b",
            text: "Evidenzi i numeri positivi: '45.000 persone raggiunte! Grande awareness per il brand.'",
            feedback: "Stai mascherando il fallimento con vanity metrics. Il cliente voleva vendite, non reach. La fiducia si costruisce con onestà, non con spin positivo.",
          },
          {
            id: "c",
            text: "Ammetti che la campagna non ha funzionato e proponi di riprovare con budget maggiore",
            feedback: "Senza capire PERCHÉ non ha funzionato, più budget significherà solo più soldi sprecati. Prima diagnosi, poi strategia.",
          },
        ],
        skill: "Data-Driven Analysis",
        lesson: "I buoni marketer sanno leggere il funnel e identificare dove si perde valore. I numeri raccontano una storia, devi saperla interpretare.",
      },
      {
        id: 2,
        title: "Piano Editoriale",
        context: "Il cliente (brand di skincare naturale) ha approvato la strategia. Devi creare il piano per le prossime 2 settimane: 8 post Instagram.",
        challenge: "Quale mix di contenuti proponi?",
        choices: [
          {
            id: "a",
            text: "4 post educativi (benefici ingredienti), 2 UGC/testimonial, 1 behind-the-scenes produzione, 1 promo con CTA diretta",
            isCorrect: true,
            feedback: "Mix perfetto! Segui la regola 80/20: 80% valore (education, social proof, storytelling) e 20% vendita diretta. Gli utenti seguono brand che li aiutano, non che vendono sempre.",
          },
          {
            id: "b",
            text: "8 post prodotto con sconti diversi ogni giorno per massimizzare le vendite",
            feedback: "Spam promozionale brucia l'audience. Gli utenti smettono di seguire brand che vendono sempre. Inoltre, sconti continui svalutano il brand.",
          },
          {
            id: "c",
            text: "8 post estetici con foto prodotto bellissime e caption minimali",
            feedback: "L'estetica attira, ma senza contenuto di valore o CTA, stai costruendo awareness senza conversione. Servono entrambi.",
          },
        ],
        skill: "Content Strategy",
        lesson: "Il content marketing efficace bilancia valore per l'utente e obiettivi business. La regola 80/20 funziona su quasi tutti i canali social.",
      },
      {
        id: 3,
        title: "Crisi Social",
        context: "È mercoledì pomeriggio. Un influencer con 50K follower commenta un tuo post: 'Questo brand fa greenwashing! I loro ingredienti non sono davvero naturali.' Il commento sta diventando virale.",
        challenge: "Il tuo responsabile è in ferie. Cosa fai nelle prossime 2 ore?",
        choices: [
          {
            id: "a",
            text: "Rispondi pubblicamente con calma, ringraziando per il feedback e condividendo il link alle certificazioni degli ingredienti. Poi mandi un DM all'influencer proponendo di approfondire",
            isCorrect: true,
            feedback: "Gestione perfetta! Risposta pubblica (trasparenza), prove concrete (certificazioni), e apertura al dialogo privato (de-escalation). Hai trasformato una crisi in opportunità di mostrare autenticità.",
          },
          {
            id: "b",
            text: "Nascondi il commento per evitare che altri lo vedano, aspetti il responsabile",
            feedback: "Mai nascondere! L'influencer farà screenshot, la cosa diventerà 'brand censura le critiche', e la crisi raddoppierà. La trasparenza è l'unica via.",
          },
          {
            id: "c",
            text: "Rispondi difendendo aggressivamente il brand: 'Queste accuse sono false e diffamatorie'",
            feedback: "Tono aggressivo = benzina sul fuoco. Anche se hai ragione, sembrerai sulla difensiva. La calma e le prove battono sempre l'aggressività.",
          },
        ],
        skill: "Crisis Management",
        lesson: "Nelle crisi social: rispondi veloce, con calma, con prove. Mai nascondere, mai aggredire. La trasparenza costruisce più fiducia di qualsiasi campagna.",
      },
      {
        id: 4,
        title: "Report al Cliente",
        context: "Venerdì 17:00. Devi inviare il report settimanale. La campagna questa settimana ha performato sotto le aspettative: -15% rispetto alla scorsa.",
        challenge: "Come strutturi il report?",
        choices: [
          {
            id: "a",
            text: "Apri con i dati negativi, poi analizzi le cause (competitor ha lanciato promo, algoritmo cambiato), chiudi con 3 azioni concrete per la prossima settimana",
            isCorrect: true,
            feedback: "Professionale e proattivo! Onestà sui numeri + analisi delle cause + piano d'azione = cliente che si fida di te. Nascondere i problemi li fa solo crescere.",
          },
          {
            id: "b",
            text: "Evidenzi le metriche che sono andate bene e minimizzi quelle negative",
            feedback: "I clienti non sono stuppi. Vedranno i numeri veri prima o poi. Meglio essere tu a presentarli con contesto che farli scoprire da soli.",
          },
          {
            id: "c",
            text: "Rimandi il report a lunedì sperando che nel weekend i numeri migliorino",
            feedback: "Rimandare non cambia i numeri e rompe la fiducia sulla puntualità. Affronta i problemi, non evitarli.",
          },
        ],
        skill: "Client Communication",
        lesson: "I report migliori sono onesti, analitici e proattivi. I clienti apprezzano chi affronta i problemi, non chi li nasconde.",
      },
    ],
    "Data Analysis e Data Science": [
      {
        id: 1,
        title: "Pulizia Dataset",
        context: "Sono le 9:00. Ricevi un CSV con 50.000 righe di vendite degli ultimi 6 mesi. Prima di qualsiasi analisi, apri il file e noti subito problemi.",
        challenge: "Trovi queste anomalie: 5% di valori 'NULL' nella colonna 'prezzo', 200 righe con date in formato diverso (DD/MM vs MM/DD), 150 righe duplicate. In che ordine le affronti?",
        choices: [
          {
            id: "a",
            text: "1) Duplicati (rimuovi), 2) Date (standardizza formato), 3) NULL (analizza se sono missing at random o sistematici prima di decidere come gestirli)",
            isCorrect: true,
            feedback: "Ordine perfetto! Duplicati sono errori certi da rimuovere. Date sono un fix tecnico. I NULL richiedono analisi: potrebbero essere prodotti gratuiti, errori di sistema, o dati mancanti. Trattarli tutti uguali sarebbe un errore.",
          },
          {
            id: "b",
            text: "Rimuovi tutte le righe con problemi (duplicati, date strane, NULL) per avere dati puliti",
            feedback: "Stai buttando il 6% dei dati senza capire perché sono 'sporchi'. Alcuni NULL potrebbero essere informativi (es. prodotti in promo gratuita). Analizza prima, agisci poi.",
          },
          {
            id: "c",
            text: "Sostituisci tutti i NULL con la media dei prezzi, così puoi procedere velocemente",
            feedback: "Sostituire con la media può distorcere l'analisi. Se i NULL sono prodotti gratuiti, stai inventando prezzi. Se sono errori di un negozio specifico, stai mascherando un pattern.",
          },
        ],
        skill: "Data Cleaning Strategy",
        lesson: "La pulizia dati richiede giudizio, non solo regole. Ogni anomalia potrebbe essere un errore O un insight. Analizza prima di correggere.",
      },
      {
        id: 2,
        title: "Analisi Esplorativa",
        context: "Dataset pulito. Il tuo manager chiede: 'Voglio capire cosa guida le vendite. Trovami gli insight principali.' Hai 3 ore.",
        challenge: "Da dove parti con l'analisi esplorativa (EDA)?",
        choices: [
          {
            id: "a",
            text: "Distribuzione vendite per prodotto (top 20%), per tempo (stagionalità?), per regione. Poi correlazioni tra variabili.",
            isCorrect: true,
            feedback: "Approccio strutturato! Pareto (quali prodotti contano), tempo (ci sono pattern?), geografia (dove vendiamo?), correlazioni (cosa influenza cosa?). Hai coperto le domande fondamentali prima di andare in profondità.",
          },
          {
            id: "b",
            text: "Crei subito un modello predittivo per impressionare il manager con machine learning",
            feedback: "ML senza EDA è come costruire senza fondamenta. Non sai nemmeno se i dati supportano un modello. L'EDA ti dice COSA modellare e SE ha senso farlo.",
          },
          {
            id: "c",
            text: "Calcoli media, mediana, deviazione standard di tutte le variabili numeriche",
            feedback: "Le statistiche descrittive sono un inizio, ma non raccontano la storia. Il manager vuole insight actionable, non numeri. Servono visualizzazioni e analisi comparative.",
          },
        ],
        skill: "Exploratory Data Analysis",
        lesson: "L'EDA efficace segue un framework: distribuzione, tempo, segmenti, correlazioni. Rispondi alle domande di business, non produrre statistiche random.",
      },
      {
        id: 3,
        title: "Costruzione Dashboard",
        context: "I tuoi insight hanno impressionato il manager. Ora vuole una dashboard per il team sales che possano usare autonomamente.",
        challenge: "Devi decidere quali metriche mettere nella dashboard. Il sales manager dice: 'Voglio vedere tutto!' Cosa fai?",
        choices: [
          {
            id: "a",
            text: "Proponi 5-7 KPI chiave allineati agli obiettivi del team (revenue, conversion rate, avg order value, top products, trend vs target) con filtri per periodo e regione",
            isCorrect: true,
            feedback: "Perfetto! 'Vedere tutto' non significa 'mostrare tutto'. Una dashboard efficace ha poche metriche actionable, non 50 grafici che nessuno guarda. I filtri danno flessibilità senza complessità.",
          },
          {
            id: "b",
            text: "Crei una dashboard con tutti i 30+ KPI disponibili, così il sales manager può scegliere cosa guardare",
            feedback: "Troppe metriche = nessuna metrica. Gli utenti si perderanno e non useranno la dashboard. Less is more: scegli tu le metriche importanti, è il tuo lavoro.",
          },
          {
            id: "c",
            text: "Chiedi al sales manager quali specifici KPI vuole, così sei sicuro di non sbagliare",
            feedback: "Chiedere input è giusto, ma 'dimmi tu cosa vuoi' sposta la responsabilità. Il tuo valore è proporre basandoti sui dati e sugli obiettivi, poi iterare.",
          },
        ],
        skill: "Data Visualization Design",
        lesson: "Le dashboard migliori sono opinionated: mostrano cosa conta, non tutto ciò che esiste. Il tuo lavoro è filtrare il rumore, non aggiungerlo.",
      },
      {
        id: 4,
        title: "Presentazione al Management",
        context: "Il direttore commerciale ti ha dato 15 minuti per presentare i tuoi insight. È la tua prima presentazione al leadership.",
        challenge: "Hai trovato che il 30% del revenue viene da 5 prodotti con margini bassissimi. Come presenti questo insight delicato?",
        choices: [
          {
            id: "a",
            text: "'Questi 5 prodotti generano 30% del revenue ma hanno margini inferiori alla media. Ho analizzato 3 opzioni: aumentare prezzi, usarli come loss leaders per cross-sell, o ottimizzare i costi. Ecco i numeri per ogni scenario.'",
            isCorrect: true,
            feedback: "Presentazione da senior! Hai dato il contesto, non hai criticato le scelte passate, e hai proposto opzioni concrete con dati. Il direttore può decidere, tu hai fatto il tuo lavoro.",
          },
          {
            id: "b",
            text: "'C'è un problema: stiamo perdendo margini su questi prodotti. Dobbiamo ripensare la strategia.'",
            feedback: "Stai criticando senza proporre. Il direttore potrebbe sapere già di questi prodotti e averli scelti intenzionalmente. Senza alternative, sembri solo lamentarti.",
          },
          {
            id: "c",
            text: "Eviti l'argomento e presenti solo gli insight positivi, per non creare tensioni alla prima presentazione",
            feedback: "Nascondere insight importanti non è professionale. Sei stato assunto per dire la verità ai dati, non per fare bella figura. La credibilità si costruisce con onestà.",
          },
        ],
        skill: "Executive Communication",
        lesson: "Presentare al leadership richiede: dati + contesto + opzioni. Mai criticare senza proporre. Mai nascondere per paura. I numeri sono neutrali, la presentazione no.",
      },
    ],
    "Non lo so": [
      {
        id: 1,
        title: "Gestione Kickoff Meeting",
        context: "Sono le 10:00. Oggi c'è il kickoff di un nuovo progetto: un'app per un cliente nel settore fitness. Tu devi facilitare la riunione.",
        challenge: "Mancano 5 minuti al meeting. Il designer non ha ancora mandato i mockup che doveva preparare. Cosa fai?",
        choices: [
          {
            id: "a",
            text: "Scrivi velocemente al designer chiedendo un ETA, poi prepari un'agenda B che funzioni anche senza mockup (focus su obiettivi e timeline invece che visual)",
            isCorrect: true,
            feedback: "Gestione perfetta! Hai verificato la situazione, preparato un piano B, e il meeting può procedere comunque. Il buon PM anticipa i problemi e ha sempre alternative.",
          },
          {
            id: "b",
            text: "Rimandi il meeting di 30 minuti per dare tempo al designer",
            feedback: "Rimandare all'ultimo minuto spreca il tempo di tutti i partecipanti e dà un'impressione di disorganizzazione. Un kickoff può partire senza mockup finali.",
          },
          {
            id: "c",
            text: "Inizi il meeting e improvvisi quando arrivi alla parte dei mockup",
            feedback: "Improvvisare porta a meeting inefficienti e imbarazzanti. Il PM deve sempre avere un piano, anche quando le cose non vanno come previsto.",
          },
        ],
        skill: "Meeting Facilitation",
        lesson: "I buoni facilitatori hanno sempre un piano B. Il meeting deve funzionare anche quando mancano elementi: focalizzati su ciò che puoi controllare.",
      },
      {
        id: 2,
        title: "Documentazione Progetto",
        context: "Il tuo manager ti chiede di aggiornare la documentazione su Notion. 'È un disastro, nessuno trova niente.' Hai mezza giornata.",
        challenge: "Apri Notion: 47 pagine sparse, nomi inconsistenti, info duplicate. Da dove parti?",
        choices: [
          {
            id: "a",
            text: "Crei prima una struttura logica (Home > Progetti > [Nome progetto] > Docs, Assets, Meeting notes), poi sposti le pagine esistenti nella nuova struttura",
            isCorrect: true,
            feedback: "Approccio metodico! Prima l'architettura, poi il contenuto. Spostare pagine in una struttura random crea altro caos. 30 minuti di pianificazione salvano ore di confusione.",
          },
          {
            id: "b",
            text: "Inizi a rinominare e riordinare le pagine una per una, partendo dalle più recenti",
            feedback: "Senza una struttura target, stai riorganizzando nel vuoto. Potresti finire con un caos solo leggermente diverso. Prima disegna la mappa, poi muovi le cose.",
          },
          {
            id: "c",
            text: "Elimini tutte le pagine vecchie e parti da zero con un nuovo setup",
            feedback: "Rischi di perdere informazioni importanti che qualcuno sta usando. La riorganizzazione è preferibile alla distruzione, specialmente senza backup.",
          },
        ],
        skill: "Information Architecture",
        lesson: "Organizzare informazioni richiede pensiero sistemico: prima la struttura, poi il contenuto. Vale per Notion, per codice, per qualsiasi sistema complesso.",
      },
      {
        id: 3,
        title: "Conflitto tra Team",
        context: "I designer dicono che i developer cambiano sempre il design. I developer dicono che i design sono impossibili da implementare. Entrambi si lamentano con te.",
        challenge: "Come affronti questo conflitto ricorrente?",
        choices: [
          {
            id: "a",
            text: "Organizzi un workshop congiunto per creare insieme un 'Design Handoff Checklist': cosa deve contenere ogni design prima dello sviluppo, e quali feedback i dev possono dare prima dell'implementazione",
            isCorrect: true,
            feedback: "Soluzione strutturale! Invece di mediare caso per caso, hai creato un processo. La checklist diventa il 'contratto' tra team, riducendo frizioni future. I migliori PM risolvono le cause, non i sintomi.",
          },
          {
            id: "b",
            text: "Parli separatamente con ogni team lead per trovare un compromesso su questo progetto specifico",
            feedback: "Risolvi il problema oggi, ma tornerà domani. Senza un processo condiviso, ogni progetto avrà lo stesso conflitto. Pensa sistemico.",
          },
          {
            id: "c",
            text: "Riferisci la situazione al tuo manager e chiedi che intervenga con autorità",
            feedback: "Escalare subito ti fa sembrare incapace di gestire conflitti. Prova prima a risolverlo, l'escalation è l'ultima risorsa.",
          },
        ],
        skill: "Conflict Resolution",
        lesson: "I conflitti ricorrenti sono sintomi di problemi di processo. Risolvi il processo, non il singolo conflitto. Crea strutture che prevengono il problema.",
      },
      {
        id: 4,
        title: "Prioritizzazione Last-Minute",
        context: "Venerdì 15:00. Il cliente chiama: 'Ho urgenza di una feature nuova per lunedì.' Ma il team ha già il planning pieno per completare le feature promesse.",
        challenge: "Come gestisci questa richiesta?",
        choices: [
          {
            id: "a",
            text: "Chiedi al cliente: 'Qual è il problema di business che questa feature risolve?' Poi valuti se è davvero urgente, e se sì, proponi cosa slittare per farla entrare",
            isCorrect: true,
            feedback: "Gestione senior! Hai qualificato l'urgenza (spesso 'urgente' significa solo 'lo voglio'), e se è reale, hai proposto un trade-off trasparente. Il cliente deve capire che le risorse sono finite.",
          },
          {
            id: "b",
            text: "Dici sì al cliente e chiedi al team di lavorare nel weekend per consegnare tutto",
            feedback: "Stai bruciando il team per una richiesta non pianificata. Questo crea risentimento e non è sostenibile. Il PM protegge il team, non lo sacrifica.",
          },
          {
            id: "c",
            text: "Dici al cliente che non è possibile e la feature va pianificata per lo sprint successivo",
            feedback: "Rifiutare senza capire l'urgenza può danneggiare la relazione. Magari è davvero critica. Prima qualifica, poi decidi.",
          },
        ],
        skill: "Stakeholder Management",
        lesson: "Le richieste 'urgenti' raramente lo sono davvero. Il buon PM qualifica sempre l'urgenza, propone trade-off, e protegge il team da scope creep.",
      },
    ],
  };

  return tasksByArea[area] || tasksByArea["Non lo so"];
};

const generateFinalScenario = (area: string): { context: string; situation: string; choices: { id: string; text: string; outcome: string }[] } => {
  const scenarios: Record<string, { context: string; situation: string; choices: { id: string; text: string; outcome: string }[] }> = {
    "UX/UI Design": {
      context: "È passato un mese. Il redesign di QuickBite è in produzione. I dati mostrano -40% di abbandono carrello.",
      situation: "Il cliente è entusiasta e vuole affidarti un nuovo progetto più grande: riprogettare l'intera app da zero. Ma il tuo lead ti propone anche di restare sul progetto attuale per ottimizzare ulteriormente, con potenziale promozione tra 6 mesi.",
      choices: [
        {
          id: "a",
          text: "Accetti il nuovo progetto: è l'occasione per crescere e mostrare cosa sai fare su larga scala",
          outcome: "Scelta coraggiosa! Il nuovo progetto è sfidante ma ti fa crescere velocemente. Dopo 3 mesi difficili, consegni un lavoro eccellente e vieni riconosciuto come designer capace di gestire progetti complessi.",
        },
        {
          id: "b",
          text: "Resti sul progetto attuale: preferisci consolidare le competenze e puntare alla promozione sicura",
          outcome: "Scelta saggia! Approfondisci l'ottimizzazione, impari molto su A/B testing e analytics. La promozione arriva come promesso, e hai una base solida per progetti futuri.",
        },
        {
          id: "c",
          text: "Chiedi se puoi fare entrambi part-time per non rinunciare a nessuna opportunità",
          outcome: "Ambizioso! Il lead accetta ma ti avvisa dei rischi. I primi due mesi sono duri, ma impari a gestire priorità e delegare. Alla fine ottieni il meglio di entrambi i mondi.",
        },
      ],
    },
    "Web Development": {
      context: "Dopo 3 mesi, sei diventato il riferimento per il frontend nel team. Il codice che scrivi è pulito e ben documentato.",
      situation: "Il CTO ti propone due percorsi: specializzarti in frontend avanzato (performance, animazioni, accessibility) oppure passare al full-stack imparando backend e database.",
      choices: [
        {
          id: "a",
          text: "Scegli frontend avanzato: vuoi diventare esperto in una cosa, non mediocre in due",
          outcome: "La specializzazione paga. In 6 mesi diventi il 'go-to person' per performance e a11y. I progetti più prestigiosi passano da te. La T-shaped career funziona.",
        },
        {
          id: "b",
          text: "Scegli full-stack: vuoi capire l'intero sistema e avere più opzioni di carriera",
          outcome: "Curva di apprendimento ripida, ma dopo un anno sai costruire prodotti completi da solo. Questo ti apre porte verso ruoli di tech lead e architettura.",
        },
        {
          id: "c",
          text: "Chiedi di restare generalista ancora 6 mesi prima di decidere",
          outcome: "Scelta prudente. Usi il tempo per esplorare entrambe le aree in progetti reali. Quando decidi, la scelta è informata e consapevole. Non c'è fretta di specializzarsi.",
        },
      ],
    },
    "Digital Marketing": {
      context: "Le tue campagne hanno portato +35% di conversioni in 4 mesi. Il cliente è diventato un caso studio per l'agenzia.",
      situation: "Ti viene offerta la gestione di un cliente enterprise con budget 10x maggiore, ma anche pressione e aspettative 10x. In alternativa, puoi prendere 3 clienti small business e costruire il tuo portfolio.",
      choices: [
        {
          id: "a",
          text: "Prendi l'enterprise: è l'occasione per fare il salto e imparare a gestire budget importanti",
          outcome: "I primi mesi sono intensi. Fai errori, impari, migliori. Dopo un anno gestisci campagne da milioni e hai competenze che pochi junior hanno. Il rischio ha pagato.",
        },
        {
          id: "b",
          text: "Prendi i 3 small business: preferisci varietà e autonomia rispetto alla pressione enterprise",
          outcome: "Ogni cliente è diverso: impari ad adattarti, a essere creativo con budget limitati. Dopo un anno hai un portfolio variegato e sai gestire qualsiasi tipo di progetto.",
        },
        {
          id: "c",
          text: "Proponi un mix: enterprise come supporto a un senior, più un small business tuo",
          outcome: "Il meglio di entrambi i mondi. Impari dall'enterprise senza la pressione totale, e hai il tuo progetto per sperimentare. Crescita bilanciata e sostenibile.",
        },
      ],
    },
    "Data Analysis e Data Science": {
      context: "I tuoi insight hanno influenzato decisioni strategiche. Il management ti considera una risorsa preziosa.",
      situation: "Ti propongono due percorsi: rimanere analyst e diventare senior (più presentazioni, meno codice) oppure spostarti verso data engineering (più tecnico, pipeline e infrastruttura).",
      choices: [
        {
          id: "a",
          text: "Senior Analyst: ti piace l'impatto strategico e comunicare con il business",
          outcome: "In un anno presenti al board, influenzi la strategia aziendale, guidi junior analyst. Il codice diminuisce ma l'impatto aumenta. Sei diventato un traduttore tra dati e business.",
        },
        {
          id: "b",
          text: "Data Engineering: preferisci costruire sistemi robusti che scalano",
          outcome: "Impari infrastruttura, pipeline, cloud. Meno visibilità ma lavoro tecnico che ti soddisfa. Le tue pipeline processano milioni di righe e abilitano tutto il team analytics.",
        },
        {
          id: "c",
          text: "Chiedi un ruolo ibrido: analytics engineer, che unisce entrambi",
          outcome: "Ruolo emergente e molto richiesto. Costruisci pipeline E fai analysis. Dopo un anno sei uno dei pochi che capisce end-to-end, dalla raccolta dati all'insight finale.",
        },
      ],
    },
    "Non lo so": {
      context: "Dopo 6 mesi di esplorazione, hai capito cosa ti piace e cosa no. Hai lavorato con tutti i team.",
      situation: "Devi scegliere dove specializzarti. Il tuo manager ti presenta tre opzioni basate su dove hai brillato di più.",
      choices: [
        {
          id: "a",
          text: "Product Management: ti è piaciuto definire cosa costruire e perché",
          outcome: "Il ruolo perfetto per chi pensa strategicamente e ama coordinare. In un anno gestisci la roadmap di un prodotto e sei il ponte tra business, design e tech.",
        },
        {
          id: "b",
          text: "Project Management: hai brillato nell'organizzazione e nel far succedere le cose",
          outcome: "Diventi il collante che tiene insieme i progetti. In un anno gestisci 3 progetti in parallelo, il team ti adora perché risolvi i problemi prima che esplodano.",
        },
        {
          id: "c",
          text: "Chiedi altri 3 mesi di esplorazione in un'area che non hai ancora provato",
          outcome: "Scopri che ti appassiona il growth hacking, che non avevi considerato. A volte la risposta è dove non hai ancora guardato. La pazienza nell'esplorare paga.",
        },
      ],
    },
  };

  return scenarios[area] || scenarios["Non lo so"];
};

export const generateScenario = (profile: UserProfile): SimulationScenario => {
  const area = profile.digitalArea || "Non lo so";
  const bgType = getBackgroundType(profile.background);
  const roleInfo = roleMap[area]?.[bgType] || roleMap[area]?.["default"] || roleMap["Non lo so"]["default"];

  const morningIntros: Record<string, string> = {
    "UX/UI Design": `Sono le 8:55. Entri in ufficio con il tuo caffè, saluti il team e ti siedi alla tua postazione. Due monitor, Figma già aperto, post-it colorati ovunque. La playlist lo-fi parte in automatico. Oggi è una giornata intensa: c'è un nuovo progetto sul tavolo.`,
    "Web Development": `Sono le 9:00. Ti colleghi da remoto, apri VS Code e Slack. Il daily standup è tra 15 minuti. Controlli le notifiche: 2 PR da revieware, 1 ticket assegnato e un messaggio del lead che dice 'Buongiorno! Oggi deploy importante.' Caffè pronto, cuffie on.`,
    "Digital Marketing": `Sono le 8:45. Apri il laptop al coworking, il profumo del cappuccino ancora nell'aria. Prima cosa: controllare i social del cliente. 23 notifiche Instagram, 5 commenti da moderare. La campagna di ieri ha performato bene. Oggi si analizza e si pianifica.`,
    "Data Analysis e Data Science": `Sono le 9:15. Arrivi in ufficio, Jupyter Notebook già caricato mentalmente. Sul tuo desk: due monitor, Python in esecuzione perpetua e una tazza che dice 'I love data'. Oggi il team sales aspetta i tuoi insight per la strategia Q2.`,
    "Non lo so": `Sono le 9:00. Entri in agenzia, saluti tutti e ti prepari per la giornata. Come project coordinator, ogni giorno è diverso: oggi hai un kickoff, due follow-up e una deadline che si avvicina. Apri Notion, controlli la to-do list e parti.`,
  };

  const conclusions: Record<string, string> = {
    "UX/UI Design": `Questo lavoro valorizza la tua capacità di osservare, analizzare e risolvere problemi in modo creativo. Il tuo background ti dà una prospettiva unica: non sei solo un designer, sei qualcuno che capisce perché le cose funzionano.`,
    "Web Development": `Il tuo percorso ti ha preparato a pensare in modo logico e strutturato. Come developer, trasformi idee in realtà funzionanti. Ogni riga di codice è un piccolo atto di problem-solving.`,
    "Digital Marketing": `La tua sensibilità comunicativa è un asset prezioso. Nel digital marketing, unisci creatività e analisi per connettere brand e persone. Il tuo background ti permette di vedere opportunità dove altri vedono solo dati.`,
    "Data Analysis e Data Science": `Il tuo approccio metodico trova casa perfetta nell'analisi dati. Trasformi numeri in storie, pattern in decisioni. Il tuo background ti dà la capacità di vedere il quadro completo.`,
    "Non lo so": `La tua versatilità è un superpotere. In un mondo digitale sempre più complesso, chi sa navigare tra discipline diverse diventa indispensabile. Il tuo background ti permette di fare da ponte tra team e competenze.`,
  };

  const encouragements: Record<string, string> = {
    "UX/UI Design": `Hai appena vissuto una giornata tipo nel mondo UX/UI. Non è solo disegnare schermate: è capire le persone, risolvere problemi e comunicare soluzioni. Il tuo background in "${profile.background}" ti dà un vantaggio unico: porti una prospettiva diversa in ogni progetto.\n\nIl percorso per diventare UX/UI Designer richiede pratica, curiosità e tanta empatia. Ma la verità è che hai già le basi: sai osservare, sai chiederti "perché", sai immaginare come potrebbero andare le cose.\n\nInizia con piccoli progetti personali, esplora Figma, leggi casi studio. Ogni interfaccia che usi diventa un'opportunità di apprendimento.`,
    "Web Development": `Hai appena vissuto una giornata tipo nel mondo dello sviluppo web. Non è solo scrivere codice: è risolvere puzzle, costruire soluzioni e collaborare con un team. Il tuo background in "${profile.background}" ti dà una marcia in più.\n\nDiventare developer richiede pratica costante e pazienza con gli errori. Ma ogni bug risolto è una lezione, ogni feature completata è una vittoria.\n\nInizia con progetti piccoli ma reali. Un portfolio personale, una to-do app. La teoria serve, ma è facendo che si impara davvero.`,
    "Digital Marketing": `Hai appena vissuto una giornata tipo nel digital marketing. Non è solo postare sui social: è capire le persone, analizzare dati e raccontare storie che coinvolgono. Il tuo background in "${profile.background}" è un asset.\n\nIl marketing digitale evolve continuamente, quindi la curiosità è la tua skill più importante. Sperimenta, misura, impara, ripeti.\n\nInizia gestendo i social di un progetto personale. Impara Google Analytics, esplora le ads. Ogni brand che segui diventa un caso studio.`,
    "Data Analysis e Data Science": `Hai appena vissuto una giornata tipo nel mondo dei dati. Non è solo fare grafici: è trovare storie nascoste nei numeri e guidare decisioni concrete. Il tuo background in "${profile.background}" ti dà rigore e metodo.\n\nL'analisi dati richiede pazienza e curiosità infinita. Ma la soddisfazione di trovare un pattern che nessuno aveva visto è impagabile.\n\nInizia con dataset pubblici su Kaggle, impara Python o R. Ogni dataset è un puzzle che aspetta di essere risolto.`,
    "Non lo so": `Hai appena vissuto una giornata tipo in un ruolo che combina competenze diverse. Non saper ancora cosa vuoi fare non è una debolezza: è un'opportunità per esplorare. Il tuo background in "${profile.background}" ti dà fondamenta solide.\n\nIl mondo digitale ha bisogno di persone versatili che sappiano fare da ponte tra specialisti.\n\nEsplora diverse aree, prova corsi introduttivi. Scopri cosa ti fa perdere la cognizione del tempo. La carriera non è una linea retta, è un percorso di scoperta.`,
  };

  return {
    role: roleInfo.role,
    roleExplanation: roleInfo.explanation,
    morningIntro: morningIntros[area] || morningIntros["Non lo so"],
    tasks: generateTasks(area),
    finalScenario: generateFinalScenario(area),
    conclusion: conclusions[area] || conclusions["Non lo so"],
    encouragement: encouragements[area]?.replace("${profile.background}", profile.background) || encouragements["Non lo so"].replace("${profile.background}", profile.background),
  };
};

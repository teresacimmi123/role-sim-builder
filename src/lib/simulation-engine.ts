import { UserProfile, SimulationScenario, Task, SimulationChoice } from "@/types/simulation";

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

const generateTasks = (area: string, interests: string): Task[] => {
  const tasksByArea: Record<string, Task[]> = {
    "UX/UI Design": [
      {
        id: 1,
        title: "Analisi del Brief del Cliente",
        description: "Alle 9:15 apri la mail del tuo team lead. C'è il brief per un nuovo progetto: riprogettare l'app mobile di un'azienda di food delivery. Devi analizzare i requisiti, identificare i pain point degli utenti attuali e preparare una sintesi per il meeting delle 11.",
        skill: "Research & Analysis",
        purpose: "Comprendere il problema prima di progettare è fondamentale per creare soluzioni che funzionano davvero.",
        isCompleted: false,
      },
      {
        id: 2,
        title: "Creazione User Personas",
        description: "Sulla base dei dati delle interviste utente che il team ha condotto la scorsa settimana, devi creare 3 user personas. Apri Figma, usa il template aziendale e definisci: obiettivi, frustrazioni, comportamenti tipici e una citazione rappresentativa per ogni persona.",
        skill: "User Research",
        purpose: "Le personas guidano ogni decisione di design, assicurandoti di progettare per persone reali, non per te stesso.",
        isCompleted: false,
      },
      {
        id: 3,
        title: "Wireframing del Flusso Ordine",
        description: "È il momento di mettere le mani su Figma. Devi progettare il wireframe low-fidelity del flusso di ordinazione: dalla selezione del ristorante al checkout. Focus sulla semplicità e sulla riduzione dei passaggi.",
        skill: "Information Architecture",
        purpose: "I wireframe permettono di testare le idee rapidamente prima di investire tempo nel design visivo.",
        isCompleted: false,
      },
      {
        id: 4,
        title: "Presentazione al Team",
        description: "Alle 16:00 hai lo stand-up con il team. Devi presentare i tuoi wireframe in 5 minuti, spiegare le scelte fatte e raccogliere feedback. Prepara 3 punti chiave e anticipa le possibili obiezioni.",
        skill: "Communication & Collaboration",
        purpose: "Saper comunicare le proprie scelte di design è importante quanto saperle fare.",
        isCompleted: false,
      },
    ],
    "Web Development": [
      {
        id: 1,
        title: "Code Review del Codice Junior",
        description: "Alle 9:30 il tuo lead ti assegna la review del codice di un altro stagista. Devi controllare un componente React per la navbar: verificare la struttura, l'accessibilità, la nomenclatura delle variabili e lasciare commenti costruttivi.",
        skill: "Code Quality",
        purpose: "Le code review migliorano la qualità del codice e accelerano l'apprendimento di tutto il team.",
        isCompleted: false,
      },
      {
        id: 2,
        title: "Implementazione Feature Card Prodotto",
        description: "Dal backlog Jira prendi il ticket 'Creare componente ProductCard responsive'. Devi implementarlo in React con TypeScript, usando Tailwind per lo styling. La card deve mostrare: immagine, titolo, prezzo e bottone 'Aggiungi al carrello'.",
        skill: "Frontend Development",
        purpose: "Costruire componenti riutilizzabili è la base di un'architettura frontend scalabile.",
        isCompleted: false,
      },
      {
        id: 3,
        title: "Debugging API Integration",
        description: "La chiamata API per il catalogo prodotti restituisce un errore 500 in alcuni casi. Devi aprire i DevTools, analizzare le network requests, identificare il pattern dell'errore e proporre una soluzione al backend team.",
        skill: "Problem Solving & Debugging",
        purpose: "Il debugging è dove passerai molto tempo: sviluppare un metodo sistematico è essenziale.",
        isCompleted: false,
      },
      {
        id: 4,
        title: "Deploy su Ambiente di Staging",
        description: "Prima della fine della giornata, devi fare il merge del tuo branch su develop e verificare che la pipeline CI/CD passi. Controlla che la feature funzioni correttamente sull'ambiente di staging.",
        skill: "DevOps Basics",
        purpose: "Capire il flusso dal codice alla produzione ti rende uno sviluppatore più completo.",
        isCompleted: false,
      },
    ],
    "Digital Marketing": [
      {
        id: 1,
        title: "Analisi Performance Campagna Social",
        description: "Alle 9:00 apri Meta Business Suite. La campagna Instagram della scorsa settimana è terminata. Devi estrarre i KPI principali: reach, engagement rate, CPM, CPC e confrontarli con il benchmark del settore.",
        skill: "Data Analysis",
        purpose: "Ogni decisione di marketing deve essere supportata da dati per ottimizzare il ROI.",
        isCompleted: false,
      },
      {
        id: 2,
        title: "Creazione Piano Editoriale",
        description: "Il cliente ha approvato la strategia. Ora devi creare il piano editoriale per le prossime 2 settimane: 8 post Instagram, 4 stories e 2 reel. Definisci temi, copy, CTA e orari di pubblicazione ottimali.",
        skill: "Content Strategy",
        purpose: "Un piano editoriale strutturato garantisce coerenza e permette di misurare cosa funziona.",
        isCompleted: false,
      },
      {
        id: 3,
        title: "Setup Campagna Google Ads",
        description: "Il budget mensile è di €1.500. Devi creare una campagna Search per un e-commerce di scarpe: definire i gruppi di annunci, selezionare le keyword con Google Keyword Planner e scrivere 3 varianti di ad copy.",
        skill: "Paid Advertising",
        purpose: "Google Ads è uno strumento potentissimo: saperlo usare bene può trasformare un business.",
        isCompleted: false,
      },
      {
        id: 4,
        title: "Report Settimanale per il Cliente",
        description: "Alle 17:00 devi inviare il report settimanale. Usa il template aziendale, inserisci i dati delle performance, evidenzia i risultati positivi e proponi 2 ottimizzazioni per la prossima settimana.",
        skill: "Reporting & Communication",
        purpose: "Comunicare i risultati in modo chiaro costruisce fiducia con il cliente e dimostra il valore del tuo lavoro.",
        isCompleted: false,
      },
    ],
    "Data Analysis e Data Science": [
      {
        id: 1,
        title: "Pulizia Dataset Vendite",
        description: "Alle 9:00 ricevi un CSV con 50.000 righe di dati vendite degli ultimi 6 mesi. Prima di qualsiasi analisi, devi pulirlo: gestire valori mancanti, correggere formati date inconsistenti e rimuovere duplicati usando Python/Pandas.",
        skill: "Data Cleaning",
        purpose: "L'80% del lavoro di un data analyst è preparare i dati: dati puliti = analisi affidabili.",
        isCompleted: false,
      },
      {
        id: 2,
        title: "Analisi Esplorativa (EDA)",
        description: "Con il dataset pulito, devi esplorare i pattern: quali prodotti vendono di più? C'è stagionalità? Quali regioni performano meglio? Crea visualizzazioni con matplotlib/seaborn per ogni insight.",
        skill: "Exploratory Data Analysis",
        purpose: "L'EDA rivela storie nascoste nei dati e guida le domande giuste da fare.",
        isCompleted: false,
      },
      {
        id: 3,
        title: "Costruzione Dashboard Power BI",
        description: "Il team sales vuole monitorare le performance in tempo reale. Devi creare una dashboard con: revenue totale, trend mensile, top 10 prodotti e filtri per regione e categoria.",
        skill: "Data Visualization",
        purpose: "Una dashboard efficace permette ai decision-maker di agire sui dati senza bisogno di analisti.",
        isCompleted: false,
      },
      {
        id: 4,
        title: "Presentazione Insight al Management",
        description: "Alle 16:00 hai 15 minuti per presentare i tuoi finding al direttore commerciale. Prepara 5 slide: problema, metodologia, 3 insight chiave e 2 raccomandazioni actionable.",
        skill: "Storytelling with Data",
        purpose: "I dati non parlano da soli: la capacità di raccontarli determina il loro impatto.",
        isCompleted: false,
      },
    ],
    "Non lo so": [
      {
        id: 1,
        title: "Coordinamento Kickoff Meeting",
        description: "Alle 10:00 c'è il kickoff di un nuovo progetto. Devi preparare l'agenda, assicurarti che tutti i partecipanti abbiano i materiali e prendere note strutturate durante la riunione.",
        skill: "Project Coordination",
        purpose: "Un buon kickoff allinea il team e previene incomprensioni costose.",
        isCompleted: false,
      },
      {
        id: 2,
        title: "Aggiornamento Documentazione Progetto",
        description: "La documentazione su Notion del progetto in corso non è aggiornata. Devi sincronizzarti con i vari team member e aggiornare: timeline, deliverable completati e prossimi step.",
        skill: "Documentation",
        purpose: "Una documentazione chiara permette a chiunque di entrare nel progetto in qualsiasi momento.",
        isCompleted: false,
      },
      {
        id: 3,
        title: "Analisi Competitor per Pitch",
        description: "Il team sta preparando un pitch per un nuovo cliente. Devi analizzare 5 competitor: loro positioning, punti di forza, debolezze e creare una matrice comparativa.",
        skill: "Research & Analysis",
        purpose: "Conoscere il mercato è fondamentale per posizionarsi in modo distintivo.",
        isCompleted: false,
      },
      {
        id: 4,
        title: "Supporto Cross-funzionale",
        description: "Il team design ha bisogno di qualcuno che testi il prototipo dell'app. Devi seguire il test script, documentare i bug trovati e fornire feedback sulla user experience.",
        skill: "Quality Assurance",
        purpose: "La versatilità è un superpotere: chi sa fare un po' di tutto diventa indispensabile.",
        isCompleted: false,
      },
    ],
  };

  return tasksByArea[area] || tasksByArea["Non lo so"];
};

const generateInteractiveScenario = (area: string): { context: string; situation: string; choices: SimulationChoice[] } => {
  const scenarios: Record<string, { context: string; situation: string; choices: SimulationChoice[] }> = {
    "UX/UI Design": {
      context: "Sei alla tua seconda settimana di stage. Il team sta lavorando al redesign dell'app di food delivery.",
      situation: "Durante il meeting di review, il cliente guarda i tuoi wireframe e dice: 'Mi piace, ma il flusso di checkout sembra ancora troppo lungo. I nostri competitor lo fanno in 2 step.' Il tuo lead ti guarda, aspettando che tu risponda. Hai studiato i competitor e sai che in realtà ne servono almeno 3 per un'esperienza sicura.",
      choices: [
        {
          id: "a",
          text: "Proponi un compromesso: 3 step ma con progress bar chiara e possibilità di salvare i dati per acquisti futuri",
          outcome: "Ottima scelta! Hai dimostrato pensiero critico e capacità di negoziazione. Il cliente apprezza la soluzione e il tuo lead ti fa i complimenti per la gestione professionale.",
        },
        {
          id: "b",
          text: "Accetti la richiesta del cliente e prometti di ridurre a 2 step",
          outcome: "Il cliente è contento ora, ma quando scoprirà i problemi di sicurezza/UX sarà peggio. Il tuo lead ti prende da parte dopo il meeting per discutere l'importanza di educare il cliente.",
        },
        {
          id: "c",
          text: "Chiedi tempo per fare un A/B test con utenti reali prima di decidere",
          outcome: "Approccio molto professionale! Mettere i dati al centro della discussione è sempre vincente. Il cliente apprezza la metodologia e accetta di aspettare i risultati.",
        },
      ],
    },
    "Web Development": {
      context: "È venerdì pomeriggio, sei al tuo primo mese di stage. Il team sta per rilasciare una nuova feature.",
      situation: "Stai per fare il merge della tua feature quando noti che un test automatico fallisce. Il bug sembra essere in un componente che non hai toccato tu. Il release è schedulato per le 18:00 e sono le 16:30. Il tuo lead è in riunione.",
      choices: [
        {
          id: "a",
          text: "Investighi il bug, trovi la causa e la documenti. Poi scrivi al lead su Slack con la tua analisi",
          outcome: "Perfetto! Hai mostrato iniziativa e problem-solving. Il lead apprezza l'analisi dettagliata e insieme risolvete il bug in tempo per il release.",
        },
        {
          id: "b",
          text: "Aspetti che il lead esca dalla riunione per chiedergli cosa fare",
          outcome: "Comprensibile, ma hai perso tempo prezioso. Quando il lead esce, ci sono solo 30 minuti al release e la pressione è alta. Impari che è meglio agire proattivamente.",
        },
        {
          id: "c",
          text: "Fai il merge comunque, tanto il bug non è nel tuo codice",
          outcome: "Il release va in produzione con un bug. Anche se non era colpa tua, avresti potuto prevenirlo. Il team deve fare hotfix di venerdì sera. Lezione importante sulla responsabilità condivisa.",
        },
      ],
    },
    "Digital Marketing": {
      context: "Gestisci i social media per un cliente e-commerce di moda sostenibile. È il tuo secondo mese.",
      situation: "Un influencer con 50K follower commenta negativamente un tuo post, dicendo che il brand fa 'greenwashing' e che i materiali non sono veramente sostenibili. Il commento sta ricevendo molti like e risposte. Il tuo responsabile è in ferie fino a lunedì.",
      choices: [
        {
          id: "a",
          text: "Rispondi pubblicamente con dati e certificazioni sui materiali, invitando l'influencer a un dialogo costruttivo",
          outcome: "Ottima gestione! La trasparenza e l'apertura al dialogo dimostrano maturità. L'influencer apprezza la risposta professionale e alcuni follower difendono il brand.",
        },
        {
          id: "b",
          text: "Nascondi il commento e aspetti lunedì per parlare con il responsabile",
          outcome: "Nascondere genera effetto Streisand: l'influencer fa uno screenshot e la situazione peggiora. Impari che la trasparenza è sempre la scelta migliore sui social.",
        },
        {
          id: "c",
          text: "Mandi un DM privato all'influencer proponendo di inviarle campioni e documentazione",
          outcome: "Buona intuizione! Portare la conversazione in privato è strategico. L'influencer apprezza l'approccio e accetta di approfondire. Potrebbe diventare un'alleata.",
        },
      ],
    },
    "Data Analysis e Data Science": {
      context: "Stai presentando la tua prima analisi importante al direttore commerciale.",
      situation: "Hai scoperto che il 30% delle vendite viene da solo 5 prodotti, ma questi hanno margini bassissimi. Il direttore interrompe la presentazione e dice: 'Questi sono i nostri bestseller! Stai suggerendo di non venderli più?' Senti la tensione nella stanza.",
      choices: [
        {
          id: "a",
          text: "Chiarisci che non suggerisci di eliminarli, ma di analizzare come aumentare i margini o il cross-selling su questi prodotti",
          outcome: "Eccellente! Hai trasformato una critica potenziale in un'opportunità. Il direttore si rilassa e chiede di approfondire le strategie di cross-selling. La tua analisi diventa actionable.",
        },
        {
          id: "b",
          text: "Ti scusi e dici che forse hai interpretato male i dati",
          outcome: "Hai perso credibilità. I tuoi dati erano corretti, era la comunicazione a dover essere diversa. Il tuo manager ti aiuterà a prepararti meglio per la prossima presentazione.",
        },
        {
          id: "c",
          text: "Mostri il grafico che confronta questi prodotti con altri ad alto margine e chiedi 'Cosa succederebbe se promuovessimo di più questi?'",
          outcome: "Strategia rischiosa ma efficace! Usare i dati per fare domande invece che dare risposte mette il direttore in posizione di decisore. La discussione diventa collaborativa.",
        },
      ],
    },
    "Non lo so": {
      context: "Sei al tuo primo mese come project coordinator in un'agenzia digitale.",
      situation: "Due team (design e development) sono in conflitto: i designer dicono che gli sviluppatori cambiano sempre il design in fase di implementazione, gli sviluppatori dicono che i design sono impossibili da realizzare nei tempi dati. Entrambi i team lead si lamentano con te.",
      choices: [
        {
          id: "a",
          text: "Organizzi un meeting congiunto per definire insieme un processo di handoff più strutturato",
          outcome: "Perfetto! Hai capito che il problema è di processo, non di persone. Il meeting porta alla creazione di un design system condiviso e checkpoint regolari. I team ti ringraziano.",
        },
        {
          id: "b",
          text: "Riferisci la situazione al tuo manager e chiedi consiglio su come gestirla",
          outcome: "Approccio prudente per uno stagista. Il tuo manager apprezza che tu abbia identificato il problema e ti guida nella risoluzione. Impari molto sulla gestione dei conflitti.",
        },
        {
          id: "c",
          text: "Cerchi di mediare parlando separatamente con entrambi i team per trovare un compromesso",
          outcome: "Buona intenzione, ma rischi di sembrare 'dalla parte' di uno dei due. La mediazione separata può creare malintesi. Impari che la trasparenza con tutti è fondamentale.",
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
    "UX/UI Design": `Hai appena vissuto una giornata tipo nel mondo UX/UI. Non è solo disegnare schermate: è capire le persone, risolvere problemi e comunicare soluzioni. Il tuo background in "${profile.background}" ti dà un vantaggio unico: porti una prospettiva diversa in ogni progetto.\n\nIl percorso per diventare UX/UI Designer richiede pratica, curiosità e tanta empatia. Ma la verità è che hai già le basi: sai osservare, sai chiederti "perché", sai immaginare come potrebbero andare le cose. Queste sono le competenze che non si insegnano facilmente.\n\nInizia con piccoli progetti personali, esplora Figma, leggi casi studio. Ogni interfaccia che usi diventa un'opportunità di apprendimento. E ricorda: i migliori designer non sono quelli che disegnano meglio, ma quelli che capiscono meglio le persone.`,
    "Web Development": `Hai appena vissuto una giornata tipo nel mondo dello sviluppo web. Non è solo scrivere codice: è risolvere puzzle, costruire soluzioni e collaborare con un team. Il tuo background in "${profile.background}" ti dà una marcia in più: capisci il contesto in cui il tuo codice vive.\n\nDiventare developer richiede pratica costante e pazienza con gli errori. Ma ogni bug risolto è una lezione, ogni feature completata è una vittoria. La comunità dev è incredibilmente generosa: troverai aiuto ovunque.\n\nInizia con progetti piccoli ma reali. Un portfolio personale, una to-do app, un clone di qualcosa che usi. La teoria serve, ma è facendo che si impara davvero. E ricorda: anche i senior developer cercano su Stack Overflow.`,
    "Digital Marketing": `Hai appena vissuto una giornata tipo nel digital marketing. Non è solo postare sui social: è capire le persone, analizzare dati e raccontare storie che coinvolgono. Il tuo background in "${profile.background}" è un asset: porti sensibilità e prospettive uniche.\n\nIl marketing digitale evolve continuamente, e questa è la sua bellezza. Quello che impari oggi sarà diverso domani, quindi la curiosità è la tua skill più importante. Sperimenta, misura, impara, ripeti.\n\nInizia gestendo i social di un progetto personale o di un amico. Impara Google Analytics, esplora le ads. Ogni brand che segui diventa un caso studio. E ricorda: i migliori marketer sono quelli che sanno ascoltare prima di parlare.`,
    "Data Analysis e Data Science": `Hai appena vissuto una giornata tipo nel mondo dei dati. Non è solo fare grafici: è trovare storie nascoste nei numeri, trasformare l'incertezza in insight e guidare decisioni concrete. Il tuo background in "${profile.background}" ti dà rigore e metodo.\n\nL'analisi dati richiede pazienza (soprattutto con i dati sporchi) e curiosità infinita. Ma la soddisfazione di trovare un pattern che nessuno aveva visto è impagabile. E la domanda di data analyst cresce ogni giorno.\n\nInizia con dataset pubblici su Kaggle, impara Python o R, esplora SQL. Ogni dataset è un puzzle che aspetta di essere risolto. E ricorda: i migliori analyst non sono quelli che conoscono più tool, ma quelli che fanno le domande giuste.`,
    "Non lo so": `Hai appena vissuto una giornata tipo in un ruolo che combina competenze diverse. Non saper ancora cosa vuoi fare non è una debolezza: è un'opportunità per esplorare. Il tuo background in "${profile.background}" ti dà fondamenta solide su cui costruire.\n\nIl mondo digitale ha bisogno di persone versatili che sappiano fare da ponte tra specialisti. Project manager, product owner, growth marketer: sono tutti ruoli che richiedono visione d'insieme più che specializzazione estrema.\n\nEsplora diverse aree, prova corsi introduttivi di design, coding, marketing. Scopri cosa ti fa perdere la cognizione del tempo. E ricorda: la carriera non è una linea retta, è un percorso di scoperta. Il fatto che tu stia esplorando è già il primo passo giusto.`,
  };

  return {
    role: roleInfo.role,
    roleExplanation: roleInfo.explanation,
    morningIntro: morningIntros[area] || morningIntros["Non lo so"],
    tasks: generateTasks(area, profile.interests),
    interactiveScenario: generateInteractiveScenario(area),
    conclusion: conclusions[area] || conclusions["Non lo so"],
    encouragement: encouragements[area]?.replace("${profile.background}", profile.background) || encouragements["Non lo so"].replace("${profile.background}", profile.background),
  };
};

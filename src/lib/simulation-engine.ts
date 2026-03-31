import { UserProfile, SimulationScenario, Task, MasterRecommendation } from "@/types/simulation";

const masterRecommendations: Record<string, MasterRecommendation> = {
  "UX/UI Design": {
    name: "UX/UI Design e Agenti AI",
    description: "Imparerai a progettare interfacce utente intuitive e accessibili, combinando design thinking con le potenzialità dell'intelligenza artificiale per creare esperienze digitali all'avanguardia.",
    url: "https://www.start2impact.it/master/ux-ui-design/?utm_source=simulatorecarriera",
  },
  "Web Development": {
    name: "Full Stack Development e Agenti AI",
    description: "Diventerai uno sviluppatore completo, capace di costruire applicazioni web moderne dal frontend al backend, integrando soluzioni AI per automatizzare e potenziare il tuo lavoro.",
    url: "https://www.start2impact.it/master/full-stack-development/?utm_source=simulatorecarriera",
  },
  "Digital Marketing": {
    name: "Digital Marketing e Agenti AI",
    description: "Acquisirai competenze avanzate in marketing digitale, dalla strategia all'analisi dei dati, imparando a utilizzare l'AI per ottimizzare campagne e creare contenuti efficaci.",
    url: "https://www.start2impact.it/master/digital-marketing/?utm_source=simulatorecarriera",
  },
  "Data Analysis e Data Science": {
    name: "Data Science, Analytics e Agenti AI",
    description: "Imparerai a estrarre insight dai dati, costruire modelli predittivi e automatizzare analisi complesse, combinando statistica, machine learning e intelligenza artificiale.",
    url: "https://www.start2impact.it/master/data-science-analytics/?utm_source=simulatorecarriera",
  },
  "Non lo so": {
    name: "Digital Marketing e Agenti AI",
    description: "Un percorso versatile che ti darà competenze trasversali nel mondo digitale, dalla strategia alla creazione di contenuti, preparandoti a ruoli che richiedono visione d'insieme e adattabilità.",
    url: "https://www.start2impact.it/master/digital-marketing/?utm_source=simulatorecarriera",
  },
};

// Detect interest themes from user input
interface InterestTheme {
  id: string;
  keywords: string[];
  industry: string;
  companyName: string;
  companyDescription: string;
  productContext: string;
}

const interestThemes: InterestTheme[] = [
  {
    id: "sustainability",
    keywords: ["sostenibil", "ambiente", "green", "ecolog", "clima", "rinnovabil", "ricicl", "plastic", "carbon", "natura", "bio"],
    industry: "Sostenibilità e Green Tech",
    companyName: "GreenWave",
    companyDescription: "una startup innovativa che sviluppa soluzioni digitali per aiutare aziende e consumatori a ridurre il proprio impatto ambientale",
    productContext: "un'app che calcola e gamifica la carbon footprint personale",
  },
  {
    id: "publishing",
    keywords: ["editor", "libr", "scrittur", "lettur", "giornali", "articol", "magazine", "pubblic", "stampa", "narrativ", "romanzi"],
    industry: "Editoria Digitale",
    companyName: "Storyflow",
    companyDescription: "una casa editrice digitale che sta rivoluzionando il modo in cui le persone scoprono e leggono libri",
    productContext: "una piattaforma di lettura con raccomandazioni personalizzate basate su AI",
  },
  {
    id: "fashion",
    keywords: ["moda", "fashion", "abbigliament", "stile", "vestit", "brand", "luxury", "accessori", "tendenz", "outfit"],
    industry: "Fashion Tech",
    companyName: "Modaverse",
    companyDescription: "un brand di moda sostenibile che sta digitalizzando l'esperienza di shopping",
    productContext: "un'app di virtual try-on che usa AR per provare vestiti virtualmente",
  },
  {
    id: "food",
    keywords: ["cibo", "food", "cucin", "ristorant", "ricett", "gastronom", "chef", "alimentar", "vegan", "nutri"],
    industry: "FoodTech",
    companyName: "TasteHub",
    companyDescription: "una startup che connette piccoli produttori locali con ristoranti e consumatori attraverso la tecnologia",
    productContext: "un marketplace B2B per prodotti alimentari artigianali",
  },
  {
    id: "travel",
    keywords: ["viagg", "travel", "turis", "hotel", "destin", "avventur", "esplor", "vacan", "città", "mondo"],
    industry: "Travel Tech",
    companyName: "Wanderly",
    companyDescription: "una piattaforma che crea esperienze di viaggio personalizzate e sostenibili",
    productContext: "un'app che genera itinerari su misura basati su interessi e budget",
  },
  {
    id: "music",
    keywords: ["music", "artist", "canzon", "concert", "band", "suonar", "strument", "spotify", "produzion", "audio"],
    industry: "Music Tech",
    companyName: "SoundNest",
    companyDescription: "una piattaforma che aiuta artisti emergenti a crescere e monetizzare la loro musica",
    productContext: "un'app di distribuzione e analytics per musicisti indipendenti",
  },
  {
    id: "gaming",
    keywords: ["gaming", "videogioc", "gioc", "esport", "twitch", "stream", "console", "pc gaming", "svilupp giochi"],
    industry: "Gaming Industry",
    companyName: "PixelForge",
    companyDescription: "uno studio di sviluppo indie che crea giochi narrativi con impatto sociale",
    productContext: "un gioco mobile educativo che insegna coding ai giovani",
  },
  {
    id: "health",
    keywords: ["salut", "health", "fitness", "benessere", "mental", "medic", "wellness", "sport", "palestra", "yoga", "meditaz"],
    industry: "HealthTech",
    companyName: "MindBody+",
    companyDescription: "una startup che integra benessere fisico e mentale attraverso la tecnologia",
    productContext: "un'app di coaching personalizzato che combina fitness, nutrizione e mindfulness",
  },
  {
    id: "education",
    keywords: ["educaz", "formaz", "scuol", "universit", "corsi", "apprendiment", "insegna", "didattic", "studi", "e-learning"],
    industry: "EdTech",
    companyName: "LearnPath",
    companyDescription: "una piattaforma di formazione che personalizza i percorsi di apprendimento con l'AI",
    productContext: "un'app di microlearning per professionisti che vogliono upskillare",
  },
  {
    id: "art",
    keywords: ["arte", "artist", "creativ", "illustr", "pittur", "scultur", "museo", "galleria", "visual", "design"],
    industry: "Art Tech",
    companyName: "ArtVerse",
    companyDescription: "una piattaforma che democratizza l'accesso all'arte e supporta artisti emergenti",
    productContext: "un marketplace di opere digitali e fisiche con realtà aumentata",
  },
  {
    id: "social",
    keywords: ["social", "impact", "nonprofit", "volontar", "comunità", "terzo settore", "ong", "beneficen", "solidar"],
    industry: "Social Impact",
    companyName: "ImpactHub Digital",
    companyDescription: "un'organizzazione che usa la tecnologia per amplificare l'impatto sociale di NGO e associazioni",
    productContext: "una piattaforma di crowdfunding e engagement per cause sociali",
  },
  {
    id: "fintech",
    keywords: ["finanz", "invest", "crypto", "banking", "pagament", "soldi", "risparm", "trading", "economia"],
    industry: "FinTech",
    companyName: "ClearPay",
    companyDescription: "una fintech che semplifica la gestione finanziaria per giovani e freelancer",
    productContext: "un'app di budgeting intelligente con insights automatici",
  },
  {
    id: "pets",
    keywords: ["animal", "pet", "cane", "gatto", "veterinar", "animali domestici"],
    industry: "PetTech",
    companyName: "PawPal",
    companyDescription: "una startup dedicata al benessere degli animali domestici attraverso la tecnologia",
    productContext: "un'app che connette pet owner con servizi e comunità",
  },
];

const defaultTheme: InterestTheme = {
  id: "tech",
  keywords: [],
  industry: "Tech Innovazione",
  companyName: "NexTech",
  companyDescription: "una startup tecnologica in rapida crescita che sviluppa prodotti digitali innovativi",
  productContext: "una piattaforma online in abbonamento per la gestione di progetti complessi",
};

const detectInterestTheme = (interests: string, background: string): InterestTheme => {
  const combined = `${interests} ${background}`.toLowerCase();
  
  for (const theme of interestThemes) {
    for (const keyword of theme.keywords) {
      if (combined.includes(keyword)) {
        return theme;
      }
    }
  }
  
  return defaultTheme;
};

const getBackgroundContext = (background: string): { type: string; advantage: string } => {
  const lowerBg = background.toLowerCase();
  
  if (lowerBg.includes("marketing") || lowerBg.includes("comunicazione")) {
    return { type: "marketing", advantage: "La tua esperienza nella comunicazione ti permette di capire come le persone interagiscono con i messaggi." };
  }
  if (lowerBg.includes("informatica") || lowerBg.includes("ingegneria") || lowerBg.includes("programmazione") || lowerBg.includes("stem")) {
    return { type: "tech", advantage: "Il tuo background tecnico ti dà un vantaggio nel comprendere i vincoli e le possibilità tecnologiche." };
  }
  if (lowerBg.includes("arte") || lowerBg.includes("design") || lowerBg.includes("creativ") || lowerBg.includes("grafica")) {
    return { type: "creative", advantage: "La tua sensibilità creativa ti permette di vedere soluzioni dove altri vedono solo problemi." };
  }
  if (lowerBg.includes("economia") || lowerBg.includes("management") || lowerBg.includes("business") || lowerBg.includes("commerc")) {
    return { type: "business", advantage: "La tua comprensione del business ti aiuta a prendere decisioni con impatto reale sui risultati." };
  }
  if (lowerBg.includes("statistica") || lowerBg.includes("matematica") || lowerBg.includes("fisica") || lowerBg.includes("scienz")) {
    return { type: "analytical", advantage: "Il tuo rigore analitico ti permette di trovare pattern e insight nascosti." };
  }
  if (lowerBg.includes("psicolog") || lowerBg.includes("sociolog") || lowerBg.includes("filosof") || lowerBg.includes("lettere") || lowerBg.includes("umanistic")) {
    return { type: "humanistic", advantage: "La tua comprensione delle persone è un asset prezioso in ogni progetto digitale." };
  }
  if (lowerBg.includes("giurispruden") || lowerBg.includes("legge") || lowerBg.includes("avvocat")) {
    return { type: "legal", advantage: "Il tuo rigore metodico e attenzione ai dettagli ti rendono affidabile e preciso." };
  }
  
  return { type: "default", advantage: "Il tuo percorso unico ti dà una prospettiva fresca che può portare innovazione." };
};

const generateRole = (area: string, bgContext: { type: string; advantage: string }, theme: InterestTheme): { role: string; explanation: string } => {
  const roles: Record<string, Record<string, { role: string; explanation: string }>> = {
    "UX/UI Design": {
      default: { role: `UX/UI Designer presso ${theme.companyName}`, explanation: `Combini sensibilità visiva e comprensione degli utenti nel settore ${theme.industry}. ${bgContext.advantage}` },
      marketing: { role: `UX Designer con focus Conversion presso ${theme.companyName}`, explanation: `Progetti esperienze che convertono, unendo marketing e design nel mondo ${theme.industry}. ${bgContext.advantage}` },
      tech: { role: `Product Designer presso ${theme.companyName}`, explanation: `Dialoghi con gli sviluppatori mentre progetti interfacce per ${theme.industry}. ${bgContext.advantage}` },
      creative: { role: `Visual & Interaction Designer presso ${theme.companyName}`, explanation: `Crei esperienze visivamente uniche nel settore ${theme.industry}. ${bgContext.advantage}` },
      humanistic: { role: `UX Researcher & Designer presso ${theme.companyName}`, explanation: `La tua comprensione delle persone guida il design nel settore ${theme.industry}. ${bgContext.advantage}` },
    },
    "Web Development": {
      default: { role: `Frontend Developer presso ${theme.companyName}`, explanation: `Trasformi design in codice funzionante per ${theme.industry}. ${bgContext.advantage}` },
      creative: { role: `Creative Developer presso ${theme.companyName}`, explanation: `Costruisci esperienze web uniche per ${theme.industry}. ${bgContext.advantage}` },
      business: { role: `Full-Stack Developer presso ${theme.companyName}`, explanation: `Sviluppi soluzioni complete che risolvono problemi reali in ${theme.industry}. ${bgContext.advantage}` },
      tech: { role: `Software Engineer presso ${theme.companyName}`, explanation: `Costruisci l'infrastruttura tecnologica per ${theme.industry}. ${bgContext.advantage}` },
    },
    "Digital Marketing": {
      default: { role: `Digital Marketing Specialist presso ${theme.companyName}`, explanation: `Comunichi efficacemente nel mondo ${theme.industry}. ${bgContext.advantage}` },
      analytical: { role: `Growth Marketing Analyst presso ${theme.companyName}`, explanation: `Ottimizzi campagne basate sui dati per ${theme.industry}. ${bgContext.advantage}` },
      creative: { role: `Content & Brand Strategist presso ${theme.companyName}`, explanation: `Crei contenuti che coinvolgono nel settore ${theme.industry}. ${bgContext.advantage}` },
      humanistic: { role: `Community & Content Manager presso ${theme.companyName}`, explanation: `Costruisci relazioni autentiche con la community di ${theme.industry}. ${bgContext.advantage}` },
    },
    "Data Analysis e Data Science": {
      default: { role: `Data Analyst presso ${theme.companyName}`, explanation: `Analizzi dati per supportare decisioni in ${theme.industry}. ${bgContext.advantage}` },
      tech: { role: `Data Engineer presso ${theme.companyName}`, explanation: `Costruisci pipeline di dati efficienti per ${theme.industry}. ${bgContext.advantage}` },
      business: { role: `Business Intelligence Analyst presso ${theme.companyName}`, explanation: `Traduci i dati in insight strategici per ${theme.industry}. ${bgContext.advantage}` },
      analytical: { role: `Data Scientist presso ${theme.companyName}`, explanation: `Costruisci modelli predittivi per ${theme.industry}. ${bgContext.advantage}` },
    },
    "Non lo so": {
      marketing: { role: `Digital Content Strategist presso ${theme.companyName}`, explanation: `Hai un background nel marketing e una passione per l'${theme.industry}: nel digitale questo si traduce in saper costruire messaggi che arrivano alle persone giuste, nel settore che già ti accende. Ti abbiamo assegnato un ruolo che unisce strategia e creatività.` },
      tech: { role: `Digital Product Manager presso ${theme.companyName}`, explanation: `Con un background tecnico e un interesse per l'${theme.industry}, il ruolo di Product Manager ti permette di usare la logica senza rinchiuderti in un'unica specializzazione — guidando prodotti in un settore che già conosci e ami.` },
      creative: { role: `Creative Project Lead presso ${theme.companyName}`, explanation: `La tua sensibilità creativa unita alla passione per l'${theme.industry} è una combinazione rara. Ti abbiamo assegnato un ruolo che dà forma alle idee in un settore dove il bello e il funzionale devono convivere.` },
      business: { role: `Digital Business Developer presso ${theme.companyName}`, explanation: `Capisci i meccanismi del business e hai un interesse genuino per l'${theme.industry}: chi sa leggere le opportunità di mercato e parlare il linguaggio del digitale in questo settore vale doppio.` },
      humanistic: { role: `UX Strategist & Community Lead presso ${theme.companyName}`, explanation: `Sai leggere le persone, e il tuo interesse per l'${theme.industry} ti dà un contesto preciso dove applicarlo. Ti abbiamo assegnato un ruolo che mette le relazioni umane al centro di un settore che spesso le dimentica.` },
      analytical: { role: `Data-Driven Project Manager presso ${theme.companyName}`, explanation: `Ragioni per numeri e strutture, e hai una passione per l'${theme.industry}: questo ti rende prezioso in un ruolo dove le decisioni devono essere giustificate con dati in un settore che hai già scelto di esplorare.` },
      default: { role: `Digital Explorer in residenza presso ${theme.companyName}`, explanation: `Non avere ancora una direzione precisa non è un limite. Il tuo interesse per l'${theme.industry} ci ha detto qualcosa di importante: ti abbiamo messo in un ruolo trasversale proprio in quel mondo, così puoi toccare più aree e capire dove senti più energia.` },
    },
  };

  const areaRoles = roles[area] || roles["Non lo so"];
  return areaRoles[bgContext.type] || areaRoles["default"];
};

const generatePersonalizedTasks = (area: string, theme: InterestTheme, bgContext: { type: string; advantage: string }): Task[] => {
  const taskTemplates: Record<string, (t: InterestTheme) => Task[]> = {
    "UX/UI Design": (t) => [
      {
        id: 1,
        title: "Analisi della Richiesta del Cliente",
        context: `Sono le 9:15. Trovi un messaggio del tuo responsabile di ${t.companyName}: c'è un nuovo progetto, migliorare ${t.productContext}. Gli utenti si lamentano: "L'esperienza è confusa e non capisco cosa fare".`,
        challenge: `Devi capire qual è il VERO problema prima di proporre soluzioni. Quale approccio scegli?`,
        technicalTerms: [],
        choices: [
          {
            id: "a",
            text: "Analizzi i dati di comportamento degli utenti per individuare dove si bloccano nel flusso attuale",
            isCorrect: true,
            feedback: `Giusto. I dati comportamentali mostrano dove si bloccano gli utenti.`,
          },
          {
            id: "b",
            text: "Proponi di semplificare l'interfaccia riducendo gli elementi visivi e i passaggi richiesti all'utente",
            feedback: "Stai assumendo il problema senza dati. Potresti eliminare funzionalità cruciali.",
          },
          {
            id: "c",
            text: "Organizzi un incontro con utenti reali del prodotto per raccogliere opinioni dirette",
            feedback: "Utili, ma prima servono dati quantitativi per sapere cosa chiedere.",
          },
        ],
        skill: "Problem Framing",
        lesson: `Prima i dati, poi il design.`,
      },
      {
        id: 2,
        title: "Scelta del Profilo Utente di Riferimento",
        context: `Sono le 11:00. Hai analizzato i dati di ${t.companyName}. Il 62% delle persone abbandona l'app dalla schermata principale. Il team ti chiede di scegliere un profilo-tipo di utente su cui concentrare il nuovo design, basandoti sulle interviste fatte la settimana scorsa.`,
        challenge: "Hai 3 profili di utenti reali. Quale scegli come riferimento PRINCIPALE per il progetto?",
        technicalTerms: [
          { term: "Profilo-tipo (Persona)", explanation: "Personaggio fittizio che rappresenta un gruppo di utenti reali, usato per progettare soluzioni centrate sulle loro esigenze." },
          { term: "Abbandoni", explanation: "Quando un utente lascia un'app o un sito senza completare un'azione prevista (es. acquisto, registrazione)." }
        ],
        choices: [
          {
            id: "a",
            text: `Elena, 28 anni, appassionata di ${t.industry}: usa l'app ogni giorno ma è frustrata dalla mancanza di personalizzazione`,
            isCorrect: true,
            feedback: `Elena rappresenta l'utente principale e il suo problema è quello centrale.`,
          },
          {
            id: "b",
            text: "Marco, 45 anni, professionista: usa l'app di rado ma genera molto valore economico quando la utilizza",
            feedback: `Porta valore economico ma non rappresenta l'utente tipo. Rischi di allontanare gli altri.`,
          },
          {
            id: "c",
            text: "Sofia, 19 anni, studentessa: prova molte app concorrenti ed è sempre alla ricerca della soluzione perfetta",
            feedback: "Troppo instabile come riferimento. Serve fidelizzare prima di espandere.",
          },
        ],
        skill: "User Research",
        lesson: `Progetta per chi usa il prodotto davvero.`,
      },
      {
        id: 3,
        title: "Progettazione della Soluzione",
        context: `Sono le 14:30. Con Elena come riferimento, sai che il problema è la mancanza di personalizzazione in ${t.productContext}. Apri il programma di design e devi disegnare la bozza della nuova esperienza per ${t.companyName}.`,
        challenge: "Quale strategia di design scegli per risolvere il problema?",
        technicalTerms: [
          { term: "Bozza (wireframe)", explanation: "Schema semplificato di un'interfaccia, senza colori o grafiche elaborate, che mostra la struttura e la disposizione degli elementi." }
        ],
        choices: [
          {
            id: "a",
            text: "Progettare un percorso di accoglienza iniziale che raccoglie le preferenze dell'utente e personalizza l'esperienza dal primo accesso",
            isCorrect: true,
            feedback: `La personalizzazione dal primo accesso crea coinvolgimento immediato.`,
          },
          {
            id: "b",
            text: "Inserire un sistema di filtri avanzati nella home che permetta agli utenti di fare ricerche più mirate",
            feedback: `I filtri aggiungono complessità. Gli utenti vogliono che l'app li capisca.`,
          },
          {
            id: "c",
            text: "Mostrare i contenuti più popolari in evidenza nella home per guidare gli utenti verso qualcosa di rilevante",
            feedback: "Il contenuto popolare non è personalizzazione. Elena vuole sentirsi unica, non vedere cosa piace a tutti.",
          },
        ],
        skill: "Solution Design",
        lesson: `La personalizzazione è un'aspettativa, non un extra.`,
      },
      {
        id: 4,
        title: "Confronto con il Team",
        context: `Sono le 17:00. Presenti la tua bozza al team di ${t.companyName}. Lo sviluppatore più esperto dice: "Per personalizzare davvero l'esperienza ci serve un sistema che suggerisca contenuti su misura per ogni utente. Costruirlo richiederebbe 3 mesi."`,
        challenge: "Come rispondi?",
        technicalTerms: [],
        choices: [
          {
            id: "a",
            text: `"Possiamo partire con regole semplici basate sulle scelte dell'accoglienza iniziale e poi evolvere verso l'intelligenza artificiale in una fase 2?"`,
            isCorrect: true,
            feedback: `Versione base funzionante ora, evoluzione dopo. Approccio corretto.`,
          },
          {
            id: "b",
            text: `"L'esperienza utente è la nostra priorità: propongo di riorganizzare il piano di sviluppo per trovare il tempo necessario"`,
            feedback: `Ignorare i vincoli tecnici crea conflitti. Il designer collabora, non impone.`,
          },
          {
            id: "c",
            text: `"Ha senso, togliamo la personalizzazione dalla prima versione e puntiamo su un sistema di filtri più veloce da realizzare"`,
            feedback: "Arrendersi alla prima obiezione significa perdere una buona soluzione. Prima cerca compromessi.",
          },
        ],
        skill: "Stakeholder Management",
        lesson: `Negozia tra esperienza ideale e vincoli reali.`,
      },
    ],
    "Web Development": (t) => [
      {
        id: 1,
        title: "Revisione del Codice di un Collega",
        context: `Sono le 9:30. Il tuo responsabile in ${t.companyName} ti chiede di controllare il lavoro di un collega. Ha scritto una parte del codice per ${t.productContext}, ma noti che ha usato un approccio che funziona ma non segue le buone pratiche: il codice è difficile da leggere e sarebbe complicato da modificare in futuro.`,
        challenge: "Come ti comporti con il tuo collega?",
        technicalTerms: [],
        choices: [
          {
            id: "a",
            text: "Lasci un commento costruttivo spiegando quale approccio sarebbe più adatto e alleghi un esempio concreto di come migliorarlo",
            isCorrect: true,
            feedback: `Una revisione costruttiva con esempio concreto insegna e fa crescere.`,
          },
          {
            id: "b",
            text: "Approvi il lavoro con un commento positivo: il codice funziona correttamente e non vale la pena rallentare il rilascio",
            feedback: `Il codice "che funziona" oggi può causare problemi domani.`,
          },
          {
            id: "c",
            text: "Riscrivi tu quella parte del codice usando l'approccio corretto e la proponi come alternativa al posto della sua versione",
            feedback: "Riscrivere senza discussione è irrispettoso e toglie l'opportunità di apprendimento.",
          },
        ],
        skill: "Code Review",
        lesson: `Revisione buona: insegna, non solo corregge.`,
      },
      {
        id: 2,
        title: "Scelta di Architettura",
        context: `Sono le 11:00. ${t.companyName} sta crescendo e ${t.productContext} deve gestire molti più utenti di prima. Il responsabile tecnico ti chiede di proporre come organizzare il sistema: dove salvare i dati, come far comunicare le diverse parti dell'applicazione tra loro, e come assicurarsi che tutto continui a funzionare anche sotto carico.`,
        challenge: "Come proponi di strutturare il sistema?",
        technicalTerms: [],
        choices: [
          {
            id: "a",
            text: "Proponi di separare il sistema in parti indipendenti, ognuna con un compito preciso, così si possono migliorare una alla volta",
            isCorrect: true,
            feedback: `Separare le responsabilità rende il sistema più facile da far crescere.`,
          },
          {
            id: "b",
            text: "Proponi di tenere tutto in un unico blocco ben organizzato per semplicità, così il team può lavorarci senza dover coordinare troppe parti",
            feedback: `Funziona all'inizio, ma diventa difficile da modificare crescendo.`,
          },
          {
            id: "c",
            text: "Proponi di usare un servizio esterno già pronto che gestisca tutto automaticamente, così il team si concentra solo sulle funzionalità",
            feedback: "Delegare tutto a un servizio esterno crea dipendenza e limita il controllo su come funziona il sistema.",
          },
        ],
        skill: "System Architecture",
        lesson: `L'architettura scelta all'inizio condiziona tutto.`,
      },
      {
        id: 3,
        title: "Un Errore Misterioso",
        context: `Sono le 14:30. Il sistema che gestisce ${t.productContext} dà errore in alcuni casi. Indagando, noti che il problema si verifica solo quando si inviano o si elaborano grandi quantità di dati. Gli utenti vedono un messaggio di errore generico.`,
        challenge: "Qual è il prossimo passo per risolvere il problema?",
        technicalTerms: [],
        choices: [
          {
            id: "a",
            text: "Verifichi quanti dati causano l'errore e controlli i registri del sistema per trovare il messaggio di errore specifico",
            isCorrect: true,
            feedback: `Approccio sistematico: confermi l'ipotesi, poi trovi la causa reale.`,
          },
          {
            id: "b",
            text: "Aggiungi un controllo nel codice che intercetta l'errore e mostra un messaggio più chiaro all'utente per sbloccarlo",
            feedback: "Stai nascondendo il problema, non risolvendolo. Gli utenti continueranno a essere bloccati.",
          },
          {
            id: "c",
            text: "Scrivi una segnalazione dettagliata al team descrivendo il problema e allegando tutte le informazioni raccolte finora",
            feedback: "Segnalare senza aver investigato a fondo è prematuro. Prima cerca di capire la causa, poi comunica.",
          },
        ],
        skill: "Debugging",
        lesson: `Riproduci, isola, verifica, risolvi.`,
      },
      {
        id: 4,
        title: "Pubblicazione di Venerdì Sera",
        context: `Sono le 17:30 di venerdì. La nuova funzionalità per ${t.companyName} è pronta e testata. Il responsabile ti chiede: "Puoi pubblicarla online così gli utenti la vedono? Lunedì il cliente vuole vedere la novità."`,
        challenge: "Cosa fai?",
        technicalTerms: [],
        choices: [
          {
            id: "a",
            text: "Pubblichi la novità sull'ambiente di prova per verificare che tutto funzioni, e proponi la pubblicazione definitiva lunedì mattina",
            isCorrect: true,
            feedback: `Buona gestione del rischio. Lavoro fatto, problemi evitati.`,
          },
          {
            id: "b",
            text: "Procedi con la pubblicazione definitiva: tutti i controlli automatici sono passati e la funzionalità è stata validata dal team",
            feedback: `Rischioso. Se qualcosa va storto nel fine settimana, chi interviene?`,
          },
          {
            id: "c",
            text: "Comunichi al responsabile che è meglio rimandare tutto a lunedì perché pubblicare il venerdì sera è troppo rischioso",
            feedback: "Rifiutare senza proporre alternative non è professionale. Cerca sempre un compromesso.",
          },
        ],
        skill: "Risk Management",
        lesson: `Bilancia velocità e rischio, sempre.`,
      },
    ],
    "Digital Marketing": (t) => [
      {
        id: 1,
        title: "Analisi Campagna Social",
        context: `Sono le 9:15. Apri il pannello di gestione delle pubblicità online di ${t.companyName}. La campagna promozionale estiva è terminata. Budget speso: €500. Devi preparare un resoconto per il cliente.`,
        challenge: `I risultati dicono: 45.000 persone hanno visto la pubblicità, l'1.2% ha interagito (like, commenti), 380 hanno cliccato, ma solo 12 hanno fatto l'azione desiderata (acquisto o iscrizione). Il cliente ne voleva 50. Come presenti i risultati?`,
        technicalTerms: [
          { term: "Persone raggiunte", explanation: "Numero di persone uniche che hanno visto il contenuto." },
          { term: "Tasso di interazione", explanation: "Percentuale di persone che hanno interagito col contenuto (like, commenti, condivisioni) rispetto a quante lo hanno visto." },
          { term: "Conversioni", explanation: "Azioni completate dagli utenti (acquisti, iscrizioni, download) che rappresentano l'obiettivo della campagna." }
        ],
        choices: [
          {
            id: "a",
            text: `"Il problema è la pagina dove le persone arrivano dopo il click: su 380 click, solo 12 hanno completato l'azione. Propongo di creare due versioni della pagina e testare quale funziona meglio"`,
            isCorrect: true,
            feedback: `Hai identificato dove si perdono le persone e proposto una soluzione concreta.`,
          },
          {
            id: "b",
            text: `"La campagna ha portato 45.000 persone raggiunte e 380 click qualificati. Propongo di aumentare il budget per ampliare i volumi"`,
            feedback: "Stai mascherando il fallimento con numeri che non contano. Il cliente voleva conversioni.",
          },
          {
            id: "c",
            text: `"I risultati sono sotto le aspettative. Suggerisco di rivedere la selezione del pubblico e spostare il budget su un canale più efficace"`,
            feedback: "Senza capire PERCHÉ non ha funzionato, più budget = più spreco.",
          },
        ],
        skill: "Data Analysis",
        lesson: `Onestà sui dati costruisce fiducia.`,
      },
      {
        id: 2,
        title: "Crisi Social Media",
        context: `Sono le 11:00. Un utente ha postato una recensione negativa su ${t.companyName}: "Servizio pessimo, non lo consiglio". Ha 50 commenti e sta crescendo.`,
        challenge: "Come gestisci la situazione?",
        technicalTerms: [],
        choices: [
          {
            id: "a",
            text: "Rispondi pubblicamente con empatia riconoscendo il disagio e offri un contatto diretto per risolvere la situazione",
            isCorrect: true,
            feedback: `Perfetto! In ${t.industry}, la trasparenza e l'ascolto trasformano critici in sostenitori.`,
          },
          {
            id: "b",
            text: "Nascondi temporaneamente il post per evitare che la situazione si amplifichi e contatti l'utente in privato",
            feedback: "Censurare peggiora tutto. Nel " + t.industry + ", l'autenticità è fondamentale.",
          },
          {
            id: "c",
            text: "Aspetti qualche ora prima di rispondere per lasciare che la conversazione si calmi e preparare una risposta ponderata",
            feedback: "Il silenzio viene letto come disinteresse. Ogni ora di attesa peggiora la percezione.",
          },
        ],
        skill: "Crisis Management",
        lesson: `Le crisi sono occasioni per dimostrare valori.`,
      },
      {
        id: 3,
        title: "Pianificazione Contenuti",
        context: `Sono le 14:30. Il team di ${t.companyName} ti chiede di pianificare i contenuti da pubblicare sui social il prossimo mese. Hai budget per 12 post (testi e immagini) e 2 video.`,
        challenge: "Come distribuisci i diversi tipi di contenuti?",
        technicalTerms: [],
        choices: [
          {
            id: "a",
            text: "Mix bilanciato: 40% contenuti che insegnano qualcosa sul settore, 30% vita quotidiana dell'azienda, 20% prodotto e 10% contenuti creati dai clienti stessi",
            isCorrect: true,
            feedback: `Eccellente mix! In ${t.industry}, i contenuti educativi creano autorevolezza, quelli sul dietro le quinte umanizzano, il prodotto converte, e i contenuti dei clienti creano comunità.`,
          },
          {
            id: "b",
            text: "Focus sulla vendita: 80% contenuti che mostrano il prodotto con inviti diretti all'acquisto e 20% contenuti informativi di contesto",
            feedback: `Troppo aggressivo. Nel ${t.industry}, chi parla solo di sé stanca il pubblico.`,
          },
          {
            id: "c",
            text: "Focus sulle interazioni: 70% contenuti che seguono le mode del momento per attirare attenzione, 30% prodotto per ricordare il marchio",
            feedback: "Le interazioni fine a sé stesse non portano risultati. Servono contenuti che costruiscono relazione.",
          },
        ],
        skill: "Content Strategy",
        lesson: `Bilancia contenuti di marca e risultati.`,
      },
      {
        id: 4,
        title: "Distribuzione del Budget Pubblicitario",
        context: `Sono le 17:00. Il CEO di ${t.companyName} ti dà €3.000 in più da spendere in pubblicità online negli ultimi 3 mesi dell'anno. Devi decidere come investirli per ottenere il massimo risultato.`,
        challenge: "Come distribuisci il budget?",
        technicalTerms: [],
        choices: [
          {
            id: "a",
            text: "€1.500 per mostrare annunci a chi ha già visitato il sito, €1.000 per raggiungere persone simili ai tuoi clienti attuali, €500 per testare nuovi pubblici",
            isCorrect: true,
            feedback: `Strategia intelligente! Raggiungere chi ti conosce già ha il ritorno sull'investimento più alto, il pubblico simile ti fa crescere, e i test preparano il futuro.`,
          },
          {
            id: "b",
            text: "€3.000 su campagne per far conoscere il marchio a più persone possibili e aumentare la visibilità negli ultimi mesi dell'anno",
            feedback: `La visibilità senza una strategia di conversione è fine a sé stessa. In ${t.industry}, serve un percorso completo dall'attenzione all'acquisto.`,
          },
          {
            id: "c",
            text: "€3.000 su una collaborazione con creatori di contenuti del settore per generare materiale autentico e visibilità rapida",
            feedback: "I creatori di contenuti funzionano ma con €3.000 puoi permetterti solo collaborazioni piccole. Il ritorno sull'investimento è incerto.",
          },
        ],
        skill: "Budget Optimization",
        lesson: `Il budget segue i dati, non l'istinto.`,
      },
    ],
    "Data Analysis e Data Science": (t) => [
      {
        id: 1,
        title: "Richiesta dal Business",
        context: `Sono le 9:15. Il CEO di ${t.companyName} ti scrive: "Mi servono i numeri su come è andato il trimestre per la riunione con gli investitori di domani." Hai 24 ore.`,
        challenge: "Come affronti la richiesta?",
        technicalTerms: [],
        choices: [
          {
            id: "a",
            text: "Chiedi al CEO quali indicatori specifici servono e qual è il messaggio che vuole trasmettere agli investitori",
            isCorrect: true,
            feedback: `Perfetto! In ${t.industry}, capire il contesto evita di produrre dati inutili. Il CEO probabilmente non sa esattamente cosa vuole.`,
          },
          {
            id: "b",
            text: "Prepari un rapporto completo con tutti gli indicatori disponibili organizzati per area, così gli investitori hanno il quadro intero",
            feedback: "Troppi dati = nessuna storia. Gli investitori hanno 10 minuti, non 2 ore.",
          },
          {
            id: "c",
            text: "Estrai rapidamente i dati principali in un foglio strutturato e li invii al CEO così può selezionare ciò che serve",
            feedback: "Il CEO non ha tempo (né competenze) per analizzare dati grezzi. Il tuo valore è tradurli.",
          },
        ],
        skill: "Stakeholder Communication",
        lesson: `Prima capisci la domanda, poi cerchi i dati.`,
      },
      {
        id: 2,
        title: "Problema di Qualità dei Dati",
        context: `Sono le 11:00. Stai analizzando i dati degli utenti di ${t.productContext}. Ti accorgi che nel 15% dei casi manca un'informazione importante: il punteggio che misura quanto gli utenti sono attivi.`,
        challenge: "Come gestisci queste informazioni mancanti?",
        technicalTerms: [],
        choices: [
          {
            id: "a",
            text: "Analizzi la distribuzione dei valori mancanti per capire se sono casuali o sistematici, poi decidi la strategia migliore",
            isCorrect: true,
            feedback: `Eccellente! In ${t.industry}, i valori mancanti raccontano una storia. Capire PERCHÉ mancano è fondamentale.`,
          },
          {
            id: "b",
            text: "Li sostituisci con la media del campo per mantenere l'insieme di dati completo e non perdere il 15% delle righe",
            feedback: "La media può introdurre una distorsione. Se i valori mancano in modo sistematico (es. utenti che non completano il profilo), la media è fuorviante.",
          },
          {
            id: "c",
            text: "Li escludi dall'analisi per lavorare solo su dati certi e presentare risultati basati su informazioni verificate",
            feedback: `Escludere il 15% può introdurre una distorsione nella selezione. In ${t.industry}, perderesti informazioni importanti.`,
          },
        ],
        skill: "Data Quality",
        lesson: `Dati scadenti in ingresso, risultati scadenti.`,
      },
      {
        id: 3,
        title: "Risultato Controintuitivo",
        context: `Sono le 14:30. La tua analisi per ${t.companyName} mostra un risultato strano: gli utenti che usano meno l'app sono quelli che continuano a usarla più a lungo nel tempo. Sembra il contrario di quello che ti aspetteresti.`,
        challenge: "Come procedi?",
        technicalTerms: [],
        choices: [
          {
            id: "a",
            text: "Indaghi il segmento per capire chi sono questi utenti e perché ottengono valore con meno tempo di utilizzo",
            isCorrect: true,
            feedback: `Ottimo! In ${t.industry}, i dati controintuitivi spesso nascondono le scoperte più preziose.`,
          },
          {
            id: "b",
            text: "Verifichi se l'anomalia dipende da un errore nei dati o nella raccolta prima di trarre qualsiasi conclusione",
            feedback: "Ignorare anomalie è un errore. Spesso le scoperte più importanti sembrano 'strane' all'inizio.",
          },
          {
            id: "c",
            text: "Inserisci il dato nel rapporto lasciando al team commerciale l'interpretazione e le decisioni che ne conseguono",
            feedback: "Presentare senza interpretare non aggiunge valore. Il tuo lavoro è spiegare, non solo mostrare.",
          },
        ],
        skill: "Critical Thinking",
        lesson: `I dati strani meritano più attenzione, non meno.`,
      },
      {
        id: 4,
        title: "Presentazione ai Non-Tecnici",
        context: `Sono le 17:00. Devi presentare i risultati della tua analisi al team marketing di ${t.companyName}. Hai scoperto che gli utenti si dividono in 3 gruppi con abitudini molto diverse tra loro.`,
        challenge: "Come presenti i risultati a colleghi che non hanno competenze tecniche?",
        technicalTerms: [],
        choices: [
          {
            id: "a",
            text: "Dai un nome descrittivo a ogni gruppo e mostri una o due scoperte concrete e utilizzabili per ciascuno",
            isCorrect: true,
            feedback: `Perfetto! 'Gli Esploratori', 'I Fedeli', 'I Dormienti' sono più memorabili di 'Gruppo 1, 2, 3'.`,
          },
          {
            id: "b",
            text: "Spieghi la metodologia statistica usata e mostri i grafici tecnici per dare credibilità scientifica ai risultati",
            feedback: "Al marketing non interessa come hai fatto, ma cosa significa per loro.",
          },
          {
            id: "c",
            text: "Prepari un documento scritto dettagliato con tutti i dati e lo invii via email così ognuno può leggerlo con calma",
            feedback: "Il documento scritto finisce nel dimenticatoio. La presentazione crea allineamento e discussione.",
          },
        ],
        skill: "Data Storytelling",
        lesson: `Scoperta comunicata male è scoperta sprecata.`,
      },
    ],
    "Non lo so": (t) => [
      {
        id: 1,
        title: "Avvio del Progetto",
        context: `Sono le 9:15. Entri alla prima riunione del nuovo progetto per ${t.companyName}: sviluppare ${t.productContext}. Ci sono il grafico, il programmatore e i responsabili del progetto.`,
        challenge: "Qual è la prima cosa da chiarire?",
        technicalTerms: [],
        choices: [
          {
            id: "a",
            text: "Definire gli obiettivi concreti e i criteri di successo: cosa significa esattamente 'fatto bene' per questo progetto?",
            isCorrect: true,
            feedback: `Perfetto! Senza obiettivi chiari, ogni progetto in ${t.industry} rischia di andare alla deriva.`,
          },
          {
            id: "b",
            text: "Impostare subito un piano operativo con calendario, traguardi intermedi e responsabilità chiare per ogni membro del team",
            feedback: "Il piano viene dopo gli obiettivi. Come pianifichi se non sai dove vuoi arrivare?",
          },
          {
            id: "c",
            text: "Chiedere a ogni persona presente di condividere la propria visione del progetto per mappare le aspettative del team",
            feedback: "Utile per capire le aspettative, ma rischi 10 visioni diverse senza una direzione.",
          },
        ],
        skill: "Project Initiation",
        lesson: `Obiettivi vaghi fanno fallire più dell'esecuzione.`,
      },
      {
        id: 2,
        title: "Conflitto tra Team",
        context: `Sono le 11:00. Il grafico e il programmatore di ${t.companyName} non sono d'accordo su una funzionalità. Il grafico vuole un effetto visivo elaborato, il programmatore dice che renderebbe l'app troppo lenta.`,
        challenge: "Come gestisci la situazione?",
        technicalTerms: [],
        choices: [
          {
            id: "a",
            text: "Faciliti una discussione chiedendo qual è l'obiettivo dell'effetto visivo e se esiste un compromesso che soddisfi entrambi",
            isCorrect: true,
            feedback: `Ottimo! In ${t.industry}, il coordinatore non decide ma facilita. L'obiettivo comune sblocca i conflitti.`,
          },
          {
            id: "b",
            text: "Dai priorità alla posizione del programmatore perché la velocità dell'app ha un impatto diretto sull'esperienza utente",
            feedback: "Prendere parte crea risentimento. Non sei un giudice, sei un facilitatore.",
          },
          {
            id: "c",
            text: "Porti la questione al responsabile del team perché prenda una decisione definitiva avendo una visione d'insieme più ampia",
            feedback: "Passare subito la palla al capo ti fa sembrare incapace di gestire i conflitti. Prima prova a risolverlo.",
          },
        ],
        skill: "Conflict Resolution",
        lesson: `Trova l'obiettivo comune, il conflitto si risolve.`,
      },
      {
        id: 3,
        title: "Scadenza a Rischio",
        context: `Sono le 14:30. Mancano 5 giorni alla presentazione di ${t.productContext} a un cliente importante. Il team è indietro del 30% rispetto al piano previsto.`,
        challenge: "Come affronti la situazione?",
        technicalTerms: [],
        choices: [
          {
            id: "a",
            text: "Convochi una riunione per distinguere cosa è essenziale per la presentazione e cosa si può rimandare",
            isCorrect: true,
            feedback: `Perfetto! In ${t.industry}, meglio consegnare meno ma funzionante che tutto ma incompleto.`,
          },
          {
            id: "b",
            text: "Organizzi un piano di lavoro intensivo per il team così da recuperare il ritardo e consegnare tutto in tempo",
            feedback: "Gli straordinari creano esaurimento da sovraccarico ed errori. Nel lungo periodo, peggiori le cose.",
          },
          {
            id: "c",
            text: "Contatti il cliente in anticipo per proporre di spostare la presentazione di una settimana e consegnare un lavoro completo",
            feedback: "Rimandare è l'ultima opzione. Prima vedi se puoi consegnare una versione base funzionante.",
          },
        ],
        skill: "Scope Management",
        lesson: `Saper tagliare è importante quanto saper fare.`,
      },
      {
        id: 4,
        title: "Feedback al Team",
        context: `Sono le 17:30. Un membro del team di ${t.companyName} sta rendendo meno del solito. Non rispetta le scadenze e la qualità del suo lavoro è calata.`,
        challenge: "Come affronti la conversazione?",
        technicalTerms: [],
        choices: [
          {
            id: "a",
            text: "Organizzi un incontro privato faccia a faccia per capire cosa sta succedendo e offrire supporto concreto alla persona",
            isCorrect: true,
            feedback: `Perfetto! Partire con curiosità, non giudizio. Spesso ci sono motivi non visibili.`,
          },
          {
            id: "b",
            text: "Sollevi il tema nella riunione di aggiornamento quotidiana in modo trasparente così tutto il team è allineato e può contribuire",
            feedback: "Il riscontro negativo in pubblico umilia e crea risentimento. Sempre in privato.",
          },
          {
            id: "c",
            text: "Gli dai ancora qualche settimana di tempo per riprendere il ritmo, monitorando la situazione senza metterlo sotto pressione",
            feedback: "Ignorare il problema lo peggiora. Il riscontro tempestivo aiuta tutti.",
          },
        ],
        skill: "People Management",
        lesson: `Riscontro tempestivo e privato, sempre.`,
      },
    ],
  };

  const generator = taskTemplates[area] || taskTemplates["Non lo so"];
  return generator(theme);
};

const generatePersonalizedFinalScenario = (area: string, theme: InterestTheme) => {
  const scenarios: Record<string, { context: string; situation: string; choices: { id: string; text: string; description: string; outcome: string }[] }> = {
    "UX/UI Design": {
      context: `Dopo 6 mesi in ${theme.companyName}, hai dimostrato il tuo valore. Il tuo nuovo design ha aumentato la fidelizzazione degli utenti del 25%.`,
      situation: `Il CEO ti propone tre opportunità di crescita nel ${theme.industry}. Quale scegli?`,
      choices: [
        {
          id: "a",
          text: "Responsabile Design: guidare un team di 3 junior sul prossimo prodotto",
          description: "Chi fa questo lavoro coordina altri designer, assegna compiti, dà feedback sui progetti e si assicura che il risultato finale sia coerente. È un ruolo per chi ama far crescere le persone e vedere il quadro d'insieme, più che stare sui dettagli.",
          outcome: `Scegli la leadership. In un anno, il tuo team lancia un prodotto che diventa il cuore di ${theme.companyName}. Impari che far crescere altri è più gratificante che brillare da solo.`,
        },
        {
          id: "b",
          text: "Specializzazione: diventare l'esperto del sistema di design condiviso dell'azienda",
          description: "Chi fa questo lavoro crea le regole visive che tutto il team usa: colori, bottoni, layout, componenti riutilizzabili. È un ruolo per chi ama l'ordine, la precisione e costruire strumenti che rendono il lavoro degli altri più facile e veloce.",
          outcome: `Scegli la profondità. Costruisci un sistema di design condiviso che accelera lo sviluppo del 40%. Diventi la persona che tutti consultano. La specializzazione paga.`,
        },
        {
          id: "c",
          text: "Progettazione Prodotto: passare a un ruolo più strategico per avere più impatto sulle decisioni",
          description: "Chi fa questo lavoro decide quali funzionalità costruire e perché, parlando con utenti, team tecnico e direzione. È un ruolo per chi vuole influenzare le decisioni importanti e ragionare su cosa ha senso creare, non solo su come appare.",
          outcome: `Scegli l'impatto. Lavori a stretto contatto con il CEO e i responsabili. Le tue decisioni influenzano la direzione dell'azienda. Il design diventa strategia.`,
        },
      ],
    },
    "Web Development": {
      context: `Dopo 6 mesi in ${theme.companyName}, il tuo codice è online e usato da migliaia di utenti nel ${theme.industry}.`,
      situation: "Il responsabile tecnico ti presenta tre percorsi di crescita. Quale ti attira di più?",
      choices: [
        {
          id: "a",
          text: "Responsabile tecnico: guidare le scelte di architettura del team",
          description: "Chi fa questo lavoro decide come organizzare il codice, quali tecnologie usare e come far lavorare bene il team. Giorno per giorno significa fare riunioni tecniche, revisionare il lavoro degli altri e risolvere i problemi più complessi. È per chi ama insegnare e avere una visione d'insieme.",
          outcome: `Scegli la leadership tecnica. In un anno, guidi la migrazione a una nuova architettura. Il sistema è più veloce e scalabile. I junior ti vedono come mentore.`,
        },
        {
          id: "b",
          text: "Sviluppatore completo: espanderti alla parte server per vedere il quadro completo",
          description: "Chi fa questo lavoro costruisce sia la parte visibile delle applicazioni sia quella invisibile (dove si salvano i dati, come comunicano i sistemi). Giorno per giorno significa scrivere codice, risolvere problemi e vedere le proprie creazioni funzionare dall'inizio alla fine. È per chi vuole capire come funziona tutto.",
          outcome: `Scegli la completezza. Costruisci funzionalità dall'inizio alla fine. Capisci come tutto si connette. Diventi lo sviluppatore che può risolvere qualsiasi problema.`,
        },
        {
          id: "c",
          text: "Infrastruttura: lavorare sui sistemi che supportano tutto il resto",
          description: "Chi fa questo lavoro si occupa di far funzionare i server, automatizzare i processi e assicurarsi che il sito o l'app non cada mai. Giorno per giorno significa configurare sistemi, monitorare le prestazioni e costruire strumenti interni. È per chi ama risolvere problemi dietro le quinte.",
          outcome: `Scegli le fondamenta. Automatizzi pubblicazione, monitoraggio, crescita del sistema. Ogni sviluppatore dell'azienda lavora meglio grazie a te. L'impatto è invisibile ma enorme.`,
        },
      ],
    },
    "Digital Marketing": {
      context: `Dopo 6 mesi in ${theme.companyName}, le tue campagne hanno generato €200.000 di ricavi attribuibili nel ${theme.industry}.`,
      situation: "Il responsabile marketing ti propone tre direzioni di crescita. Quale scegli?",
      choices: [
        {
          id: "a",
          text: "Pubblicità e risultati: specializzarti in campagne a pagamento e ottimizzazione",
          description: "Chi fa questo lavoro gestisce budget pubblicitari, crea annunci, analizza i risultati e ottimizza le campagne per ottenere più vendite o iscrizioni. Giorno per giorno significa lavorare con numeri, testare varianti e cercare il modo migliore di spendere ogni euro. È per chi ama i risultati concreti e misurabili.",
          outcome: `Scegli i numeri. Diventi un esperto di pubblicità. Ogni euro speso ne genera 5. Le aziende ti cercano perché porti risultati misurabili.`,
        },
        {
          id: "b",
          text: "Marchio e contenuti: costruire la narrativa e l'identità del marchio",
          description: "Chi fa questo lavoro scrive testi, crea storie, definisce il tono di voce e costruisce l'immagine dell'azienda nel tempo. Giorno per giorno significa scrivere, ideare campagne creative e collaborare con grafici e videomaker. È per chi ama raccontare storie e costruire qualcosa che le persone ricordano.",
          outcome: `Scegli la storia. Costruisci un marchio che le persone amano nel ${theme.industry}. I contenuti che crei vengono condivisi spontaneamente. Il valore è nel lungo termine.`,
        },
        {
          id: "c",
          text: "Crescita: visione d'insieme su tutto il percorso dell'utente, dalla scoperta alla fidelizzazione",
          description: "Chi fa questo lavoro guarda l'intero percorso di una persona: da quando scopre il prodotto a quando diventa cliente fedele. Giorno per giorno significa analizzare dati, proporre esperimenti e collegare marketing, prodotto e vendite. È per chi ama capire come funzionano i sistemi nel loro insieme.",
          outcome: `Scegli il sistema. Vedi come ogni pezzo si connette. Ottimizzi l'intero percorso dell'utente, non solo un canale. Diventi indispensabile per la crescita.`,
        },
      ],
    },
    "Data Analysis e Data Science": {
      context: `Dopo 6 mesi in ${theme.companyName}, le tue analisi hanno influenzato decisioni da milioni di euro nel ${theme.industry}.`,
      situation: "Il responsabile dei dati ti presenta tre opportunità. Quale ti ispira di più?",
      choices: [
        {
          id: "a",
          text: "Scienza dei dati: costruire modelli predittivi e algoritmi di apprendimento automatico",
          description: "Chi fa questo lavoro insegna ai computer a fare previsioni basate sui dati: quanti clienti perderemo? Quale prodotto venderà di più? Giorno per giorno significa esplorare dati, costruire modelli matematici e testarli. È per chi ama la logica, i numeri e risolvere problemi complessi.",
          outcome: `Scegli l'intelligenza artificiale. Costruisci modelli che predicono il comportamento utenti nel ${theme.industry}. L'azienda prende decisioni prima che i problemi emergano. Sei nel futuro.`,
        },
        {
          id: "b",
          text: "Responsabile analisi: guidare le analisi di un'intera area aziendale",
          description: "Chi fa questo lavoro diventa il punto di riferimento per un'area dell'azienda: marketing, vendite o prodotto. Giorno per giorno significa rispondere alle domande dei colleghi con i dati, creare rapporti e presentare scoperte ai responsabili. È per chi ama tradurre numeri in decisioni concrete.",
          outcome: `Scegli l'impatto. Ogni decisione dell'area aziendale passa dalle tue scoperte. Impari il business profondamente. I dati diventano strategia.`,
        },
        {
          id: "c",
          text: "Ingegneria dei dati: costruire l'infrastruttura che rende possibile tutto il resto",
          description: "Chi fa questo lavoro costruisce i sistemi che raccolgono, organizzano e rendono disponibili i dati per tutta l'azienda. Giorno per giorno significa scrivere programmi che elaborano grandi quantità di informazioni e assicurarsi che tutto funzioni. È per chi ama costruire cose che durano e rendono il lavoro degli altri possibile.",
          outcome: `Scegli le fondamenta. Costruisci flussi di elaborazione che trasformano dati grezzi in scoperte utili. Ogni analista lavora meglio grazie alla tua architettura.`,
        },
      ],
    },
    "Non lo so": {
      context: `Dopo 6 mesi in ${theme.companyName}, hai esplorato diversi ruoli nel ${theme.industry}. Hai capito cosa ti piace e cosa no.`,
      situation: "Il tuo responsabile ti chiede dove vuoi specializzarti. Cosa scegli?",
      choices: [
        {
          id: "a",
          text: "Gestione del prodotto: definire cosa costruire e perché",
          description: "Chi fa questo lavoro decide quali funzionalità aggiungere a un'app o un sito, parlando con gli utenti per capire cosa serve e con il team per capire cosa è possibile. Giorno per giorno significa fare riunioni, scrivere documenti di progetto e prendere decisioni. È per chi ama avere una visione d'insieme e guidare le scelte.",
          outcome: `Scegli la strategia. Diventi il ponte tra business, design e tecnologia. In un anno gestisci il piano di sviluppo di un prodotto. Le tue decisioni plasmano il futuro.`,
        },
        {
          id: "b",
          text: "Gestione dei progetti: far succedere le cose, coordinare e consegnare",
          description: "Chi fa questo lavoro si assicura che i progetti vengano completati nei tempi, organizzando il lavoro del team e risolvendo i problemi che emergono. Giorno per giorno significa aggiornare piani, facilitare riunioni e tenere tutti allineati. È per chi ama l'organizzazione e far funzionare le cose.",
          outcome: `Scegli l'esecuzione. Diventi chi tiene insieme i progetti complessi. Il team ti adora perché risolvi problemi prima che esplodano.`,
        },
        {
          id: "c",
          text: "Ancora 3 mesi di esplorazione in un'area che non hai provato",
          description: "Questa scelta significa continuare a esplorare ruoli diversi prima di decidere: potresti provare il marketing, l'analisi dati o il design. Giorno per giorno significa affiancare colleghi di aree diverse e capire dove ti senti più a tuo agio. È per chi preferisce scegliere con calma dopo aver visto le opzioni.",
          outcome: `Scegli l'esplorazione. Scopri una passione inaspettata per le strategie di crescita rapida. A volte la risposta è dove non hai ancora guardato.`,
        },
      ],
    },
  };

  return scenarios[area] || scenarios["Non lo so"];
};

export const generateScenario = (profile: UserProfile): SimulationScenario => {
  const area = profile.digitalArea || "Non lo so";
  const theme = detectInterestTheme(profile.interests, profile.background);
  const bgContext = getBackgroundContext(profile.background);
  const roleInfo = generateRole(area, bgContext, theme);

  const morningIntro = generateMorningIntro(area, theme, profile);
  const conclusion = generateConclusion(area, theme, profile);
  const encouragement = generateEncouragement(area, theme, profile);

  return {
    role: roleInfo.role,
    roleExplanation: roleInfo.explanation,
    morningIntro,
    tasks: generatePersonalizedTasks(area, theme, bgContext),
    finalScenario: generatePersonalizedFinalScenario(area, theme),
    conclusion,
    encouragement,
    masterRecommendation: masterRecommendations[area] || masterRecommendations["Non lo so"],
  };
};

const generateMorningIntro = (area: string, theme: InterestTheme, profile: UserProfile): string => {
  const intros: Record<string, string> = {
    "UX/UI Design": `Sono le 8:55. Entri nell'ufficio di ${theme.companyName}, ${theme.companyDescription}. Saluti il team e ti siedi alla tua postazione. Due monitor, il programma di design aperto, post-it colorati ovunque. Oggi lavorerai su ${theme.productContext}. La musica parte e sei pronto.`,
    "Web Development": `Sono le 9:00. Ti colleghi da remoto per ${theme.companyName}, ${theme.companyDescription}. Apri il calendario e controlli le attività del giorno. Il primo appuntamento è tra 15 minuti. Oggi lavorerai su ${theme.productContext}. Caffè pronto, cuffie on, si parte.`,
    "Digital Marketing": `Sono le 8:45. Apri il portatile al coworking, lavori per ${theme.companyName}, ${theme.companyDescription}. Prima cosa: controllare i canali social. Oggi pianificherai campagne per ${theme.productContext}. Il cappuccino è pronto, si inizia.`,
    "Data Analysis e Data Science": `Sono le 9:15. Arrivi nell'ufficio di ${theme.companyName}, ${theme.companyDescription}. Hai già in mente le analisi da fare. Oggi lavorerai sui dati di ${theme.productContext}. Due monitor, gli strumenti di analisi pronti, si parte.`,
    "Non lo so": `Sono le 9:00. Entri in ${theme.companyName}, ${theme.companyDescription}. Il tuo ruolo è trasversale: ogni giorno tocchi aree diverse. Oggi lavorerai su ${theme.productContext}. Apri il calendario, guardi le priorità della giornata e parti.`,
  };

  return intros[area] || intros["Non lo so"];
};

const generateConclusion = (area: string, theme: InterestTheme, profile: UserProfile): string => {
  const conclusions: Record<string, string> = {
    "UX/UI Design": `Hai appena analizzato una richiesta reale, scelto il profilo utente su cui concentrarti, progettato una soluzione concreta e difeso le tue idee davanti a un team. Questo è il lavoro vero di chi progetta esperienze digitali: non si tratta di rendere le cose "belle", ma di capire le persone e risolvere i loro problemi.`,
    "Web Development": `Hai appena revisionato il lavoro di un collega, scelto come strutturare un sistema, risolto un errore sotto pressione e deciso se pubblicare o aspettare. Questo è il lavoro vero di chi costruisce prodotti digitali: non è solo scrivere codice, è prendere decisioni che hanno un impatto reale.`,
    "Digital Marketing": `Hai appena letto i dati di una campagna, gestito una crisi sui social, pianificato un mese di contenuti e distribuito un budget pubblicitario. Questo è il lavoro vero di chi fa marketing digitale: non è solo pubblicare post, è ragionare in modo strategico su ogni scelta.`,
    "Data Analysis e Data Science": `Hai appena scelto cosa misurare in un progetto reale, trovato un'anomalia nei dati, raccontato i risultati a chi deve prendere decisioni e affrontato un problema di qualità dei dati. Questo è il lavoro vero di chi analizza dati: non è solo fare grafici, è trasformare numeri in risposte concrete.`,
    "Non lo so": `Hai appena affrontato situazioni che richiedevano analisi, comunicazione, problem solving e visione d'insieme. Anche senza un titolo preciso, hai dimostrato di saper ragionare come chi lavora nel digitale ogni giorno.`,
  };

  return conclusions[area] || conclusions["Non lo so"];
};

const generateEncouragement = (area: string, theme: InterestTheme, profile: UserProfile): string => {
  const encouragements: Record<string, string> = {
    "UX/UI Design": `Il modo in cui hai affrontato queste situazioni dice qualcosa di te: sai ascoltare prima di proporre, cerchi il problema vero prima di disegnare soluzioni, e non hai paura di confrontarti con chi la pensa diversamente. Sono le qualità di chi progetta esperienze che funzionano davvero.\n\nC'è un designer in te che ragiona già nel modo giusto. Il Master in UX/UI Design è il posto dove questa versione di te prende forma: impari il metodo, costruisci progetti reali e ti confronti con professionisti che fanno questo lavoro ogni giorno.`,
    "Web Development": `Il modo in cui hai ragionato mostra qualcosa: non ti sei fermato alla soluzione più veloce, hai valutato le conseguenze, hai pensato a chi avrebbe lavorato dopo di te. È così che ragiona chi costruisce software che dura nel tempo.\n\nC'è uno sviluppatore in te che ha già l'approccio giusto. Il Master in Web Development è dove questa mentalità diventa competenza tecnica concreta: impari a costruire, testare e pubblicare prodotti reali con le tecnologie che il mercato cerca.`,
    "Digital Marketing": `Il modo in cui hai letto i dati, gestito la crisi e distribuito le risorse racconta il tuo approccio: non ti accontenti di numeri che sembrano buoni, cerchi quelli che contano davvero. È esattamente la differenza tra chi pubblica contenuti e chi costruisce strategie.\n\nC'è un marketer in te che sa già dove guardare. Il Master in Digital Marketing è dove questa intuizione diventa metodo: impari a pianificare campagne, leggere i risultati e prendere decisioni basate sui dati, lavorando su casi reali.`,
    "Data Analysis e Data Science": `Il modo in cui hai scelto cosa misurare, come verificare un'anomalia e come comunicare i risultati dice molto: non ti perdi nei numeri, cerchi la storia che raccontano. È la differenza tra chi riempie fogli di calcolo e chi trasforma dati in decisioni.\n\nC'è un analista in te che ha già il mindset giusto. Il Master in Data Analysis è dove questo approccio diventa competenza: impari gli strumenti, lavori su dataset reali e costruisci progetti che puoi mostrare a chi assume.`,
    "Non lo so": `Non sapere ancora quale strada prendere non è un limite — è il segno di chi vuole scegliere bene. Il modo in cui hai affrontato queste situazioni mostra che sai adattarti, ragionare sotto pressione e trovare soluzioni anche in contesti nuovi.\n\nQueste sono le basi di qualsiasi carriera nel digitale. Il Master giusto per te è quello dove puoi esplorare, provare e scoprire cosa ti accende davvero — con il supporto di chi ci è già passato.`,
  };

  return encouragements[area] || encouragements["Non lo so"];
};

import { UserProfile, SimulationScenario, Task, MasterRecommendation } from "@/types/simulation";

const masterRecommendations: Record<string, MasterRecommendation> = {
  "UX/UI Design": {
    name: "UX/UI Design e Agenti AI",
    description: "Imparerai a progettare interfacce utente intuitive e accessibili, combinando design thinking con le potenzialità dell'intelligenza artificiale per creare esperienze digitali all'avanguardia.",
    url: "https://www.start2impact.it/master/ux-ui-design/",
  },
  "Web Development": {
    name: "Full Stack Development e Agenti AI",
    description: "Diventerai uno sviluppatore completo, capace di costruire applicazioni web moderne dal frontend al backend, integrando soluzioni AI per automatizzare e potenziare il tuo lavoro.",
    url: "https://www.start2impact.it/master/full-stack-development/",
  },
  "Digital Marketing": {
    name: "Digital Marketing e Agenti AI",
    description: "Acquisirai competenze avanzate in marketing digitale, dalla strategia all'analisi dei dati, imparando a utilizzare l'AI per ottimizzare campagne e creare contenuti efficaci.",
    url: "https://www.start2impact.it/master/digital-marketing/",
  },
  "Data Analysis e Data Science": {
    name: "Data Science, Analytics e Agenti AI",
    description: "Imparerai a estrarre insight dai dati, costruire modelli predittivi e automatizzare analisi complesse, combinando statistica, machine learning e intelligenza artificiale.",
    url: "https://www.start2impact.it/master/data-science-analytics/",
  },
  "Non lo so": {
    name: "Digital Marketing e Agenti AI",
    description: "Un percorso versatile che ti darà competenze trasversali nel mondo digitale, dalla strategia alla creazione di contenuti, preparandoti a ruoli che richiedono visione d'insieme e adattabilità.",
    url: "https://www.start2impact.it/master/digital-marketing/",
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
  productContext: "una piattaforma SaaS per la gestione di progetti complessi",
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
        title: "Analisi del Brief del Cliente",
        context: `Sono le 9:15. Trovi un messaggio del tuo responsabile di ${t.companyName}: c'è un nuovo progetto, migliorare ${t.productContext}. Gli utenti si lamentano: "L'esperienza è confusa e non capisco cosa fare".`,
        challenge: `Devi capire qual è il VERO problema prima di proporre soluzioni. Quale approccio scegli?`,
        technicalTerms: [
          { term: "Brief", explanation: "Documento che riassume le richieste e gli obiettivi di un progetto, fornito dal cliente o dal team." },
          { term: "Slack", explanation: "Piattaforma di messaggistica molto usata nei team di lavoro per comunicare in tempo reale." }
        ],
        choices: [
          {
            id: "a",
            text: "Analizzi i dati di comportamento degli utenti per individuare dove si bloccano nel flusso attuale",
            isCorrect: true,
            feedback: `Perfetto! In ${t.industry}, i dati comportamentali rivelano dove gli utenti si bloccano. Prima capisci il "dove", poi il "perché".`,
          },
          {
            id: "b",
            text: "Proponi di semplificare l'interfaccia riducendo gli elementi visivi e i passaggi richiesti all'utente",
            feedback: "Stai assumendo che il problema sia la complessità senza dati. Nel settore " + t.industry + " potresti eliminare funzionalità cruciali.",
          },
          {
            id: "c",
            text: "Organizzi un focus group con utenti reali del prodotto per raccogliere feedback qualitativi diretti",
            feedback: "I focus group sono utili, ma prima servono dati quantitativi per sapere cosa chiedere. Rischi di basarti su opinioni.",
          },
        ],
        skill: "Problem Framing",
        lesson: `In questo lavoro, resistere all'impulso di progettare subito è fondamentale. Il 50% del lavoro è capire il problema giusto.`,
      },
      {
        id: 2,
        title: "Creazione User Persona",
        context: `Hai analizzato i dati di ${t.companyName}. Il 62% delle persone abbandona l'app dalla schermata principale. Il team ti chiede di scegliere un profilo-tipo di utente su cui concentrare il nuovo design, basandoti sulle interviste fatte la settimana scorsa.`,
        challenge: "Hai 3 profili di utenti reali. Quale scegli come riferimento PRINCIPALE per il progetto?",
        technicalTerms: [
          { term: "User Persona", explanation: "Personaggio fittizio che rappresenta un gruppo di utenti reali, usato per progettare soluzioni centrate sulle loro esigenze." },
          { term: "Abbandoni", explanation: "Quando un utente lascia un'app o un sito senza completare un'azione prevista (es. acquisto, registrazione)." }
        ],
        choices: [
          {
            id: "a",
            text: `Elena, 28 anni, appassionata di ${t.industry}: usa l'app ogni giorno ma è frustrata dalla mancanza di personalizzazione`,
            isCorrect: true,
            feedback: `Ottima scelta! Elena rappresenta il core user di ${t.companyName} e il suo pain point è direttamente collegato al problema principale.`,
          },
          {
            id: "b",
            text: "Marco, 45 anni, professionista: usa l'app di rado ma genera molto valore economico quando la utilizza",
            feedback: `Marco porta valore economico ma non rappresenta l'utente tipo di ${t.industry}. Ottimizzare per lui potrebbe alienare il core.`,
          },
          {
            id: "c",
            text: "Sofia, 19 anni, studentessa: prova molte app concorrenti ed è sempre alla ricerca della soluzione perfetta",
            feedback: "Sofia è interessante ma troppo volatile. Nel " + t.industry + " serve fidelizzare prima di espandere.",
          },
        ],
        skill: "User Research",
        lesson: `In questi ruoli, la persona primaria deve rappresentare chi usa davvero il prodotto, non chi vorresti che lo usasse.`,
      },
      {
        id: 3,
        title: "Wireframing della Soluzione",
        context: `Con Elena come riferimento, sai che il problema è la mancanza di personalizzazione in ${t.productContext}. Apri il programma di design e devi disegnare la bozza della nuova esperienza per ${t.companyName}.`,
        challenge: "Quale strategia di design scegli per risolvere il problema?",
        technicalTerms: [
          { term: "Wireframe", explanation: "Bozza schematica di un'interfaccia, senza colori o grafiche elaborate, che mostra la struttura e la disposizione degli elementi." },
          { term: "Figma", explanation: "Software di design collaborativo molto usato per creare interfacce, prototipi e wireframe." },
          { term: "Onboarding", explanation: "Processo di accoglienza che guida i nuovi utenti a capire come usare un'app o servizio." }
        ],
        choices: [
          {
            id: "a",
            text: "Progettare un onboarding che raccoglie le preferenze dell'utente e personalizza l'esperienza dal primo accesso",
            isCorrect: true,
            feedback: `Eccellente! Nel ${t.industry}, la personalizzazione fin dall'inizio crea engagement. L'utente si sente capito e continua a usare l'app.`,
          },
          {
            id: "b",
            text: "Inserire un sistema di filtri avanzati nella home che permetta agli utenti di fare ricerche più mirate",
            feedback: `I filtri aggiungono complessità. Nel ${t.industry}, gli utenti vogliono che sia l'app a capirli, non dover cercare manualmente.`,
          },
          {
            id: "c",
            text: "Mostrare i contenuti più popolari in evidenza nella home per guidare gli utenti verso qualcosa di rilevante",
            feedback: "Il contenuto popolare non è personalizzazione. Elena vuole sentirsi unica, non vedere cosa piace a tutti.",
          },
        ],
        skill: "Solution Design",
        lesson: `Nel digitale, la personalizzazione non è un plus, è un'aspettativa. Chi non personalizza, perde.`,
      },
      {
        id: 4,
        title: "Review con il Team",
        context: `Sono le 16:00. Presenti la tua bozza al team di ${t.companyName}. Lo sviluppatore più esperto dice: "Per personalizzare davvero l'esperienza ci serve un sistema che suggerisca contenuti su misura per ogni utente. Costruirlo richiederebbe 3 mesi."`,
        challenge: "Come rispondi?",
        technicalTerms: [
          { term: "MVP", explanation: "Minimum Viable Product: versione base di un prodotto con le funzionalità essenziali per testare l'idea." },
          { term: "Sistema di raccomandazione", explanation: "Algoritmo che suggerisce contenuti personalizzati basandosi sui dati e comportamenti dell'utente." }
        ],
        choices: [
          {
            id: "a",
            text: `"Possiamo partire con regole semplici basate sulle scelte dell'onboarding e poi evolvere verso l'AI in una fase 2?"`,
            isCorrect: true,
            feedback: `Perfetto! Hai proposto un MVP che mantiene il valore UX. In ${t.industry}, meglio lanciare qualcosa di buono ora che qualcosa di perfetto mai.`,
          },
          {
            id: "b",
            text: `"L'esperienza utente è la nostra priorità: propongo di riorganizzare la roadmap per trovare il tempo necessario"`,
            feedback: `Ignorare i vincoli crea conflitti. In ${t.companyName} come in ogni azienda, il designer collabora, non impone.`,
          },
          {
            id: "c",
            text: `"Ha senso, togliamo la personalizzazione dall'MVP e puntiamo su un sistema di filtri più veloce da implementare"`,
            feedback: "Arrendersi alla prima obiezione significa perdere una buona soluzione. Prima cerca compromessi.",
          },
        ],
        skill: "Stakeholder Management",
        lesson: `I designer migliori sanno negoziare tra UX ideale e vincoli reali. In questo lavoro come in ogni altro, la soluzione perfetta irrealizzabile non esiste.`,
      },
    ],
    "Web Development": (t) => [
      {
        id: 1,
        title: "Code Review del Collega",
        context: `Sono le 9:30. Il tuo responsabile in ${t.companyName} ti chiede di controllare il lavoro di un collega. Ha scritto una parte del codice per ${t.productContext}, ma noti che ha usato un approccio che funziona ma non segue le buone pratiche del linguaggio che state usando.`,
        challenge: "Cosa fai?",
        technicalTerms: [
          { term: "Code Review", explanation: "Processo in cui un collega esamina il codice scritto da un altro per trovare errori e miglioramenti." },
          { term: "React", explanation: "Libreria JavaScript molto popolare per costruire interfacce utente interattive." },
          { term: "useEffect", explanation: "Funzione di React che permette di eseguire operazioni quando un componente si carica o aggiorna." }
        ],
        choices: [
          {
            id: "a",
            text: "Lasci un commento costruttivo spiegando che in React si usa useRef e alleghi un esempio concreto di refactor",
            isCorrect: true,
            feedback: `Perfetto! Una code review costruttiva insegna. In ${t.companyName}, come in ogni team sano, si cresce insieme.`,
          },
          {
            id: "b",
            text: "Approvi il PR con un commento positivo: il codice funziona correttamente e non vale la pena bloccare il rilascio",
            feedback: `Il codice "che funziona" oggi può causare bug domani. In ${t.industry}, la qualità del codice è fondamentale.`,
          },
          {
            id: "c",
            text: "Riscrivi tu il componente usando l'approccio corretto e lo proponi come alternativa direttamente nella stessa PR",
            feedback: "Riscrivere senza discussione è irrispettoso e toglie l'opportunità di apprendimento.",
          },
        ],
        skill: "Code Review",
        lesson: `In questo lavoro, una buona code review bilancia qualità e crescita del team.`,
      },
      {
        id: 2,
        title: "Implementazione Feature",
        context: `Dalla lista delle attività di ${t.companyName} prendi un compito: "Creare un elemento visivo riutilizzabile per mostrare le informazioni di ${t.productContext}". Il designer ti ha dato le specifiche grafiche.`,
        challenge: "Come organizzi i dati che questo elemento dovrà ricevere per funzionare?",
        technicalTerms: [
          { term: "Backlog", explanation: "Lista di attività o funzionalità da sviluppare, ordinate per priorità." },
          { term: "Jira", explanation: "Software molto usato per gestire progetti e tracciare le attività del team." },
          { term: "Props", explanation: "Dati che vengono passati a un componente React per personalizzarne il comportamento." },
          { term: "Componente", explanation: "Blocco di codice riutilizzabile che rappresenta una parte dell'interfaccia utente." }
        ],
        choices: [
          {
            id: "a",
            text: "Definisci un'interfaccia tipizzata con un oggetto item strutturato e una callback per le azioni utente",
            isCorrect: true,
            feedback: `Eccellente! Un'interfaccia chiara rende il componente riutilizzabile in tutto ${t.productContext}.`,
          },
          {
            id: "b",
            text: "Passi props singole come title, description e image per mantenere il componente semplice e leggibile",
            feedback: `Funziona per casi semplici, ma in ${t.industry} i requisiti evolvono. Con 10+ props diventa ingestibile.`,
          },
          {
            id: "c",
            text: "Il componente riceve solo un ID e recupera internamente i dati di cui ha bisogno tramite una chiamata API",
            feedback: "Viola il principio di 'dumb components'. Difficile da testare e riutilizzare.",
          },
        ],
        skill: "Component Architecture",
        lesson: `Nel digitale, componenti ben strutturati sono riutilizzabili, testabili e scalabili.`,
      },
      {
        id: 3,
        title: "Debugging Misterioso",
        context: `Il sistema che collega ${t.productContext} al server dà errore in alcuni casi. Indagando, noti che il problema si verifica solo quando si inviano grandi quantità di dati.`,
        challenge: "Qual è il prossimo passo per risolvere il problema?",
        technicalTerms: [
          { term: "API", explanation: "Interfaccia che permette a diverse applicazioni di comunicare tra loro, scambiando dati." },
          { term: "Errore 500", explanation: "Codice di errore che indica un problema lato server (non dell'utente)." },
          { term: "DevTools", explanation: "Strumenti per sviluppatori integrati nel browser per ispezionare pagine web e debug." },
          { term: "Payload", explanation: "I dati effettivi che vengono inviati in una richiesta o risposta." }
        ],
        choices: [
          {
            id: "a",
            text: "Verifichi la dimensione del payload che causa l'errore e controlli i log del backend per trovare il problema specifico",
            isCorrect: true,
            feedback: `Perfetto! Debugging sistematico: prima confermi l'ipotesi, poi trovi la root cause.`,
          },
          {
            id: "b",
            text: "Aggiungi un try-catch nel frontend che intercetta l'errore e mostra un messaggio utile all'utente per sbloccarlo",
            feedback: "Stai nascondendo il problema, non risolvendolo. Gli utenti continueranno a essere bloccati.",
          },
          {
            id: "c",
            text: "Apri un ticket dettagliato al team backend descrivendo il problema e allegando gli screenshot dei DevTools come evidenza",
            feedback: "Segnalare senza investigare è poco professionale. Prima capisci, poi comunica.",
          },
        ],
        skill: "Debugging",
        lesson: `In questo lavoro, il debugging efficace segue un metodo: riproduci, isola, verifica, risolvi.`,
      },
      {
        id: 4,
        title: "Deploy Venerdì Sera",
        context: `Sono le 17:30 di venerdì. La nuova funzionalità per ${t.companyName} è pronta. Il responsabile ti chiede: "Puoi pubblicarla online così gli utenti la vedono? Lunedì il cliente vuole vedere la novità."`,
        challenge: "Cosa fai?",
        technicalTerms: [
          { term: "Deploy", explanation: "Processo di pubblicazione del codice su un server per renderlo disponibile agli utenti." },
          { term: "Staging", explanation: "Ambiente di test che simula la produzione, usato per verifiche finali prima del rilascio." },
          { term: "Produzione (prod)", explanation: "L'ambiente reale dove gli utenti finali usano l'applicazione." }
        ],
        choices: [
          {
            id: "a",
            text: "Fai merge su staging per verificare che tutto funzioni e proponi il deploy in produzione lunedì mattina presto",
            isCorrect: true,
            feedback: `Ottima gestione del rischio! Hai completato il lavoro ma evitato problemi nel weekend.`,
          },
          {
            id: "b",
            text: "Procedi con il deploy in produzione: i test automatici passano tutti e la feature è stata validata dal team",
            feedback: `Il "Friday deploy" è un anti-pattern. Se esplode sabato, chi interviene?`,
          },
          {
            id: "c",
            text: "Comunichi al lead che è meglio posticipare il deploy a lunedì perché un rilascio il venerdì è troppo rischioso",
            feedback: "Rifiutare senza alternative non è professionale. Proponi un compromesso.",
          },
        ],
        skill: "Risk Management",
        lesson: `Nel digitale, i dev esperti bilanciano velocità e rischio.`,
      },
    ],
    "Digital Marketing": (t) => [
      {
        id: 1,
        title: "Analisi Campagna Social",
        context: `Sono le 9:00. Apri il pannello di gestione delle pubblicità online di ${t.companyName}. La campagna promozionale estiva è terminata. Budget speso: €500. Devi preparare un resoconto per il cliente.`,
        challenge: `I risultati dicono: 45.000 persone hanno visto la pubblicità, l'1.2% ha interagito (like, commenti), 380 hanno cliccato, ma solo 12 hanno fatto l'azione desiderata (acquisto o iscrizione). Il cliente ne voleva 50. Come presenti i risultati?`,
        technicalTerms: [
          { term: "Reach", explanation: "Numero di persone uniche che hanno visto il contenuto." },
          { term: "Engagement", explanation: "Interazioni degli utenti (like, commenti, condivisioni) rispetto al numero di visualizzazioni." },
          { term: "Conversioni", explanation: "Azioni completate dagli utenti (acquisti, iscrizioni, download) che rappresentano l'obiettivo della campagna." },
          { term: "CR (Conversion Rate)", explanation: "Percentuale di visitatori che completano l'azione desiderata." }
        ],
        choices: [
          {
            id: "a",
            text: `"Il collo di bottiglia è la landing page: 380 click ma solo 12 conversioni. Propongo un A/B test sulla pagina per migliorare il tasso"`,
            isCorrect: true,
            feedback: `Eccellente! Hai identificato dove si perde il traffico e proposto una soluzione per ${t.industry}.`,
          },
          {
            id: "b",
            text: `"La campagna ha portato 45.000 persone raggiunte e 380 click qualificati. Propongo di scalare il budget per aumentare i volumi"`,
            feedback: "Stai mascherando il fallimento con vanity metrics. Il cliente voleva conversioni, non reach.",
          },
          {
            id: "c",
            text: `"I risultati sono sotto le aspettative. Suggerisco di rivedere il targeting e riallocare il budget su un canale più performante"`,
            feedback: "Senza capire PERCHÉ non ha funzionato, più budget = più spreco.",
          },
        ],
        skill: "Data Analysis",
        lesson: `In questo lavoro, l'onestà sui dati costruisce fiducia. I clienti apprezzano diagnosi precise.`,
      },
      {
        id: 2,
        title: "Crisi Social Media",
        context: `Sono le 11:00. Un utente ha postato una recensione negativa su ${t.companyName}: "Servizio pessimo, non lo consiglio". Ha 50 commenti e sta crescendo.`,
        challenge: "Come gestisci la situazione?",
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
        lesson: `Nel digitale, le crisi social sono opportunità per dimostrare i valori del brand.`,
      },
      {
        id: 3,
        title: "Pianificazione Contenuti",
        context: `Il team di ${t.companyName} ti chiede di pianificare i contenuti da pubblicare sui social il prossimo mese. Hai budget per 12 post (testi e immagini) e 2 video.`,
        challenge: "Come distribuisci i diversi tipi di contenuti?",
        choices: [
          {
            id: "a",
            text: "Mix bilanciato: 40% contenuti educational sul settore, 30% behind-the-scenes, 20% prodotto e 10% contenuti della community",
            isCorrect: true,
            feedback: `Eccellente mix! In ${t.industry}, educare crea autorevolezza, il BTS umanizza, il prodotto converte, UGC crea community.`,
          },
          {
            id: "b",
            text: "Focus sulla conversione: 80% contenuti prodotto con call-to-action dirette e 20% educational di contesto per il settore",
            feedback: `Troppo push. Nel ${t.industry}, chi parla solo di sé stanca il pubblico.`,
          },
          {
            id: "c",
            text: "Focus sull'engagement: 70% trend e contenuti virali del momento, 30% prodotto per mantenere la rilevanza del brand",
            feedback: "L'engagement fine a sé stesso non porta risultati. Servono contenuti che costruiscono relazione.",
          },
        ],
        skill: "Content Strategy",
        lesson: `In questi ruoli, il mix di contenuti bilancia brand building e performance.`,
      },
      {
        id: 4,
        title: "Budget Allocation",
        context: `Il CEO di ${t.companyName} ti dà €3.000 in più da spendere in pubblicità online negli ultimi 3 mesi dell'anno. Devi decidere come investirli per ottenere il massimo risultato.`,
        challenge: "Come distribuisci il budget?",
        choices: [
          {
            id: "a",
            text: "€1.500 su retargeting degli utenti che hanno già interagito, €1.000 su audience lookalike e €500 su test di nuovi segmenti",
            isCorrect: true,
            feedback: `Strategia smart! Il retargeting ha il ROI più alto, i lookalike scalano, i test preparano il futuro.`,
          },
          {
            id: "b",
            text: "€3.000 su campagne awareness per massimizzare la reach e far conoscere il brand a più persone possibili nel Q4",
            feedback: `L'awareness senza conversion strategy è vanity. In ${t.industry}, serve un funnel completo.`,
          },
          {
            id: "c",
            text: "€3.000 su una collaborazione con micro-influencer del settore per generare contenuti autentici e visibilità rapida",
            feedback: "Gli influencer funzionano ma €3k bastano per micro-influencer. Il ROI è incerto.",
          },
        ],
        skill: "Budget Optimization",
        lesson: `Nel digitale, il budget va dove i dati dicono che funziona, non dove sembra più cool.`,
      },
    ],
    "Data Analysis e Data Science": (t) => [
      {
        id: 1,
        title: "Richiesta dal Business",
        context: `Sono le 9:00. Il CEO di ${t.companyName} ti scrive: "Mi servono i numeri su come è andato il trimestre per la riunione con gli investitori di domani." Hai 24 ore.`,
        challenge: "Come affronti la richiesta?",
        choices: [
          {
            id: "a",
            text: "Chiedi al CEO quali metriche specifiche servono e qual è il messaggio che vuole trasmettere alla board",
            isCorrect: true,
            feedback: `Perfetto! In ${t.industry}, capire il contesto evita di produrre dati inutili. Il CEO probabilmente non sa esattamente cosa vuole.`,
          },
          {
            id: "b",
            text: "Prepari un report completo con tutte le metriche disponibili organizzate per area, così la board ha il quadro intero",
            feedback: "Troppi dati = nessuna storia. La board ha 10 minuti, non 2 ore.",
          },
          {
            id: "c",
            text: "Estrai rapidamente i dati principali in un foglio strutturato e li invii al CEO così può selezionare ciò che serve",
            feedback: "Il CEO non ha tempo (né competenze) per analizzare dati grezzi. Il tuo valore è tradurli.",
          },
        ],
        skill: "Stakeholder Communication",
        lesson: `In questo lavoro, l'analista bravo non risponde a domande: aiuta a fare quelle giuste.`,
      },
      {
        id: 2,
        title: "Data Quality Issue",
        context: `Stai analizzando i dati degli utenti di ${t.productContext}. Ti accorgi che nel 15% dei casi manca un'informazione importante: il punteggio che misura quanto gli utenti sono attivi.`,
        challenge: "Come gestisci queste informazioni mancanti?",
        choices: [
          {
            id: "a",
            text: "Analizzi il pattern dei valori mancanti per capire se sono casuali o sistematici, poi decidi la strategia migliore",
            isCorrect: true,
            feedback: `Eccellente! In ${t.industry}, i missing values raccontano una storia. Capire PERCHÉ mancano è fondamentale.`,
          },
          {
            id: "b",
            text: "Li sostituisci con la media del campo per mantenere il dataset completo e non perdere il 15% dei record",
            feedback: "La media può introdurre bias. Se i missing sono sistematici (es. utenti che non completano), la media è sbagliata.",
          },
          {
            id: "c",
            text: "Li escludi dall'analisi per lavorare solo su dati certi e presentare risultati basati su informazioni verificate",
            feedback: `Escludere il 15% può introdurre selection bias. In ${t.industry}, perderesti insight importanti.`,
          },
        ],
        skill: "Data Quality",
        lesson: `In questi ruoli, la data quality è il fondamento. Garbage in, garbage out.`,
      },
      {
        id: 3,
        title: "Insight Controintuitivo",
        context: `La tua analisi per ${t.companyName} mostra un risultato strano: gli utenti che usano meno l'app sono quelli che continuano a usarla più a lungo nel tempo. Sembra il contrario di quello che ti aspetteresti.`,
        challenge: "Come procedi?",
        choices: [
          {
            id: "a",
            text: "Indaghi il segmento per capire chi sono questi utenti e perché ottengono valore con meno tempo di utilizzo",
            isCorrect: true,
            feedback: `Ottimo! In ${t.industry}, i dati controintuitivi spesso nascondono gli insight più preziosi.`,
          },
          {
            id: "b",
            text: "Verifichi se l'anomalia dipende da un errore nei dati o nella raccolta prima di trarre qualsiasi conclusione",
            feedback: "Ignorare anomalie è un errore. Spesso le scoperte più importanti sembrano 'strane' all'inizio.",
          },
          {
            id: "c",
            text: "Inserisci il dato nel report lasciando al team di business l'interpretazione e le decisioni che ne conseguono",
            feedback: "Presentare senza interpretare non aggiunge valore. Il tuo lavoro è spiegare, non solo mostrare.",
          },
        ],
        skill: "Critical Thinking",
        lesson: `Nel digitale, i dati controintuitivi meritano più attenzione, non meno.`,
      },
      {
        id: 4,
        title: "Presentazione ai Non-Tecnici",
        context: `Devi presentare i risultati della tua analisi al team marketing di ${t.companyName}. Hai scoperto che gli utenti si dividono in 3 gruppi con abitudini molto diverse tra loro.`,
        challenge: "Come presenti i risultati a colleghi che non hanno competenze tecniche?",
        choices: [
          {
            id: "a",
            text: "Dai un nome descrittivo a ogni cluster e mostri uno o due insight concreti e azionabili per ciascun gruppo",
            isCorrect: true,
            feedback: `Perfetto! 'Gli Esploratori', 'I Fedeli', 'I Dormienti' sono più memorabili di 'Cluster 1, 2, 3'.`,
          },
          {
            id: "b",
            text: "Spieghi la metodologia statistica usata e mostri i grafici tecnici per dare credibilità scientifica ai risultati",
            feedback: "Al marketing non interessa come hai fatto, ma cosa significa per loro.",
          },
          {
            id: "c",
            text: "Prepari un report scritto dettagliato con tutti i dati e lo invii via email così ognuno può leggerlo con calma",
            feedback: "Il report scritto finisce nel dimenticatoio. La presentazione crea allineamento e discussione.",
          },
        ],
        skill: "Data Storytelling",
        lesson: `In questo lavoro, un insight non comunicato bene è un insight sprecato.`,
      },
    ],
    "Non lo so": (t) => [
      {
        id: 1,
        title: "Kickoff di Progetto",
        context: `Sono le 9:00. Entri alla prima riunione del nuovo progetto per ${t.companyName}: sviluppare ${t.productContext}. Ci sono il grafico, il programmatore e i responsabili del progetto.`,
        challenge: "Qual è la prima cosa da chiarire?",
        choices: [
          {
            id: "a",
            text: "Definire gli obiettivi concreti e le metriche di successo: cosa significa esattamente 'fatto bene' per questo progetto?",
            isCorrect: true,
            feedback: `Perfetto! Senza obiettivi chiari, ogni progetto in ${t.industry} rischia di andare alla deriva.`,
          },
          {
            id: "b",
            text: "Impostare subito un piano operativo con timeline, milestone e responsabilità chiare per ogni membro del team",
            feedback: "Il piano viene dopo gli obiettivi. Come pianifichi se non sai dove vuoi arrivare?",
          },
          {
            id: "c",
            text: "Chiedere a ogni persona presente di condividere la propria visione del progetto per mappare le aspettative del team",
            feedback: "Utile per capire le aspettative, ma rischi 10 visioni diverse senza una direzione.",
          },
        ],
        skill: "Project Initiation",
        lesson: `Nel digitale, i progetti falliscono più per obiettivi vaghi che per esecuzione scarsa.`,
      },
      {
        id: 2,
        title: "Conflitto tra Team",
        context: `Il grafico e il programmatore di ${t.companyName} non sono d'accordo su una funzionalità. Il grafico vuole un effetto visivo elaborato, il programmatore dice che renderebbe l'app troppo lenta.`,
        challenge: "Come gestisci la situazione?",
        choices: [
          {
            id: "a",
            text: "Faciliti una discussione chiedendo qual è l'obiettivo dell'animazione e se esiste un compromesso che soddisfi entrambi",
            isCorrect: true,
            feedback: `Ottimo! In ${t.industry}, il coordinatore non decide ma facilita. L'obiettivo comune sblocca i conflitti.`,
          },
          {
            id: "b",
            text: "Dai priorità alla posizione del developer perché la performance dell'app ha un impatto diretto sull'esperienza utente",
            feedback: "Prendere parte crea risentimento. Non sei un giudice, sei un facilitatore.",
          },
          {
            id: "c",
            text: "Porti la questione al manager del team perché prenda una decisione definitiva avendo una visione d'insieme più ampia",
            feedback: "Escalare subito ti fa sembrare incapace di gestire conflitti. Prima prova a risolverlo.",
          },
        ],
        skill: "Conflict Resolution",
        lesson: `In questi ruoli, i conflitti spesso nascono da obiettivi diversi. Trovare l'obiettivo comune li risolve.`,
      },
      {
        id: 3,
        title: "Deadline a Rischio",
        context: `Mancano 5 giorni alla presentazione di ${t.productContext} a un cliente importante. Il team è indietro del 30% rispetto al piano previsto.`,
        challenge: "Come affronti la situazione?",
        choices: [
          {
            id: "a",
            text: "Convochi una riunione di prioritizzazione per distinguere cosa è essenziale per la demo e cosa si può rimandare",
            isCorrect: true,
            feedback: `Perfetto! In ${t.industry}, meglio consegnare meno ma funzionante che tutto ma rotto.`,
          },
          {
            id: "b",
            text: "Organizzi un piano di lavoro intensivo per il team così da recuperare il ritardo e consegnare tutto in tempo",
            feedback: "Gli straordinari creano burnout e errori. Nel lungo periodo, peggiori le cose.",
          },
          {
            id: "c",
            text: "Contatti il cliente in anticipo per proporre di spostare la demo di una settimana e consegnare un lavoro completo",
            feedback: "Rimandare è l'ultima opzione. Prima vedi se puoi consegnare un MVP valido.",
          },
        ],
        skill: "Scope Management",
        lesson: `In questo lavoro, saper dire 'questo lo tagliamo' è cruciale quanto saper dire 'questo lo facciamo'.`,
      },
      {
        id: 4,
        title: "Feedback al Team",
        context: `Un membro del team di ${t.companyName} sta sottoperformando. Non rispetta le deadline e la qualità è calata.`,
        challenge: "Come affronti la conversazione?",
        choices: [
          {
            id: "a",
            text: "Organizzi un incontro 1-to-1 privato per capire cosa sta succedendo e offrire supporto concreto alla persona",
            isCorrect: true,
            feedback: `Perfetto! Partire con curiosità, non giudizio. Spesso ci sono motivi non visibili.`,
          },
          {
            id: "b",
            text: "Sollevi il tema nel daily standup in modo trasparente così tutto il team è allineato e può contribuire a risolvere",
            feedback: "Il feedback negativo in pubblico umilia e crea risentimento. Sempre in privato.",
          },
          {
            id: "c",
            text: "Gli dai ancora qualche settimana di tempo per riprendere il ritmo, monitorando la situazione senza metterlo sotto pressione",
            feedback: "Ignorare il problema lo peggiora. Il feedback tempestivo aiuta tutti.",
          },
        ],
        skill: "People Management",
        lesson: `Nel digitale, il feedback è un regalo. Darlo bene è un'arte che si impara.`,
      },
    ],
  };

  const generator = taskTemplates[area] || taskTemplates["Non lo so"];
  return generator(theme);
};

const generatePersonalizedFinalScenario = (area: string, theme: InterestTheme) => {
  const scenarios: Record<string, { context: string; situation: string; choices: { id: string; text: string; outcome: string }[] }> = {
    "UX/UI Design": {
      context: `Dopo 6 mesi in ${theme.companyName}, hai dimostrato il tuo valore. Il tuo redesign ha aumentato la retention del 25%.`,
      situation: `Il CEO ti propone tre opportunità di crescita nel ${theme.industry}. Quale scegli?`,
      choices: [
        {
          id: "a",
          text: "Lead Designer: guidare un team di 3 junior sul prossimo prodotto",
          outcome: `Scegli la leadership. In un anno, il tuo team lancia un prodotto che diventa il core business di ${theme.companyName}. Impari che far crescere altri è più gratificante che brillare da solo.`,
        },
        {
          id: "b",
          text: "Specializzazione: diventare l'esperto di Design System dell'azienda",
          outcome: `Scegli la profondità. Costruisci un design system che accelera lo sviluppo del 40%. Diventi la persona che tutti consultano. La specializzazione paga.`,
        },
        {
          id: "c",
          text: "Product: passare a Product Designer per avere più impatto strategico",
          outcome: `Scegli l'impatto. Lavori a stretto contatto con CEO e stakeholder. Le tue decisioni influenzano la direzione dell'azienda. Il design diventa strategia.`,
        },
      ],
    },
    "Web Development": {
      context: `Dopo 6 mesi in ${theme.companyName}, il tuo codice è in produzione e usato da migliaia di utenti nel ${theme.industry}.`,
      situation: "Il CTO ti presenta tre path di crescita. Quale ti attira di più?",
      choices: [
        {
          id: "a",
          text: "Tech Lead: guidare le scelte architetturali del team",
          outcome: `Scegli la leadership tecnica. In un anno, guidi la migrazione a una nuova architettura. Il sistema è più veloce e scalabile. I junior ti vedono come mentore.`,
        },
        {
          id: "b",
          text: "Full-Stack: espanderti al backend per vedere il quadro completo",
          outcome: `Scegli la completezza. Costruisci feature end-to-end. Capisci come tutto si connette. Diventi il dev che può risolvere qualsiasi problema.`,
        },
        {
          id: "c",
          text: "DevOps/Platform: lavorare sull'infrastruttura che supporta tutto",
          outcome: `Scegli le fondamenta. Automatizzi deploy, monitoraggio, scaling. Ogni dev dell'azienda lavora meglio grazie a te. L'impatto è invisibile ma enorme.`,
        },
      ],
    },
    "Digital Marketing": {
      context: `Dopo 6 mesi in ${theme.companyName}, le tue campagne hanno generato €200k di revenue attribuibile nel ${theme.industry}.`,
      situation: "Il CMO ti propone tre direzioni di crescita. Quale scegli?",
      choices: [
        {
          id: "a",
          text: "Performance Marketing: specializzarti in paid acquisition e ottimizzazione",
          outcome: `Scegli i numeri. Diventi un mago delle ads. Ogni euro speso ne genera 5. Le aziende ti cercano perché porti risultati misurabili.`,
        },
        {
          id: "b",
          text: "Brand & Content: costruire la narrativa e l'identità del marchio",
          outcome: `Scegli la storia. Costruisci un brand che le persone amano nel ${theme.industry}. Il content che crei viene condiviso organicamente. Il valore è nel lungo termine.`,
        },
        {
          id: "c",
          text: "Growth: visione olistica su tutto il funnel, dalla awareness alla retention",
          outcome: `Scegli il sistema. Vedi come ogni pezzo si connette. Ottimizzi l'intero journey, non solo un canale. Diventi indispensabile per la crescita.`,
        },
      ],
    },
    "Data Analysis e Data Science": {
      context: `Dopo 6 mesi in ${theme.companyName}, le tue analisi hanno influenzato decisioni da milioni di euro nel ${theme.industry}.`,
      situation: "Il CDO ti presenta tre opportunità. Quale ti ispira di più?",
      choices: [
        {
          id: "a",
          text: "Data Science: costruire modelli predittivi e algoritmi di ML",
          outcome: `Scegli l'AI. Costruisci modelli che predicono il comportamento utenti nel ${theme.industry}. L'azienda prende decisioni prima che i problemi emergano. Sei nel futuro.`,
        },
        {
          id: "b",
          text: "Analytics Lead: guidare le analytics di un'intera business unit",
          outcome: `Scegli l'impatto. Ogni decisione della BU passa dai tuoi insight. Impari il business profondamente. I dati diventano strategia.`,
        },
        {
          id: "c",
          text: "Data Engineering: costruire l'infrastruttura dati che abilita tutto",
          outcome: `Scegli le fondamenta. Costruisci pipeline che trasformano dati grezzi in insight. Ogni analyst lavora meglio grazie alla tua architettura.`,
        },
      ],
    },
    "Non lo so": {
      context: `Dopo 6 mesi in ${theme.companyName}, hai esplorato diversi ruoli nel ${theme.industry}. Hai capito cosa ti piace e cosa no.`,
      situation: "Il tuo manager ti chiede dove vuoi specializzarti. Cosa scegli?",
      choices: [
        {
          id: "a",
          text: "Product Management: definire cosa costruire e perché",
          outcome: `Scegli la strategia. Diventi il ponte tra business, design e tech. In un anno gestisci la roadmap di un prodotto. Le tue decisioni plasmano il futuro.`,
        },
        {
          id: "b",
          text: "Project Management: far succedere le cose, coordinare e consegnare",
          outcome: `Scegli l'esecuzione. Diventi chi tiene insieme i progetti complessi. Il team ti adora perché risolvi problemi prima che esplodano.`,
        },
        {
          id: "c",
          text: "Ancora 3 mesi di esplorazione in un'area che non hai provato",
          outcome: `Scegli l'esplorazione. Scopri una passione inaspettata per il growth hacking. A volte la risposta è dove non hai ancora guardato.`,
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
    "UX/UI Design": `Sono le 8:55. Entri nell'ufficio di ${theme.companyName}, ${theme.companyDescription}. Saluti il team e ti siedi alla tua postazione. Due monitor, Figma aperto, post-it colorati ovunque. Oggi lavorerai su ${theme.productContext}. La playlist lo-fi parte e sei pronto.`,
    "Web Development": `Sono le 9:00. Ti colleghi da remoto per ${theme.companyName}, ${theme.companyDescription}. Apri VS Code e Slack. Il daily standup è tra 15 minuti. Oggi lavorerai su ${theme.productContext}. Caffè pronto, cuffie on, si parte.`,
    "Digital Marketing": `Sono le 8:45. Apri il laptop al coworking, lavori per ${theme.companyName}, ${theme.companyDescription}. Prima cosa: controllare i canali social. Oggi pianificherai campagne per ${theme.productContext}. Il cappuccino è pronto, si inizia.`,
    "Data Analysis e Data Science": `Sono le 9:15. Arrivi nell'ufficio di ${theme.companyName}, ${theme.companyDescription}. Jupyter Notebook già caricato mentalmente. Oggi analizzerai i dati di ${theme.productContext}. Due monitor, Python in esecuzione perpetua, si parte.`,
    "Non lo so": `Sono le 9:00. Entri in ${theme.companyName}, ${theme.companyDescription}. Il tuo ruolo è trasversale: ogni giorno tocchi aree diverse. Oggi lavorerai su ${theme.productContext}. Apri il calendario, guardi le priorità della giornata e parti.`,
  };

  return intros[area] || intros["Non lo so"];
};

const generateConclusion = (area: string, theme: InterestTheme, profile: UserProfile): string => {
  const conclusions: Record<string, string> = {
    "UX/UI Design": `Questo lavoro in ${theme.industry} valorizza la tua capacità di osservare, analizzare e risolvere problemi. Il tuo background in "${profile.background}" combinato con la passione per "${profile.interests}" ti dà una prospettiva unica che pochi hanno.`,
    "Web Development": `Il tuo percorso ti ha preparato a costruire soluzioni reali in ${theme.industry}. Con il tuo background in "${profile.background}" e l'interesse per "${profile.interests}", puoi creare prodotti che fanno la differenza.`,
    "Digital Marketing": `La tua sensibilità comunicativa è un asset in ${theme.industry}. Unisci la tua formazione in "${profile.background}" con la passione per "${profile.interests}" per connettere brand e persone in modo autentico.`,
    "Data Analysis e Data Science": `Il tuo approccio metodico trova casa in ${theme.industry}. Con il background in "${profile.background}" e l'interesse per "${profile.interests}", trasformi dati in decisioni che contano.`,
    "Non lo so": `La tua versatilità è un superpotere in ${theme.industry}. Il background in "${profile.background}" unito all'interesse per "${profile.interests}" ti rende un professionista unico, capace di fare da ponte tra discipline.`,
  };

  return conclusions[area] || conclusions["Non lo so"];
};

const generateEncouragement = (area: string, theme: InterestTheme, profile: UserProfile): string => {
  const encouragements: Record<string, string> = {
    "UX/UI Design": `Hai vissuto una giornata tipo come UX/UI Designer in ${theme.industry}. Non è solo disegnare schermate: è capire le persone, risolvere problemi e creare esperienze che contano.\n\nIl tuo background in "${profile.background}" unito alla passione per "${profile.interests}" è esattamente ciò che serve: una prospettiva unica che i designer "puri" non hanno.\n\nInizia con piccoli progetti nel settore ${theme.industry}. Esplora Figma, leggi casi studio. Ogni app che usi diventa un'opportunità per imparare.`,
    "Web Development": `Hai vissuto una giornata tipo come Developer in ${theme.industry}. Non è solo scrivere codice: è costruire soluzioni che risolvono problemi reali.\n\nCon "${profile.background}" come formazione e "${profile.interests}" come passione, hai tutto per creare prodotti unici nel ${theme.industry}.\n\nInizia con un progetto personale. Una landing page, un'app semplice. La teoria serve, ma è facendo che si impara davvero.`,
    "Digital Marketing": `Hai vissuto una giornata tipo nel Digital Marketing per ${theme.industry}. Non è solo postare sui social: è capire le persone e raccontare storie che coinvolgono.\n\nIl tuo background in "${profile.background}" e la passione per "${profile.interests}" sono un mix vincente: capisci sia il business che le persone.\n\nInizia gestendo i social di un progetto nel ${theme.industry}. Sperimenta, misura, impara. Ogni brand che segui diventa un caso studio.`,
    "Data Analysis e Data Science": `Hai vissuto una giornata tipo come Data Analyst in ${theme.industry}. Non è solo fare grafici: è trovare storie nascoste nei numeri.\n\nCon "${profile.background}" come base e "${profile.interests}" come passione, hai la prospettiva giusta per trovare insight che altri non vedono.\n\nInizia con dataset pubblici del ${theme.industry}. Kaggle è un buon punto di partenza. Ogni dataset è un puzzle che aspetta di essere risolto.`,
    "Non lo so": `Hai vissuto una giornata tipo in un ruolo che combina competenze diverse in ${theme.industry}. Non sapere ancora cosa vuoi è un'opportunità per esplorare.\n\nIl tuo background in "${profile.background}" e l'interesse per "${profile.interests}" sono fondamenta solide per qualsiasi percorso.\n\nEsplora diverse aree, prova corsi introduttivi. Il mondo digitale ha bisogno di persone versatili come te.`,
  };

  return encouragements[area] || encouragements["Non lo so"];
};

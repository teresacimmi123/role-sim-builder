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
        context: `Sono le 9:15. Apri Slack e trovi un messaggio del tuo team lead di ${t.companyName}. C'è il brief per un nuovo progetto: migliorare ${t.productContext}. Il feedback degli utenti dice che "l'esperienza è confusa e non capisco cosa fare".`,
        challenge: `Come ${t.companyName} opera nel settore ${t.industry}, devi capire il VERO problema. Quale approccio scegli?`,
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
        context: `Hai analizzato i dati di ${t.companyName}. Il 62% degli abbandoni avviene nella schermata principale. Il team ti chiede di creare una persona basata sulle interviste della scorsa settimana nel settore ${t.industry}.`,
        challenge: "Hai 3 profili. Quale scegli come persona PRIMARIA?",
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
        context: `Con Elena come persona, sai che il problema è la mancanza di personalizzazione in ${t.productContext}. Apri Figma e devi progettare il wireframe della nuova esperienza per ${t.companyName}.`,
        challenge: "Quale approccio di design scegli?",
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
        context: `Sono le 16:00. Presenti il wireframe al team di ${t.companyName}. Il developer senior dice: "L'onboarding personalizzato richiede un sistema di raccomandazione che non abbiamo. Ci vorrebbero 3 mesi."`,
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
        context: `Sono le 9:30. Il tuo lead di ${t.companyName} ti assegna la review del codice di un altro dev. Ha creato un componente React per ${t.productContext}, ma noti che usa document.getElementById dentro useEffect.`,
        challenge: "Cosa fai?",
        technicalTerms: [
          { term: "Code Review", explanation: "Processo in cui un collega esamina il codice scritto da un altro per trovare errori e miglioramenti." },
          { term: "React", explanation: "Libreria JavaScript molto popolare per costruire interfacce utente interattive." },
          { term: "useEffect", explanation: "Funzione di React che permette di eseguire operazioni quando un componente si carica o aggiorna." }
        ],
        choices: [
          {
            id: "a",
            text: "Lasci un commento spiegando che in React si usa useRef, allegando un esempio di refactor",
            isCorrect: true,
            feedback: `Perfetto! Una code review costruttiva insegna. In ${t.companyName}, come in ogni team sano, si cresce insieme.`,
          },
          {
            id: "b",
            text: "Approvi il PR, funziona e non vuoi sembrare pignolo",
            feedback: `Il codice "che funziona" oggi può causare bug domani. In ${t.industry}, la qualità del codice è fondamentale.`,
          },
          {
            id: "c",
            text: "Riscrivi tu il componente nel modo corretto e sostituisci il suo codice",
            feedback: "Riscrivere senza discussione è irrispettoso e toglie l'opportunità di apprendimento.",
          },
        ],
        skill: "Code Review",
        lesson: `In questo lavoro, una buona code review bilancia qualità e crescita del team.`,
      },
      {
        id: 2,
        title: "Implementazione Feature",
        context: `Dal backlog Jira di ${t.companyName} prendi il ticket: "Creare componente Card per ${t.productContext}". Il designer ti ha passato le specifiche.`,
        challenge: "Come strutturi le props del componente?",
        technicalTerms: [
          { term: "Backlog", explanation: "Lista di attività o funzionalità da sviluppare, ordinate per priorità." },
          { term: "Jira", explanation: "Software molto usato per gestire progetti e tracciare le attività del team." },
          { term: "Props", explanation: "Dati che vengono passati a un componente React per personalizzarne il comportamento." },
          { term: "Componente", explanation: "Blocco di codice riutilizzabile che rappresenta una parte dell'interfaccia utente." }
        ],
        choices: [
          {
            id: "a",
            text: "Props tipizzate con interfaccia: { item: ItemType, onAction: callback }",
            isCorrect: true,
            feedback: `Eccellente! Un'interfaccia chiara rende il componente riutilizzabile in tutto ${t.productContext}.`,
          },
          {
            id: "b",
            text: "Props singole: { title, description, image } più semplice e diretto",
            feedback: `Funziona per casi semplici, ma in ${t.industry} i requisiti evolvono. Con 10+ props diventa ingestibile.`,
          },
          {
            id: "c",
            text: "Il componente fa fetch dei dati internamente dato un ID",
            feedback: "Viola il principio di 'dumb components'. Difficile da testare e riutilizzare.",
          },
        ],
        skill: "Component Architecture",
        lesson: `Nel digitale, componenti ben strutturati sono riutilizzabili, testabili e scalabili.`,
      },
      {
        id: 3,
        title: "Debugging Misterioso",
        context: `L'API di ${t.productContext} restituisce 500 in alcuni casi. Dai DevTools noti che fallisce solo con payload grandi.`,
        challenge: "Qual è il prossimo step?",
        technicalTerms: [
          { term: "API", explanation: "Interfaccia che permette a diverse applicazioni di comunicare tra loro, scambiando dati." },
          { term: "Errore 500", explanation: "Codice di errore che indica un problema lato server (non dell'utente)." },
          { term: "DevTools", explanation: "Strumenti per sviluppatori integrati nel browser per ispezionare pagine web e debug." },
          { term: "Payload", explanation: "I dati effettivi che vengono inviati in una richiesta o risposta." }
        ],
        choices: [
          {
            id: "a",
            text: "Controlli dimensione del payload e verifichi i log backend per l'errore specifico",
            isCorrect: true,
            feedback: `Perfetto! Debugging sistematico: prima confermi l'ipotesi, poi trovi la root cause.`,
          },
          {
            id: "b",
            text: "Aggiungi try-catch nel frontend per gestire l'errore con messaggio generico",
            feedback: "Stai nascondendo il problema, non risolvendolo. Gli utenti continueranno a essere bloccati.",
          },
          {
            id: "c",
            text: "Scrivi al team backend che la loro API è rotta",
            feedback: "Segnalare senza investigare è poco professionale. Prima capisci, poi comunica.",
          },
        ],
        skill: "Debugging",
        lesson: `In questo lavoro, il debugging efficace segue un metodo: riproduci, isola, verifica, risolvi.`,
      },
      {
        id: 4,
        title: "Deploy Venerdì Sera",
        context: `Sono le 17:30 di venerdì. La feature per ${t.companyName} è pronta. Il lead chiede: "Puoi fare deploy? Lunedì il cliente vuole vedere la novità."`,
        challenge: "Cosa fai?",
        technicalTerms: [
          { term: "Deploy", explanation: "Processo di pubblicazione del codice su un server per renderlo disponibile agli utenti." },
          { term: "Staging", explanation: "Ambiente di test che simula la produzione, usato per verifiche finali prima del rilascio." },
          { term: "Produzione (prod)", explanation: "L'ambiente reale dove gli utenti finali usano l'applicazione." }
        ],
        choices: [
          {
            id: "a",
            text: "Merge su staging, verifichi che funzioni, proponi deploy in prod lunedì mattina",
            isCorrect: true,
            feedback: `Ottima gestione del rischio! Hai completato il lavoro ma evitato problemi nel weekend.`,
          },
          {
            id: "b",
            text: "Deploy immediato: i test passano, cosa può andare storto?",
            feedback: `Il "Friday deploy" è un anti-pattern. Se esplode sabato, chi interviene?`,
          },
          {
            id: "c",
            text: "Dici che preferisci non fare deploy oggi perché è venerdì",
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
        context: `Sono le 9:00. Apri Meta Business per ${t.companyName}. La campagna "${t.industry} Summer" è terminata. Budget: €500. Devi preparare il report.`,
        challenge: `Vedi: Reach 45.000, Engagement 1.2%, Click 380, Conversioni 12. Il cliente voleva 50 conversioni. Come presenti i risultati?`,
        technicalTerms: [
          { term: "Reach", explanation: "Numero di persone uniche che hanno visto il contenuto." },
          { term: "Engagement", explanation: "Interazioni degli utenti (like, commenti, condivisioni) rispetto al numero di visualizzazioni." },
          { term: "Conversioni", explanation: "Azioni completate dagli utenti (acquisti, iscrizioni, download) che rappresentano l'obiettivo della campagna." },
          { term: "CR (Conversion Rate)", explanation: "Percentuale di visitatori che completano l'azione desiderata." }
        ],
        choices: [
          {
            id: "a",
            text: `"Il problema è la landing page: 380 click ma 12 conversioni = 3% CR, sotto la media. Propongo A/B test sulla pagina."`,
            isCorrect: true,
            feedback: `Eccellente! Hai identificato dove si perde il traffico e proposto una soluzione per ${t.industry}.`,
          },
          {
            id: "b",
            text: `"45.000 persone raggiunte! Grande awareness per ${t.companyName}."`,
            feedback: "Stai mascherando il fallimento con vanity metrics. Il cliente voleva conversioni, non reach.",
          },
          {
            id: "c",
            text: "Ammetti che non ha funzionato e proponi più budget",
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
            text: "Rispondi pubblicamente con empatia, offri un contatto diretto per risolvere il problema",
            isCorrect: true,
            feedback: `Perfetto! In ${t.industry}, la trasparenza e l'ascolto trasformano critici in sostenitori.`,
          },
          {
            id: "b",
            text: "Nascondi il post per limitare la visibilità",
            feedback: "Censurare peggiora tutto. Nel " + t.industry + ", l'autenticità è fondamentale.",
          },
          {
            id: "c",
            text: "Aspetti che si calmi, rispondere ora potrebbe alimentare la discussione",
            feedback: "Il silenzio viene letto come disinteresse. Ogni ora di attesa peggiora la percezione.",
          },
        ],
        skill: "Crisis Management",
        lesson: `Nel digitale, le crisi social sono opportunità per dimostrare i valori del brand.`,
      },
      {
        id: 3,
        title: "Pianificazione Contenuti",
        context: `Il team di ${t.companyName} ti chiede un piano editoriale per il prossimo mese nel settore ${t.industry}. Hai budget per 12 post e 2 video.`,
        challenge: "Come distribuisci i contenuti?",
        choices: [
          {
            id: "a",
            text: "40% educational sul settore, 30% behind-the-scenes, 20% prodotto, 10% user-generated",
            isCorrect: true,
            feedback: `Eccellente mix! In ${t.industry}, educare crea autorevolezza, il BTS umanizza, il prodotto converte, UGC crea community.`,
          },
          {
            id: "b",
            text: "80% contenuti prodotto per massimizzare le conversioni",
            feedback: `Troppo push. Nel ${t.industry}, chi parla solo di sé stanca il pubblico.`,
          },
          {
            id: "c",
            text: "100% trend e meme per massimizzare l'engagement",
            feedback: "L'engagement fine a sé stesso non porta risultati. Servono contenuti che costruiscono relazione.",
          },
        ],
        skill: "Content Strategy",
        lesson: `In questi ruoli, il mix di contenuti bilancia brand building e performance.`,
      },
      {
        id: 4,
        title: "Budget Allocation",
        context: `Il CEO di ${t.companyName} ti dà €3.000 extra per il Q4. Devi decidere come allocarli per massimizzare l'impatto nel ${t.industry}.`,
        challenge: "Come li distribuisci?",
        choices: [
          {
            id: "a",
            text: "€1.500 su retargeting chi ha già interagito, €1.000 su lookalike, €500 su test nuove audience",
            isCorrect: true,
            feedback: `Strategia smart! Il retargeting ha il ROI più alto, i lookalike scalano, i test preparano il futuro.`,
          },
          {
            id: "b",
            text: "Tutto su awareness per raggiungere più persone possibili",
            feedback: `L'awareness senza conversion strategy è vanity. In ${t.industry}, serve un funnel completo.`,
          },
          {
            id: "c",
            text: "Tutto su influencer marketing per un boost veloce",
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
        context: `Sono le 9:00. Il CEO di ${t.companyName} ti scrive: "Mi servono i numeri delle performance del Q3 per la board di domani." Hai 24 ore.`,
        challenge: "Come affronti la richiesta?",
        choices: [
          {
            id: "a",
            text: "Chiedi quali metriche specifiche servono e qual è la storia che vuole raccontare alla board",
            isCorrect: true,
            feedback: `Perfetto! In ${t.industry}, capire il contesto evita di produrre dati inutili. Il CEO probabilmente non sa esattamente cosa vuole.`,
          },
          {
            id: "b",
            text: "Prepari un report completo con tutte le metriche disponibili",
            feedback: "Troppi dati = nessuna storia. La board ha 10 minuti, non 2 ore.",
          },
          {
            id: "c",
            text: "Estrai i dati grezzi e li mandi così il CEO decide cosa usare",
            feedback: "Il CEO non ha tempo (né competenze) per analizzare dati grezzi. Il tuo valore è tradurli.",
          },
        ],
        skill: "Stakeholder Communication",
        lesson: `In questo lavoro, l'analista bravo non risponde a domande: aiuta a fare quelle giuste.`,
      },
      {
        id: 2,
        title: "Data Quality Issue",
        context: `Stai analizzando i dati utente di ${t.productContext}. Noti che il 15% dei record ha valori mancanti nel campo cruciale "engagement_score".`,
        challenge: "Come gestisci i missing values?",
        choices: [
          {
            id: "a",
            text: "Analizzi il pattern dei missing: sono random o sistematici? Poi decidi se imputare, escludere o segnalare",
            isCorrect: true,
            feedback: `Eccellente! In ${t.industry}, i missing values raccontano una storia. Capire PERCHÉ mancano è fondamentale.`,
          },
          {
            id: "b",
            text: "Li sostituisci con la media per non perdere dati",
            feedback: "La media può introdurre bias. Se i missing sono sistematici (es. utenti che non completano), la media è sbagliata.",
          },
          {
            id: "c",
            text: "Li escludi tutti dall'analisi per avere dati puliti",
            feedback: `Escludere il 15% può introdurre selection bias. In ${t.industry}, perderesti insight importanti.`,
          },
        ],
        skill: "Data Quality",
        lesson: `In questi ruoli, la data quality è il fondamento. Garbage in, garbage out.`,
      },
      {
        id: 3,
        title: "Insight Controintuitivo",
        context: `La tua analisi per ${t.companyName} mostra che gli utenti che usano meno l'app hanno retention più alta. Sembra controintuitivo.`,
        challenge: "Come procedi?",
        choices: [
          {
            id: "a",
            text: "Indaghi il segmento: forse sono utenti premium che ottengono valore in meno tempo",
            isCorrect: true,
            feedback: `Ottimo! In ${t.industry}, i dati controintuitivi spesso nascondono gli insight più preziosi.`,
          },
          {
            id: "b",
            text: "Ignori l'anomalia, probabilmente è un errore nei dati",
            feedback: "Ignorare anomalie è un errore. Spesso le scoperte più importanti sembrano 'strane' all'inizio.",
          },
          {
            id: "c",
            text: "Presenti il dato così com'è, sarà il business a interpretarlo",
            feedback: "Presentare senza interpretare non aggiunge valore. Il tuo lavoro è spiegare, non solo mostrare.",
          },
        ],
        skill: "Critical Thinking",
        lesson: `Nel digitale, i dati controintuitivi meritano più attenzione, non meno.`,
      },
      {
        id: 4,
        title: "Presentazione ai Non-Tecnici",
        context: `Devi presentare i risultati della tua analisi al team marketing di ${t.companyName}. Hai trovato 3 cluster di utenti con comportamenti diversi.`,
        challenge: "Come presenti i risultati?",
        choices: [
          {
            id: "a",
            text: "Dai un nome descrittivo a ogni cluster, mostri 1-2 insight azionabili per ciascuno, zero formule",
            isCorrect: true,
            feedback: `Perfetto! 'Gli Esploratori', 'I Fedeli', 'I Dormienti' sono più memorabili di 'Cluster 1, 2, 3'.`,
          },
          {
            id: "b",
            text: "Spieghi la metodologia k-means e mostri il grafico dell'elbow method",
            feedback: "Al marketing non interessa come hai fatto, ma cosa significa per loro.",
          },
          {
            id: "c",
            text: "Mandi un report scritto dettagliato via email, è più efficiente",
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
        context: `Sono le 9:00. Entri alla prima riunione del nuovo progetto per ${t.companyName}: sviluppare ${t.productContext}. Ci sono designer, developer e stakeholder.`,
        challenge: "Qual è la prima cosa da chiarire?",
        choices: [
          {
            id: "a",
            text: "Obiettivi concreti e metriche di successo: cosa significa 'fatto bene'?",
            isCorrect: true,
            feedback: `Perfetto! Senza obiettivi chiari, ogni progetto in ${t.industry} rischia di andare alla deriva.`,
          },
          {
            id: "b",
            text: "Subito il piano con timeline e milestone",
            feedback: "Il piano viene dopo gli obiettivi. Come pianifichi se non sai dove vuoi arrivare?",
          },
          {
            id: "c",
            text: "Chiedi a ognuno di presentare la propria visione del progetto",
            feedback: "Utile per capire le aspettative, ma rischi 10 visioni diverse senza una direzione.",
          },
        ],
        skill: "Project Initiation",
        lesson: `Nel digitale, i progetti falliscono più per obiettivi vaghi che per esecuzione scarsa.`,
      },
      {
        id: 2,
        title: "Conflitto tra Team",
        context: `Il designer e il developer di ${t.companyName} non sono d'accordo su una feature. Il designer vuole un'animazione complessa, il developer dice che rallenterà l'app.`,
        challenge: "Come gestisci la situazione?",
        choices: [
          {
            id: "a",
            text: "Faciliti una discussione: 'Qual è l'obiettivo dell'animazione? C'è un compromesso che mantiene il valore?'",
            isCorrect: true,
            feedback: `Ottimo! In ${t.industry}, il coordinatore non decide ma facilita. L'obiettivo comune sblocca i conflitti.`,
          },
          {
            id: "b",
            text: "Dai ragione al developer perché la performance è più importante",
            feedback: "Prendere parte crea risentimento. Non sei un giudice, sei un facilitatore.",
          },
          {
            id: "c",
            text: "Escali al manager perché decida lui",
            feedback: "Escalare subito ti fa sembrare incapace di gestire conflitti. Prima prova a risolverlo.",
          },
        ],
        skill: "Conflict Resolution",
        lesson: `In questi ruoli, i conflitti spesso nascono da obiettivi diversi. Trovare l'obiettivo comune li risolve.`,
      },
      {
        id: 3,
        title: "Deadline a Rischio",
        context: `Mancano 5 giorni alla demo di ${t.productContext} per un cliente importante. Il team è indietro del 30% sul piano.`,
        challenge: "Come affronti la situazione?",
        choices: [
          {
            id: "a",
            text: "Riunione di prioritizzazione: cosa è MUST HAVE per la demo vs nice to have? Tagliamo lo scope",
            isCorrect: true,
            feedback: `Perfetto! In ${t.industry}, meglio consegnare meno ma funzionante che tutto ma rotto.`,
          },
          {
            id: "b",
            text: "Chiedi al team di fare straordinari per recuperare",
            feedback: "Gli straordinari creano burnout e errori. Nel lungo periodo, peggiori le cose.",
          },
          {
            id: "c",
            text: "Informi il cliente che la demo slitterà di una settimana",
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
            text: "1-to-1 privato: 'Ho notato X e Y. C'è qualcosa che ti sta bloccando? Come posso aiutarti?'",
            isCorrect: true,
            feedback: `Perfetto! Partire con curiosità, non giudizio. Spesso ci sono motivi non visibili.`,
          },
          {
            id: "b",
            text: "Fai notare il problema nel daily standup così tutti sono allineati",
            feedback: "Il feedback negativo in pubblico umilia e crea risentimento. Sempre in privato.",
          },
          {
            id: "c",
            text: "Aspetti ancora, magari è un periodo difficile e si riprende",
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

import { copy, getStandCopy } from "../data/translations";
import { getProductDesc } from "../data/productI18n";
import type { Stand, Language, TranslationCopy } from "../types";

function realRef(name: string): string {
  return name.match(/Ref\.(\d+)/)?.[1] ?? name;
}

function cleanName(name: string): string {
  return name.replace(/\s*·\s*Ref\.\d+$/, "");
}

const COLOR_MAP: Record<string, Partial<Record<Language, string>>> = {
  // ── Solid colours ────────────────────────────────────────────────────────
  "Blanco":       { en: "White",       fr: "Blanc",       it: "Bianco",      pt: "Branco",      de: "Weiß",        nl: "Wit",          pl: "Biały",         ro: "Alb" },
  "Negro":        { en: "Black",       fr: "Noir",        it: "Nero",        pt: "Preto",       de: "Schwarz",     nl: "Zwart",        pl: "Czarny",        ro: "Negru" },
  "Verde":        { en: "Green",       fr: "Vert",        it: "Verde",       pt: "Verde",       de: "Grün",        nl: "Groen",        pl: "Zielony",       ro: "Verde" },
  "Rojo":         { en: "Red",         fr: "Rouge",       it: "Rosso",       pt: "Vermelho",    de: "Rot",         nl: "Rood",         pl: "Czerwony",      ro: "Roșu" },
  "Azul":         { en: "Blue",        fr: "Bleu",        it: "Blu",         pt: "Azul",        de: "Blau",        nl: "Blauw",        pl: "Niebieski",     ro: "Albastru" },
  "Naranja":      { en: "Orange",      fr: "Orange",      it: "Arancione",   pt: "Laranja",     de: "Orange",      nl: "Oranje",       pl: "Pomarańczowy",  ro: "Portocaliu" },
  "Amarillo":     { en: "Yellow",      fr: "Jaune",       it: "Giallo",      pt: "Amarelo",     de: "Gelb",        nl: "Geel",         pl: "Żółty",         ro: "Galben" },
  "Rosa":         { en: "Pink",        fr: "Rose",        it: "Rosa",        pt: "Rosa",        de: "Rosa",        nl: "Roze",         pl: "Różowy",        ro: "Roz" },
  "Gris":         { en: "Grey",        fr: "Gris",        it: "Grigio",      pt: "Cinzento",    de: "Grau",        nl: "Grijs",        pl: "Szary",         ro: "Gri" },
  "Marrón":       { en: "Brown",       fr: "Marron",      it: "Marrone",     pt: "Castanho",    de: "Braun",       nl: "Bruin",        pl: "Brązowy",       ro: "Maro" },
  "Beige":        { en: "Beige",       fr: "Beige",       it: "Beige",       pt: "Bege",        de: "Beige",       nl: "Beige",        pl: "Beżowy",        ro: "Bej" },
  "Transparente": { en: "Transparent", fr: "Transparent", it: "Trasparente", pt: "Transparente",de: "Transparent", nl: "Transparant",  pl: "Przezroczysty", ro: "Transparent" },
  // ── Assorted / multiple ──────────────────────────────────────────────────
  "Varios colores surtidos": { en: "Various assorted colours", fr: "Plusieurs couleurs assorties", it: "Vari colori assortiti",  pt: "Várias cores sortidas",   de: "Verschiedene Farben sortiert", nl: "Diverse gemengde kleuren", pl: "Różne kolory mieszane", ro: "Culori asortate" },
  "Varios colores":          { en: "Various colours",          fr: "Plusieurs couleurs",            it: "Vari colori",            pt: "Várias cores",            de: "Verschiedene Farben",          nl: "Diverse kleuren",          pl: "Różne kolory",          ro: "Culori diverse" },
  "Varios aromas surtidos":  { en: "Various assorted scents",  fr: "Plusieurs arômes assortis",     it: "Vari aromi assortiti",   pt: "Vários aromas sortidos",  de: "Verschiedene Düfte",           nl: "Diverse geuren",           pl: "Różne zapachy",         ro: "Arome asortate" },
  "Varios modelos surtidos": { en: "Various assorted models",  fr: "Plusieurs modèles assortis",    it: "Vari modelli assortiti", pt: "Vários modelos sortidos", de: "Verschiedene Modelle",         nl: "Diverse modellen",         pl: "Różne modele",          ro: "Modele asortate" },
  "Varios tamaños":          { en: "Various sizes",            fr: "Plusieurs tailles",             it: "Varie misure",           pt: "Vários tamanhos",         de: "Verschiedene Größen",          nl: "Diverse maten",            pl: "Różne rozmiary",        ro: "Dimensiuni variate" },
  "Surtido":                 { en: "Assorted",                 fr: "Assorti",                       it: "Assortito",              pt: "Sortido",                 de: "Sortiert",                     nl: "Gesorteerd",               pl: "Asortyment",            ro: "Asortate" },
  "Surtido brillante":       { en: "Shiny assorted",           fr: "Assorti brillant",              it: "Assortito brillante",    pt: "Sortido brilhante",       de: "Sortiert glänzend",            nl: "Glanzend gesorteerd",      pl: "Błyszczący asortyment", ro: "Asortate lucioase" },
  "Surtido navideño":        { en: "Christmas assorted",       fr: "Assorti de Noël",               it: "Assortito natalizio",    pt: "Sortido natalino",        de: "Weihnachtssortiment",          nl: "Kerst gesorteerd",         pl: "Asortyment świąteczny", ro: "Asortate de Crăciun" },
  "Figuras surtidas":        { en: "Assorted figures",         fr: "Figurines assorties",           it: "Figure assortite",       pt: "Figuras sortidas",        de: "Sortierte Figuren",            nl: "Gesorteerde figuren",      pl: "Różne figurki",         ro: "Figuri asortate" },
  // ── Colour combinations ──────────────────────────────────────────────────
  "Azul / Blanco":           { en: "Blue / White",       fr: "Bleu / Blanc",       it: "Blu / Bianco",       pt: "Azul / Branco",      de: "Blau / Weiß",        nl: "Blauw / Wit",         pl: "Niebieski / Biały",   ro: "Albastru / Alb" },
  "Azul / Negro":            { en: "Blue / Black",       fr: "Bleu / Noir",        it: "Blu / Nero",         pt: "Azul / Preto",       de: "Blau / Schwarz",     nl: "Blauw / Zwart",       pl: "Niebieski / Czarny",  ro: "Albastru / Negru" },
  "Azul y negro":            { en: "Blue and black",     fr: "Bleu et noir",       it: "Blu e nero",         pt: "Azul e preto",       de: "Blau und schwarz",   nl: "Blauw en zwart",      pl: "Niebieski i czarny",  ro: "Albastru și negru" },
  "Azul, verde y madera":    { en: "Blue, green and wood",fr: "Bleu, vert et bois",it: "Blu, verde e legno", pt: "Azul, verde e madeira",de: "Blau, grün und Holz",nl: "Blauw, groen en hout",pl: "Niebieski, zielony i drewno",ro: "Albastru, verde și lemn" },
  "Amarillo y rojo":         { en: "Yellow and red",     fr: "Jaune et rouge",     it: "Giallo e rosso",     pt: "Amarelo e vermelho", de: "Gelb und rot",       nl: "Geel en rood",        pl: "Żółty i czerwony",    ro: "Galben și roșu" },
  "Blanco con flores moradas":{ en: "White with purple flowers",fr: "Blanc avec fleurs violettes",it: "Bianco con fiori viola",pt: "Branco com flores roxas",de: "Weiß mit lila Blumen",nl: "Wit met paarse bloemen",pl: "Biały z fioletowymi kwiatami",ro: "Alb cu flori violet" },
  "Blanco y rojo":           { en: "White and red",      fr: "Blanc et rouge",     it: "Bianco e rosso",     pt: "Branco e vermelho",  de: "Weiß und rot",       nl: "Wit en rood",         pl: "Biały i czerwony",    ro: "Alb și roșu" },
  "Blanco y verde":          { en: "White and green",    fr: "Blanc et vert",      it: "Bianco e verde",     pt: "Branco e verde",     de: "Weiß und grün",      nl: "Wit en groen",        pl: "Biały i zielony",     ro: "Alb și verde" },
  "Gris / Plata":            { en: "Grey / Silver",      fr: "Gris / Argent",      it: "Grigio / Argento",   pt: "Cinzento / Prata",   de: "Grau / Silber",      nl: "Grijs / Zilver",      pl: "Szary / Srebrny",     ro: "Gri / Argintiu" },
  "Mango negro":             { en: "Black handle",       fr: "Manche noir",        it: "Manico nero",        pt: "Cabo preto",         de: "Schwarzer Griff",    nl: "Zwart handvat",       pl: "Czarna rączka",       ro: "Mâner negru" },
  "Mango negro y azul":      { en: "Black and blue handle",fr:"Manche noir et bleu",it: "Manico nero e blu",  pt: "Cabo preto e azul",  de: "Schwarz-blauer Griff",nl: "Zwart-blauw handvat", pl: "Czarno-niebieski uchwyt",ro: "Mâner negru și albastru" },
  "Mango negro y rojo":      { en: "Black and red handle",fr: "Manche noir et rouge",it:"Manico nero e rosso",pt: "Cabo preto e vermelho",de: "Schwarz-roter Griff",nl: "Zwart-rood handvat",  pl: "Czarno-czerwony uchwyt",ro: "Mâner negru și roșu" },
  "Madera / Rojo / Negro":   { en: "Wood / Red / Black", fr: "Bois / Rouge / Noir",it: "Legno / Rosso / Nero",pt: "Madeira / Vermelho / Preto",de: "Holz / Rot / Schwarz",nl: "Hout / Rood / Zwart",pl: "Drewno / Czerwony / Czarny",ro: "Lemn / Roșu / Negru" },
  "Madera / Rosa y fucsia":  { en: "Wood / Pink and fuchsia",fr:"Bois / Rose et fuchsia",it:"Legno / Rosa e fucsia",pt:"Madeira / Rosa e fúcsia",de:"Holz / Rosa und Fuchsia",nl:"Hout / Roze en fuchsia",pl:"Drewno / Różowy i fuksja",ro:"Lemn / Roz și fucsia" },
  "Naranja y amarillo":      { en: "Orange and yellow",  fr: "Orange et jaune",    it: "Arancione e giallo", pt: "Laranja e amarelo",  de: "Orange und gelb",    nl: "Oranje en geel",      pl: "Pomarańczowy i żółty",ro: "Portocaliu și galben" },
  "Naranja y negro":         { en: "Orange and black",   fr: "Orange et noir",     it: "Arancione e nero",   pt: "Laranja e preto",    de: "Orange und schwarz", nl: "Oranje en zwart",     pl: "Pomarańczowy i czarny",ro: "Portocaliu și negru" },
  "Naranja y verde":         { en: "Orange and green",   fr: "Orange et vert",     it: "Arancione e verde",  pt: "Laranja e verde",    de: "Orange und grün",    nl: "Oranje en groen",     pl: "Pomarańczowy i zielony",ro: "Portocaliu și verde" },
  "Negro (malla semitransparente)":{ en: "Black (semi-transparent mesh)",fr:"Noir (maille semi-transparente)",it:"Nero (rete semitrasparente)",pt:"Preto (malha semitransparente)",de:"Schwarz (halbdurchsichtiges Netz)",nl:"Zwart (halftransparant net)",pl:"Czarny (półprzezroczysta siatka)",ro:"Negru (plasă semitransparentă)" },
  "Negro con logo blanco":   { en: "Black with white logo",fr:"Noir avec logo blanc",it:"Nero con logo bianco",pt:"Preto com logótipo branco",de:"Schwarz mit weißem Logo",nl:"Zwart met wit logo",pl:"Czarny z białym logo",ro:"Negru cu logo alb" },
  "Negro y rojo":            { en: "Black and red",      fr: "Noir et rouge",      it: "Nero e rosso",       pt: "Preto e vermelho",   de: "Schwarz und rot",    nl: "Zwart en rood",       pl: "Czarny i czerwony",   ro: "Negru și roșu" },
  "Negro y transparente":    { en: "Black and transparent",fr:"Noir et transparent",it:"Nero e trasparente",  pt:"Preto e transparente",de:"Schwarz und transparent",nl:"Zwart en transparant",pl:"Czarny i przezroczysty",ro:"Negru și transparent" },
  "Negro y verde":           { en: "Black and green",    fr: "Noir et vert",       it: "Nero e verde",       pt: "Preto e verde",      de: "Schwarz und grün",   nl: "Zwart en groen",      pl: "Czarny i zielony",    ro: "Negru și verde" },
  "Negro, mango madera":     { en: "Black, wood handle", fr: "Noir, manche bois",  it: "Nero, manico legno", pt: "Preto, cabo madeira", de: "Schwarz, Holzgriff", nl: "Zwart, houten handvat",pl:"Czarny, drewniana rączka",ro:"Negru, mâner lemn" },
  "Negro/Plata":             { en: "Black/Silver",       fr: "Noir/Argent",        it: "Nero/Argento",       pt: "Preto/Prata",        de: "Schwarz/Silber",     nl: "Zwart/Zilver",        pl: "Czarny/Srebrny",      ro: "Negru/Argintiu" },
  "Rojo con pompón blanco":  { en: "Red with white pompom",fr:"Rouge avec pompon blanc",it:"Rosso con pompon bianco",pt:"Vermelho com pompom branco",de:"Rot mit weißem Pompon",nl:"Rood met witte pompon",pl:"Czerwony z białym pomponem",ro:"Roșu cu pompon alb" },
  "Rojo y blanco":           { en: "Red and white",      fr: "Rouge et blanc",     it: "Rosso e bianco",     pt: "Vermelho e branco",  de: "Rot und weiß",       nl: "Rood en wit",         pl: "Czerwony i biały",    ro: "Roșu și alb" },
  "Rojo y negro":            { en: "Red and black",      fr: "Rouge et noir",      it: "Rosso e nero",       pt: "Vermelho e preto",   de: "Rot und schwarz",    nl: "Rood en zwart",       pl: "Czerwony i czarny",   ro: "Roșu și negru" },
  "Rojo, Verde, Azul surtidos":{ en: "Red, Green, Blue assorted",fr:"Rouge, Vert, Bleu assortis",it:"Rosso, Verde, Blu assortiti",pt:"Vermelho, Verde, Azul sortidos",de:"Rot, Grün, Blau sortiert",nl:"Rood, Groen, Blauw gesorteerd",pl:"Czerwony, Zielony, Niebieski",ro:"Roșu, Verde, Albastru asortate" },
  "Rojo, verde y blanco":    { en: "Red, green and white",fr:"Rouge, vert et blanc",it:"Rosso, verde e bianco",pt:"Vermelho, verde e branco",de:"Rot, grün und weiß",nl:"Rood, groen en wit",pl:"Czerwony, zielony i biały",ro:"Roșu, verde și alb" },
  "Rojo/Dorado/Plata":       { en: "Red/Gold/Silver",    fr: "Rouge/Or/Argent",    it: "Rosso/Oro/Argento",  pt: "Vermelho/Dourado/Prata",de:"Rot/Gold/Silber",    nl: "Rood/Goud/Zilver",    pl: "Czerwony/Złoty/Srebrny",ro:"Roșu/Auriu/Argintiu" },
  "Transparente con detalle plateado":{ en: "Transparent with silver detail",fr:"Transparent avec détail argenté",it:"Trasparente con dettaglio argentato",pt:"Transparente com detalhe prateado",de:"Transparent mit silbernem Detail",nl:"Transparant met zilveren detail",pl:"Przezroczysty ze srebrnym detalem",ro:"Transparent cu detaliu argintiu" },
  "Verde y acero":           { en: "Green and steel",    fr: "Vert et acier",      it: "Verde e acciaio",    pt: "Verde e aço",        de: "Grün und Stahl",     nl: "Groen en staal",      pl: "Zielony i stal",      ro: "Verde și oțel" },
  "Verde y madera":          { en: "Green and wood",     fr: "Vert et bois",       it: "Verde e legno",      pt: "Verde e madeira",    de: "Grün und Holz",      nl: "Groen en hout",       pl: "Zielony i drewno",    ro: "Verde și lemn" },
  "Verde y negro":           { en: "Green and black",    fr: "Vert et noir",       it: "Verde e nero",       pt: "Verde e preto",      de: "Grün und schwarz",   nl: "Groen en zwart",      pl: "Zielony i czarny",    ro: "Verde și negru" },
  "Verde/Nevado":            { en: "Green/Snow-dusted",  fr: "Vert/Enneigé",       it: "Verde/Innevato",     pt: "Verde/Nevado",       de: "Grün/Verschneit",    nl: "Groen/Besneeuwd",     pl: "Zielony/Ośnieżony",   ro: "Verde/Înzăpezit" },
  "Luces de colores/cálidas":{ en: "Coloured/warm lights",fr:"Lumières colorées/chaudes",it:"Luci colorate/calde",pt:"Luzes coloridas/quentes",de:"Bunte/warme Lichter",nl:"Gekleurde/warme lichten",pl:"Kolorowe/ciepłe światło",ro:"Lumini colorate/calde" },
  "Luz cálida":              { en: "Warm light",         fr: "Lumière chaude",     it: "Luce calda",         pt: "Luz quente",         de: "Warmweißes Licht",   nl: "Warm licht",          pl: "Ciepłe światło",      ro: "Lumină caldă" },
  // ── Materials ────────────────────────────────────────────────────────────
  "Acero inoxidable":        { en: "Stainless steel",    fr: "Acier inoxydable",   it: "Acciaio inossidabile",pt:"Aço inoxidável",      de: "Edelstahl",          nl: "Roestvrij staal",     pl: "Stal nierdzewna",     ro: "Oțel inoxidabil" },
  "Acero y madera":          { en: "Steel and wood",     fr: "Acier et bois",      it: "Acciaio e legno",    pt: "Aço e madeira",      de: "Stahl und Holz",     nl: "Staal en hout",       pl: "Stal i drewno",       ro: "Oțel și lemn" },
  "Cristal transparente":    { en: "Clear glass",        fr: "Verre transparent",  it: "Vetro trasparente",  pt: "Vidro transparente", de: "Klarglas",           nl: "Helder glas",         pl: "Przezroczyste szkło", ro: "Sticlă transparentă" },
  "Madera natural":          { en: "Natural wood",       fr: "Bois naturel",       it: "Legno naturale",     pt: "Madeira natural",    de: "Naturholz",          nl: "Natuurlijk hout",     pl: "Drewno naturalne",    ro: "Lemn natural" },
  "Madera natural/pintada":  { en: "Natural/painted wood",fr:"Bois naturel/peint",  it:"Legno naturale/dipinto",pt:"Madeira natural/pintada",de:"Natur-/Bemaltes Holz",nl:"Natuurlijk/geschilderd hout",pl:"Drewno naturalne/malowane",ro:"Lemn natural/vopsit" },
  "Madera y metal":          { en: "Wood and metal",     fr: "Bois et métal",      it: "Legno e metallo",    pt: "Madeira e metal",    de: "Holz und Metall",    nl: "Hout en metaal",      pl: "Drewno i metal",      ro: "Lemn și metal" },
  "Madera/Tela":             { en: "Wood/Fabric",        fr: "Bois/Tissu",         it: "Legno/Tessuto",      pt: "Madeira/Tecido",     de: "Holz/Stoff",         nl: "Hout/Stof",           pl: "Drewno/Tkanina",      ro: "Lemn/Țesătură" },
  "Metalizado plata":        { en: "Silver metallic",    fr: "Métallisé argent",   it: "Metallizzato argento",pt:"Metalizado prata",    de: "Silbermetallic",     nl: "Zilver metallic",     pl: "Srebrzysty metaliczny",ro:"Metalizat argintiu" },
  "Metálico y colores":      { en: "Metallic and colours",fr:"Métallique et couleurs",it:"Metallico e colori", pt:"Metálico e cores",   de: "Metallic und Farben",nl: "Metallic en kleuren", pl: "Metaliczny i kolory", ro: "Metalic și culori" },
  "Metálico":                { en: "Metallic",           fr: "Métallique",         it: "Metallico",          pt: "Metálico",           de: "Metallic",           nl: "Metallic",            pl: "Metaliczny",          ro: "Metalic" },
  // ── Christmas / festive ──────────────────────────────────────────────────
  "Motivos navideños":       { en: "Christmas motifs",   fr: "Motifs de Noël",     it: "Motivi natalizi",    pt: "Motivos natalinos",  de: "Weihnachtsmotive",   nl: "Kerstmotieven",       pl: "Motywy świąteczne",   ro: "Motive de Crăciun" },
  "Diseño navideño":         { en: "Christmas design",   fr: "Design de Noël",     it: "Design natalizio",   pt: "Design natalino",    de: "Weihnachtsdesign",   nl: "Kerstdesign",         pl: "Design świąteczny",   ro: "Design de Crăciun" },
  "Estampado navideño":      { en: "Christmas print",    fr: "Imprimé de Noël",    it: "Stampa natalizia",   pt: "Estampado natalino", de: "Weihnachtsdruck",    nl: "Kerstprint",          pl: "Nadruk świąteczny",   ro: "Print de Crăciun" },
  "Colores festivos":        { en: "Festive colours",    fr: "Couleurs festives",   it: "Colori festivi",     pt: "Cores festivas",     de: "Festliche Farben",   nl: "Feestelijke kleuren", pl: "Świąteczne kolory",   ro: "Culori festive" },
  "Estampado festivo":       { en: "Festive print",      fr: "Imprimé festif",      it: "Stampa festiva",     pt: "Estampado festivo",  de: "Festlicher Druck",   nl: "Feestprint",          pl: "Nadruk świąteczny",   ro: "Print festiv" },
  "Cartel festivo":          { en: "Festive sign",       fr: "Affiche festive",     it: "Cartello festivo",   pt: "Cartaz festivo",     de: "Festliches Schild",  nl: "Feestelijk bord",     pl: "Świąteczny plakat",   ro: "Panou festiv" },
  "Papá Noel/Reno":          { en: "Santa/Reindeer",     fr: "Père Noël/Renne",     it: "Babbo Natale/Renna", pt: "Pai Natal/Rena",     de: "Weihnachtsmann/Rentier",nl:"Kerstman/Rendier",   pl: "Mikołaj/Renifer",     ro: "Moș Crăciun/Ren" },
  "Reno/Papá Noel":          { en: "Reindeer/Santa",     fr: "Renne/Père Noël",     it: "Renna/Babbo Natale", pt: "Rena/Pai Natal",     de: "Rentier/Weihnachtsmann",nl:"Rendier/Kerstman",   pl: "Renifer/Mikołaj",     ro: "Ren/Moș Crăciun" },
  "Personajes navideños":    { en: "Christmas characters",fr:"Personnages de Noël",  it:"Personaggi natalizi", pt:"Personagens natalinos",de:"Weihnachtsfiguren",   nl: "Kerstfiguren",        pl: "Postacie świąteczne", ro: "Personaje de Crăciun" },
  "Estrella dorada":         { en: "Golden star",        fr: "Étoile dorée",        it: "Stella dorata",      pt: "Estrela dourada",    de: "Goldener Stern",     nl: "Gouden ster",         pl: "Złota gwiazda",       ro: "Stea aurie" },
  // ── Designs & prints ─────────────────────────────────────────────────────
  "Diseño Búho":             { en: "Owl design",         fr: "Design hibou",        it: "Design gufo",        pt: "Design coruja",      de: "Eulen-Design",       nl: "Uil design",          pl: "Design z sową",       ro: "Design bufniță" },
  "Diseño bordado":          { en: "Embroidered design", fr: "Design brodé",        it: "Design ricamato",    pt: "Design bordado",     de: "Besticktes Design",  nl: "Geborduurd design",   pl: "Haftowany design",    ro: "Design brodat" },
  "Diseño cerveza":          { en: "Beer design",        fr: "Design bière",        it: "Design birra",       pt: "Design cerveja",     de: "Bier-Design",        nl: "Bier design",         pl: "Design piwny",        ro: "Design bere" },
  "Diseño clásico":          { en: "Classic design",     fr: "Design classique",    it: "Design classico",    pt: "Design clássico",    de: "Klassisches Design", nl: "Klassiek design",     pl: "Klasyczny design",    ro: "Design clasic" },
  "Diseño granos de café":   { en: "Coffee bean design", fr: "Design grains de café",it:"Design chicchi di caffè",pt:"Design grãos de café",de:"Kaffeebohnen-Design",nl:"Koffieboon design",  pl:"Design ziaren kawy",   ro:"Design boabe de cafea" },
  "Diseño refresco con hielo":{ en: "Ice drink design",  fr: "Design boisson glacée",it:"Design bibita ghiacciata",pt:"Design bebida com gelo",de:"Eisgetränk-Design",nl:"IJsdrank design",    pl:"Design zimnego napoju", ro:"Design băutură cu gheață" },
  "Estampado frutas / Kraft interior":{ en: "Fruit print / Kraft interior",fr:"Imprimé fruits / Intérieur kraft",it:"Stampa frutti / Interno kraft",pt:"Estampado frutas / Interior kraft",de:"Fruchtdruck / Kraft-Innenseite",nl:"Fruitprint / Kraft interieur",pl:"Nadruk owoce / Wnętrze kraft",ro:"Print fructe / Interior kraft" },
  "Estampado frutas y hielo":{ en: "Fruit and ice print",fr: "Imprimé fruits et glace",it:"Stampa frutti e ghiaccio",pt:"Estampado frutas e gelo",de:"Frucht- und Eisdruck",nl:"Fruit- en ijsprint",pl:"Nadruk owoce i lód",ro:"Print fructe și gheață" },
  "Estampado girasoles":     { en: "Sunflower print",    fr: "Imprimé tournesols",  it: "Stampa girasoli",    pt: "Estampado girassóis",de: "Sonnenblumendruck",  nl: "Zonnebloemenprint",   pl: "Nadruk słoneczniki",  ro: "Print floarea-soarelui" },
  "Solo color":              { en: "Solid colour",       fr: "Couleur unie",        it: "Colore unico",       pt: "Cor sólida",         de: "Einfarbig",          nl: "Effen kleur",         pl: "Jednolity kolor",     ro: "Culoare solidă" },
  // ── Numeric ──────────────────────────────────────────────────────────────
  "12 colores":              { en: "12 colours",         fr: "12 couleurs",         it: "12 colori",          pt: "12 cores",           de: "12 Farben",          nl: "12 kleuren",          pl: "12 kolorów",          ro: "12 culori" },
  "3 colores":               { en: "3 colours",          fr: "3 couleurs",          it: "3 colori",           pt: "3 cores",            de: "3 Farben",           nl: "3 kleuren",           pl: "3 kolory",            ro: "3 culori" },
  // ── Hardware / packaging ─────────────────────────────────────────────────
  "Bola luminosa":           { en: "Light bulb",         fr: "Boule lumineuse",     it: "Sfera luminosa",     pt: "Bola luminosa",      de: "Leuchtball",         nl: "Lichtbal",            pl: "Świetlna kula",       ro: "Bilă luminoasă" },
  "Brocha negra":            { en: "Black brush",        fr: "Brosse noire",        it: "Pennello nero",      pt: "Pincel preto",       de: "Schwarzer Pinsel",   nl: "Zwart penseel",       pl: "Czarny pędzel",       ro: "Pensulă neagră" },
  "Cabezal negro":           { en: "Black head",         fr: "Tête noire",          it: "Testina nera",       pt: "Cabeça preta",       de: "Schwarzer Kopf",     nl: "Zwarte kop",          pl: "Czarna głowica",      ro: "Cap negru" },
  "Caja verde y amarilla":   { en: "Green and yellow box",fr:"Boîte verte et jaune",it:"Scatola verde e gialla",pt:"Caixa verde e amarela",de:"Grün-gelbe Box",   nl:"Groen-gele doos",      pl:"Zielono-żółte pudełko",ro:"Cutie verde și galbenă" },
  "Cera amarilla / Aluminio":{ en: "Yellow wax / Aluminium",fr:"Cire jaune / Aluminium",it:"Cera gialla / Alluminio",pt:"Cera amarela / Alumínio",de:"Gelbes Wachs / Aluminium",nl:"Gele was / Aluminium",pl:"Żółty wosk / Aluminium",ro:"Ceară galbenă / Aluminiu" },
  "Dispensador rojo, rollos surtidos":{ en: "Red dispenser, assorted rolls",fr:"Distributeur rouge, rouleaux assortis",it:"Dispenser rosso, rotoli assortiti",pt:"Dispensador vermelho, rolos sortidos",de:"Roter Spender, sortierte Rollen",nl:"Rode dispenser, gesorteerde rollen",pl:"Czerwony dozownik, różne rolki",ro:"Dozator roșu, role asortate" },
  "Envase azul":             { en: "Blue container",     fr: "Récipient bleu",      it: "Contenitore blu",    pt: "Embalagem azul",     de: "Blauer Behälter",    nl: "Blauwe verpakking",   pl: "Niebieskie opakowanie",ro:"Recipient albastru" },
  "Envase transparente":     { en: "Transparent container",fr:"Récipient transparent",it:"Contenitore trasparente",pt:"Embalagem transparente",de:"Transparenter Behälter",nl:"Transparante verpakking",pl:"Przezroczyste opakowanie",ro:"Recipient transparent" },
  "Espejo con borde negro":  { en: "Mirror with black border",fr:"Miroir avec bord noir",it:"Specchio con bordo nero",pt:"Espelho com borda preta",de:"Spiegel mit schwarzem Rand",nl:"Spiegel met zwarte rand",pl:"Lustro z czarną ramką",ro:"Oglindă cu ramă neagră" },
  "Frasco blanco":           { en: "White bottle",       fr: "Flacon blanc",        it: "Flacone bianco",     pt: "Frasco branco",      de: "Weiße Flasche",      nl: "Witte fles",          pl: "Biała butelka",       ro: "Sticlă albă" },
  "Maceta terracota / Cera amarilla":{ en: "Terracotta pot / Yellow wax",fr:"Pot terracotta / Cire jaune",it:"Vaso terracotta / Cera gialla",pt:"Vaso terracota / Cera amarela",de:"Terrakotta-Topf / Gelbes Wachs",nl:"Terracotta pot / Gele was",pl:"Doniczka terakota / Żółty wosk",ro:"Ghiveci teracotă / Ceară galbenă" },
  "Puntas negras":           { en: "Black tips",         fr: "Pointes noires",      it: "Punte nere",         pt: "Pontas pretas",      de: "Schwarze Spitzen",   nl: "Zwarte punten",       pl: "Czarne końcówki",     ro: "Vârfuri negre" },
  "Varillas negras":         { en: "Black rods",         fr: "Tiges noires",        it: "Aste nere",          pt: "Varetas pretas",     de: "Schwarze Stäbe",     nl: "Zwarte staven",       pl: "Czarne pręty",        ro: "Tije negre" },
};

function translateColor(color: string | undefined, lang: Language): string {
  if (!color) return "";
  if (lang === "es") return color;
  return COLOR_MAP[color]?.[lang] ?? color;
}

function resolveImgSrc(src: string, origin: string): string {
  return src.startsWith("data:") || src.startsWith("http") ? src : `${origin}${src}`;
}

function buildInfoRows(stand: Stand, t: TranslationCopy): [string, string | number][] {
  const rows: [string, string | number][] = [];
  if (stand.standRef)     rows.push([t.standRef,       stand.standRef]);
  if (stand.tipo)         rows.push([t.standTipo,       stand.tipo]);
  if (stand.numRefs)      rows.push([t.standNumRefs,    stand.numRefs]);
  if (stand.totalUnits)   rows.push([t.standTotalUnits, stand.totalUnits]);
  if (stand.sides)        rows.push([t.standSides,      stand.sides]);
  if (stand.priceStand)   rows.push([t.standPrice,      stand.priceStand]);
  if (stand.pricePerUnit) rows.push([t.standPriceUnit,  stand.pricePerUnit]);
  if (stand.standAlto != null)
    rows.push([t.standDims, `${stand.standAlto} × ${stand.standLargo} × ${stand.standAncho} cm`]);
  return rows;
}

async function fetchBuf(url: string): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(url);
    return res.ok ? res.arrayBuffer() : null;
  } catch { return null; }
}

// Converts an ArrayBuffer to JPEG via canvas using a blob: URL (no crossOrigin CORS issues — works on mobile)
async function imgBufToJpeg(buf: ArrayBuffer, mime: string): Promise<ArrayBuffer | null> {
  return new Promise(resolve => {
    const blobUrl = URL.createObjectURL(new Blob([buf], { type: mime }));
    const img = new Image();
    img.onload = () => {
      try {
        const MAX = 300;
        const nw = img.naturalWidth  || MAX;
        const nh = img.naturalHeight || MAX;
        const scale = Math.min(1, MAX / Math.max(nw, nh));
        const canvas = document.createElement("canvas");
        canvas.width  = Math.round(nw * scale);
        canvas.height = Math.round(nh * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) { URL.revokeObjectURL(blobUrl); resolve(null); return; }
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(blob => {
          URL.revokeObjectURL(blobUrl);
          if (!blob) { resolve(null); return; }
          blob.arrayBuffer().then(resolve).catch(() => resolve(null));
        }, "image/jpeg", 0.85);
      } catch { URL.revokeObjectURL(blobUrl); resolve(null); }
    };
    img.onerror = () => { URL.revokeObjectURL(blobUrl); resolve(null); };
    img.src = blobUrl;
  });
}

// data: URI fallback (keeps crossOrigin=anonymous only for already-embedded data)
async function imgToJpegBuffer(src: string): Promise<ArrayBuffer | null> {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      try {
        const MAX = 300;
        const nw = img.naturalWidth  || MAX;
        const nh = img.naturalHeight || MAX;
        const scale = Math.min(1, MAX / Math.max(nw, nh));
        const canvas = document.createElement("canvas");
        canvas.width  = Math.round(nw * scale);
        canvas.height = Math.round(nh * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) { resolve(null); return; }
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(blob => {
          if (!blob) { resolve(null); return; }
          blob.arrayBuffer().then(resolve).catch(() => resolve(null));
        }, "image/jpeg", 0.85);
      } catch { resolve(null); }
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

// Fetch .jpg/.png directly; for .webp fetch raw bytes and convert via blob: URL (no CORS issues on mobile)
async function getImgForExcel(src: string, origin: string): Promise<{ buf: ArrayBuffer; ext: "jpeg" | "png" } | null> {
  const resolved = resolveImgSrc(src, origin);

  if (resolved.endsWith(".webp")) {
    const jpgBuf = await fetchBuf(resolved.replace(/\.webp$/, ".jpg"));
    if (jpgBuf) return { buf: jpgBuf, ext: "jpeg" };
    // Fetch .webp bytes then convert via blob: URL — avoids crossOrigin CORS block on iOS/Android
    const webpBuf = await fetchBuf(resolved);
    if (webpBuf) {
      const jpegBuf = await imgBufToJpeg(webpBuf, "image/webp");
      if (jpegBuf) return { buf: jpegBuf, ext: "jpeg" };
    }
    return null;
  }

  if (resolved.endsWith(".png")) {
    const buf = await fetchBuf(resolved);
    return buf ? { buf, ext: "png" } : null;
  }

  if (resolved.startsWith("data:")) {
    const canvasBuf = await imgToJpegBuffer(resolved);
    return canvasBuf ? { buf: canvasBuf, ext: "jpeg" } : null;
  }

  const buf = await fetchBuf(resolved);
  return buf ? { buf, ext: "jpeg" } : null;
}

function cell(
  ws: import("exceljs").Worksheet,
  row: number,
  col: number,
  value: import("exceljs").CellValue,
  opts: {
    bg?: string;
    fg?: string;
    bold?: boolean;
    size?: number;
    italic?: boolean;
    hAlign?: import("exceljs").Alignment["horizontal"];
    vAlign?: import("exceljs").Alignment["vertical"];
    indent?: number;
    border?: boolean;
    wrapText?: boolean;
  } = {}
) {
  const c = ws.getCell(row, col);
  c.value = value;
  if (opts.bg) c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: opts.bg } };
  c.font = {
    name: "Arial",
    size: opts.size ?? 9,
    bold: opts.bold ?? false,
    italic: opts.italic ?? false,
    color: { argb: opts.fg ?? "FF202020" },
  };
  c.alignment = {
    vertical: opts.vAlign ?? "middle",
    horizontal: opts.hAlign ?? "left",
    indent: opts.indent ?? 0,
    wrapText: opts.wrapText ?? false,
  };
  if (opts.border !== false) {
    c.border = { bottom: { style: "thin", color: { argb: "FFe2e8f0" } } };
  }
  return c;
}

function buildSheet(
  ws: import("exceljs").Worksheet,
  stand: Stand,
  t: TranslationCopy,
  language: Language,
  standTitle: string,
  standImgId: number | null,
  productImgIds: (number | null)[],
): void {
  const infoRows = buildInfoRows(stand, t);

  const G        = "FF169b22";
  const W        = "FFFFFFFF";
  const Y        = "FFffe100";
  const SLATE    = "FF475569";
  const GR1      = "FFf1f5f9";
  const GR2      = "FFf8fafc";
  const PRICE_BG = "FFe8f5e9";

  ws.columns = [
    { width: 12  },
    { width: 13  },
    { width: 34  },
    { width: 24  },
    { width: 9   },
    { width: 9   },
    { width: 9   },
    { width: 10  },
    { width: 11  },
  ];

  ws.mergeCells("A1:I1");
  cell(ws, 1, 1, standTitle, { bg: G, fg: W, bold: true, size: 16, hAlign: "left", indent: 1, border: false });
  ws.getRow(1).height = 36;

  const INFO_START = 2;

  infoRows.forEach(([label, value], i) => {
    const r = INFO_START + i;
    ws.getRow(r).height = 20;
    cell(ws, r, 1, label,         { bg: GR1, fg: SLATE, bold: true, indent: 1 });
    const isPrice = label === t.standPrice || label === t.standPriceUnit;
    cell(ws, r, 2, String(value), { bg: isPrice ? PRICE_BG : W, fg: isPrice ? G : "FF202020", bold: isPrice, indent: 1 });
    ws.getCell(r, 1).border = { bottom: { style: "thin", color: { argb: "FFe2e8f0" } }, right: { style: "thin", color: { argb: "FFcbd5e1" } } };
  });

  const IMG_ROWS = Math.max(infoRows.length + 1, 15);
  if (standImgId !== null) {
    ws.addImage(standImgId, {
      tl: { col: 3, row: INFO_START - 1 },
      ext: { width: 210, height: 300 },
    });
  }
  for (let r = INFO_START; r < INFO_START + IMG_ROWS; r++) {
    if (!ws.getRow(r).height) ws.getRow(r).height = 20;
  }

  const SEP_ROW = INFO_START + IMG_ROWS + 1;
  ws.mergeCells(`A${SEP_ROW}:I${SEP_ROW}`);
  cell(ws, SEP_ROW, 1, t.included, { bg: G, fg: W, bold: true, size: 11, indent: 1, border: false });
  ws.getRow(SEP_ROW).height = 28;

  const HDR_ROW   = SEP_ROW + 1;
  const photoLabel = language === "es" ? "Foto" : "Photo";
  const prodLabel  = language === "en" || language === "nl" ? "Product" : language === "fr" ? "Produit" : language === "it" ? "Prodotto" : language === "pt" ? "Produto" : language === "de" ? "Produkt" : language === "pl" ? "Produkt" : language === "ro" ? "Produs" : "Producto";
  const headers = [photoLabel, "Ref.", prodLabel, t.color, `${t.alto} cm`, `${t.largo} cm`, `${t.ancho} cm`, t.units, t.price];
  headers.forEach((h, i) => {
    cell(ws, HDR_ROW, i + 1, h, { bg: SLATE, fg: W, bold: true, size: 9, hAlign: "center", border: false });
  });
  ws.getRow(HDR_ROW).height = 22;
  for (let c2 = 1; c2 <= 9; c2++) {
    ws.getCell(HDR_ROW, c2).border = { bottom: { style: "medium", color: { argb: G } } };
  }

  const DATA_START = HDR_ROW + 1;

  stand.products.forEach((p, i) => {
    const r     = DATA_START + i;
    const bg    = i % 2 === 0 ? W : GR2;
    const imgId = productImgIds[i];
    ws.getRow(r).height = imgId !== null ? 44 : 18;

    cell(ws, r, 1, "",                { bg, border: true });
    cell(ws, r, 2, realRef(p.name),   { bg, fg: "FF64748b", hAlign: "center", bold: true });
    cell(ws, r, 3, getProductDesc(p.id, language) ?? cleanName(p.name), { bg, indent: 1, wrapText: true });
    cell(ws, r, 4, translateColor(p.color, language), { bg, indent: 1 });
    cell(ws, r, 5, p.alto  ? `${p.alto} cm`  : "", { bg, hAlign: "center" });
    cell(ws, r, 6, p.largo ? `${p.largo} cm` : "", { bg, hAlign: "center" });
    cell(ws, r, 7, p.ancho ? `${p.ancho} cm` : "", { bg, hAlign: "center" });
    cell(ws, r, 8, p.units ?? "", { bg: Y, fg: "FF202020", bold: true, hAlign: "center" });
    cell(ws, r, 9, p.price ?? "", { bg: G, fg: W,          bold: true, hAlign: "center" });

    if (imgId !== null) {
      ws.addImage(imgId, {
        tl: { col: 0, row: r - 1 },
        ext: { width: 55, height: 40 },
        editAs: "oneCell",
      });
    }
  });
}

const TAB_NAMES: Partial<Record<Language, string>> = {
  es: "Español", en: "English", fr: "Français",
  it: "Italiano", pt: "Português", de: "Deutsch",
  nl: "Nederlands", pl: "Polski", ro: "Română",
};

export async function downloadExcel(stand: Stand, language: Language = "es"): Promise<void> {
  const origin = window.location.origin;

  const [standImg, ...productImgs] = await Promise.all([
    getImgForExcel(resolveImgSrc(stand.image, origin).replace(/\.webp$/, ".png"), origin),
    ...stand.products.map(p => getImgForExcel(p.image, origin)),
  ]);

  const ExcelJS = (await import("exceljs")).default;
  const wb = new ExcelJS.Workbook();

  const standImgId    = standImg ? wb.addImage({ buffer: standImg.buf, extension: standImg.ext }) : null;
  const productImgIds = productImgs.map(img =>
    img ? wb.addImage({ buffer: img.buf, extension: img.ext }) : null
  );

  const t          = copy[language] ?? copy.es;
  const standTitle = getStandCopy(stand, language).title;
  const ws         = wb.addWorksheet(TAB_NAMES[language] ?? "Ficha Técnica");
  buildSheet(ws, stand, t, language, standTitle, standImgId, productImgIds);

  const buffer = await wb.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const a   = document.createElement("a");
  a.href     = url;
  a.download = `ficha-tecnica-${stand.id}.xlsx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadPDF(stand: Stand, language: Language = "es"): void {
  const origin      = window.location.origin;
  const t           = copy[language] ?? copy.es;
  const standTitle  = getStandCopy(stand, language).title;
  const infoRows    = buildInfoRows(stand, t);
  const standImgUrl = resolveImgSrc(stand.image, origin);

  const photoLabel = language === "es" ? "Foto" : "Photo";
  const refLabel   = language === "en" ? "Ref. No." : language === "fr" ? "N° Réf." : "Nº Ref.";
  const prodLabel  = language === "en" ? "Product" : language === "fr" ? "Produit" : language === "it" ? "Prodotto" : language === "pt" ? "Produto" : language === "de" ? "Produkt" : language === "nl" ? "Product" : language === "pl" ? "Produkt" : language === "ro" ? "Produs" : "Producto";
  const sectionLabel = language === "en" ? "Display information" : language === "fr" ? "Informations expositor" : language === "it" ? "Informazioni espositore" : language === "pt" ? "Informações expositor" : language === "de" ? "Expositor-Informationen" : language === "nl" ? "Expositeur informatie" : language === "pl" ? "Informacje ekspozytora" : language === "ro" ? "Informații expozitor" : "Ficha del expositor";
  const colHeaders  = [photoLabel, refLabel, prodLabel, t.color, `${t.alto} (cm)`, `${t.largo} (cm)`, `${t.ancho} (cm)`, t.units, t.price];

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${standTitle}</title>
<style>
  body { font-family: Arial, sans-serif; padding: 32px; color: #202020; }
  h1 { color: #169b22; font-size: 22px; margin-bottom: 16px; }
  h2 { font-size: 13px; color: #555; margin: 24px 0 8px; text-transform: uppercase; letter-spacing: 0.08em; }
  .info-section { display: flex; gap: 28px; align-items: flex-start; }
  .info-table { flex: 1; min-width: 0; }
  .stand-img { width: 180px; flex-shrink: 0; object-fit: contain; border-radius: 8px; background: #f8fafc; padding: 8px; }
  table { border-collapse: collapse; width: 100%; font-size: 11px; }
  th { background: #169b22; color: white; padding: 6px 10px; text-align: left; white-space: nowrap; }
  td { border-bottom: 1px solid #e2e8f0; padding: 6px 8px; vertical-align: middle; }
  tr:nth-child(even) td { background: #f8fafc; }
  .price { color: #169b22; font-weight: bold; }
  .ref   { font-size: 10px; color: #888; font-family: monospace; }
  .photo { width: 58px; height: 58px; object-fit: contain; display: block; }
  @media print { body { padding: 16px; } }
</style>
<script>window.addEventListener('load', function() { window.print(); });<\/script>
</head><body>
<h1>${standTitle}</h1>
<h2>${sectionLabel}</h2>
<div class="info-section">
  <div class="info-table">
    <table>${infoRows.map(([k, v]) => {
      const isPrice = k === t.standPrice || k === t.standPriceUnit;
      return `<tr><td><b>${k}</b></td><td class="${isPrice ? "price" : ""}">${v}</td></tr>`;
    }).join("")}</table>
  </div>
  <img src="${standImgUrl}" class="stand-img" alt="${standTitle}" />
</div>
<h2>${t.included}</h2>
<table>
  <thead><tr>${colHeaders.map(h => `<th>${h}</th>`).join("")}</tr></thead>
  <tbody>${stand.products.map(p => `<tr>
    <td><img src="${resolveImgSrc(p.image, origin)}" class="photo" alt="${p.name}" /></td>
    <td class="ref">${realRef(p.name)}</td>
    <td>${getProductDesc(p.id, language) ?? cleanName(p.name)}</td>
    <td>${translateColor(p.color, language) || "—"}</td>
    <td>${p.alto  ? p.alto  + " cm" : "—"}</td>
    <td>${p.largo ? p.largo + " cm" : "—"}</td>
    <td>${p.ancho ? p.ancho + " cm" : "—"}</td>
    <td>${p.units ?? "—"}</td>
    <td class="price">${p.price ?? "—"}</td>
  </tr>`).join("")}</tbody>
</table>
</body></html>`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url  = URL.createObjectURL(blob);
  const win  = window.open(url, "_blank");
  if (!win) {
    const a = document.createElement("a");
    a.href = url; a.target = "_blank";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}

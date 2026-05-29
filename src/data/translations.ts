import type { Language, TranslationCopy } from "../types";

export const languages: Record<Language, { flag: string; short: string; name: string }> = {
  es: { flag: "🇪🇸", short: "ES", name: "Español" },
  en: { flag: "🇬🇧", short: "EN", name: "English" },
  fr: { flag: "🇫🇷", short: "FR", name: "Français" },
  it: { flag: "🇮🇹", short: "IT", name: "Italiano" },
  pt: { flag: "🇵🇹", short: "PT", name: "Português" },
};

export const copy: Record<Language, TranslationCopy> = {
  es: {
    eyebrow: "Catálogo interactivo Novedades Leiva",
    heroTitle: "Expositores listos para supermercados.",
    heroText:
      "Selecciona una temporada o categoría, revisa los productos incluidos y prepara el pedido con unidades y precio por referencia.",
    monthlyEyebrow: "Campañas mensuales",
    monthlyTitle: "Expositores por temporada",
    permanentEyebrow: "Catálogo permanente",
    permanentTitle: "Expositores todo el año",
    references: "20 referencias",
    included: "Productos incluidos",
    columns: "5 columnas × 4 filas",
    units: "Unidades",
    price: "Precio/u",
    request: "Solicitar este expositor",
  },
  en: {
    eyebrow: "Interactive Novedades Leiva catalog",
    heroTitle: "Displays ready for supermarkets.",
    heroText:
      "Choose a season or category, review the included products, and prepare the order with units and price per item.",
    monthlyEyebrow: "Monthly campaigns",
    monthlyTitle: "Seasonal displays",
    permanentEyebrow: "Permanent catalog",
    permanentTitle: "Year-round displays",
    references: "20 references",
    included: "Included products",
    columns: "5 columns × 4 rows",
    units: "Units",
    price: "Price/unit",
    request: "Request this display",
  },
  fr: {
    eyebrow: "Catalogue interactif Novedades Leiva",
    heroTitle: "Présentoirs prêts pour les supermarchés.",
    heroText:
      "Choisissez une saison ou une catégorie, consultez les produits inclus et préparez la commande avec les unités et le prix par article.",
    monthlyEyebrow: "Campagnes mensuelles",
    monthlyTitle: "Présentoirs saisonniers",
    permanentEyebrow: "Catalogue permanent",
    permanentTitle: "Présentoirs toute l'année",
    references: "20 références",
    included: "Produits inclus",
    columns: "5 colonnes × 4 lignes",
    units: "Unités",
    price: "Prix/unité",
    request: "Demander ce présentoir",
  },
  it: {
    eyebrow: "Catalogo interattivo Novedades Leiva",
    heroTitle: "Espositori pronti per supermercati.",
    heroText:
      "Scegli una stagione o una categoria, consulta i prodotti inclusi e prepara l'ordine con unità e prezzo per articolo.",
    monthlyEyebrow: "Campagne mensili",
    monthlyTitle: "Espositori stagionali",
    permanentEyebrow: "Catalogo permanente",
    permanentTitle: "Espositori tutto l'anno",
    references: "20 referenze",
    included: "Prodotti inclusi",
    columns: "5 colonne × 4 righe",
    units: "Unità",
    price: "Prezzo/unità",
    request: "Richiedi questo espositore",
  },
  pt: {
    eyebrow: "Catálogo interativo Novedades Leiva",
    heroTitle: "Expositores prontos para supermercados.",
    heroText:
      "Escolha uma temporada ou categoria, veja os produtos incluídos e prepare o pedido com unidades e preço por referência.",
    monthlyEyebrow: "Campanhas mensais",
    monthlyTitle: "Expositores por temporada",
    permanentEyebrow: "Catálogo permanente",
    permanentTitle: "Expositores todo o ano",
    references: "20 referências",
    included: "Produtos incluídos",
    columns: "5 colunas × 4 linhas",
    units: "Unidades",
    price: "Preço/unid.",
    request: "Solicitar este expositor",
  },
};

/** Textos de título y descripción de cada expositor por idioma */
export const standText: Record<Language, Record<string, [string, string]>> = {
  es: {
    ene: ["Expositor Enero", "Ideal para reactivar ventas tras las fiestas con productos esenciales."],
    feb: ["Expositor Febrero", "Regalos rápidos, detalles impulsivos y productos de alta rotación."],
    mar: ["Expositor Marzo", "Juegos de exterior para aprovechar el inicio del buen tiempo."],
    abr: ["Expositor Abril", "Productos de primavera, Pascua y campañas familiares."],
    may: ["Expositor Mayo", "Preparación de temporada de calor con juguetes dinámicos."],
    jun: ["Expositor Junio", "Campaña de fin de clases y primeras compras de verano."],
    jul: ["Expositor Set de Playa", "Los productos estrella para playa, piscina y verano."],
    ago: ["Expositor Agosto", "Entretenimiento para viajes, vacaciones y tardes de verano."],
    sep: ["Expositor Septiembre", "Vuelta al cole con productos prácticos e infantiles."],
    oct: ["Expositor Halloween", "Disfraces, decoración y accesorios para campañas de impacto visual."],
    nov: ["Expositor Noviembre", "Inicio de campaña navideña y productos de alta demanda."],
    dic: ["Expositor Navidad", "Regalos de última hora y top ventas para diciembre."],
    balones: ["Expositor Balones", "Surtido completo de balones deportivos para todas las edades."],
    mascotas: ["Expositor Mascotas", "Juguetes, accesorios y productos de cuidado para mascotas."],
    eco: ["Expositor Eco", "Productos reciclables y alternativas respetuosas con el entorno."],
    belleza: ["Expositor Belleza", "Sets de maquillaje, peinados y accesorios infantiles."],
    cocina: ["Expositor Cocina", "Accesorios de cocina con colores y licencias familiares."],
    desechables: ["Expositor Desechables", "Artículos para cumpleaños, fiestas y celebraciones."],
    auto: ["Expositor Automóviles", "Productos funcionales para coche y viaje familiar."],
    juguetes: ["Expositor Juguetes", "Juguetes genéricos de venta constante durante todo el año."],
    toys: ["Expositor Toys", "Novedades y juguetes de importación exclusivos."],
  },
  en: {
    ene: ["January Display", "Essential products to reactivate sales after the holidays."],
    feb: ["February Display", "Quick gifts, impulse details, and high-rotation products."],
    mar: ["March Display", "Outdoor games for the beginning of good weather."],
    abr: ["April Display", "Spring, Easter, and family campaign products."],
    may: ["May Display", "Warm-season preparation with dynamic toys."],
    jun: ["June Display", "End-of-school campaign and first summer purchases."],
    jul: ["Beach Set Display", "Star products for beach, pool, and summer."],
    ago: ["August Display", "Entertainment for travel, holidays, and summer afternoons."],
    sep: ["September Display", "Back-to-school products for families and children."],
    oct: ["Halloween Display", "Costumes, decorations, and accessories for visual impact."],
    nov: ["November Display", "Start of the Christmas campaign and high-demand products."],
    dic: ["Christmas Display", "Last-minute gifts and December best sellers."],
    balones: ["Ball Display", "A complete selection of sports balls for all ages."],
    mascotas: ["Pet Display", "Toys, accessories, and care products for pets."],
    eco: ["Eco Display", "Recyclable products and environmentally conscious alternatives."],
    belleza: ["Beauty Display", "Makeup, hairstyle, and children's accessory sets."],
    cocina: ["Kitchen Display", "Colorful kitchen accessories for family retail."],
    desechables: ["Disposable Display", "Items for birthdays, parties, and celebrations."],
    auto: ["Car Display", "Functional products for cars and family travel."],
    juguetes: ["Toy Display", "Generic toys with constant year-round sales."],
    toys: ["Toys Display", "New releases and exclusive imported toys."],
  },
  // FR, IT, PT comparten los textos en español hasta que se traduzcan
  fr: {},
  it: {},
  pt: {},
} as Record<Language, Record<string, [string, string]>>;

/** Devuelve título y descripción del expositor en el idioma activo */
export function getStandCopy(
  stand: { id: string; title: string; desc: string },
  language: Language
): { title: string; desc: string } {
  const source = standText[language] ?? standText.es;
  const value = source[stand.id] ?? standText.es[stand.id] ?? [stand.title, stand.desc];
  return { title: value[0], desc: value[1] };
}

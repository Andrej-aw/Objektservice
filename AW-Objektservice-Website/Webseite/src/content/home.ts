import type { IconName } from "@/components/Icon";

type IconItem = { icon: IconName; title: string; text: string };

export const navigation = [
  { label: "Leistungen", href: "/#leistungen" },
  { label: "Über uns", href: "/#ueber-uns" },
  { label: "Für wen", href: "/#fuer-wen" },
  { label: "Kontakt", href: "/#kontakt" },
];

export const heroTrustPoints: { icon: IconName; label: string }[] = [
  { icon: "shieldCheck", label: "Zuverlässig" },
  { icon: "user", label: "Persönlicher Service" },
  { icon: "fileText", label: "Faire Preise" },
  { icon: "mapPin", label: "Schnell vor Ort" },
];


export const benefits: IconItem[] = [
  {
    icon: "shieldCheck",
    title: "Zuverlässig",
    text: "Absprachen werden eingehalten und Aufgaben zuverlässig erledigt.",
  },
  {
    icon: "user",
    title: "Persönlich",
    text: "Direkter Ansprechpartner statt anonymer Service-Hotline.",
  },
  {
    icon: "sliders",
    title: "Flexibel",
    text: "Individuelle Lösungen für Wohnungen, Häuser, Gewerbeobjekte und Immobilienverwaltungen.",
  },
  {
    icon: "mapPin",
    title: "Regional",
    text: "Schnell erreichbar und in Aichach und Umgebung tätig.",
  },
];

export const targetGroups: IconItem[] = [
  {
    icon: "home",
    title: "Privatkunden",
    text: "Für Eigentümer und Mieter, die Unterstützung rund um Haus und Grundstück benötigen.",
  },
  {
    icon: "key",
    title: "Vermieter",
    text: "Regelmäßige Betreuung und Pflege von Mietobjekten.",
  },
  {
    icon: "building",
    title: "Hausverwaltungen",
    text: "Zuverlässige Unterstützung bei der laufenden Objektbetreuung – auch für Eigentümergemeinschaften.",
  },
  {
    icon: "briefcase",
    title: "Gewerbekunden",
    text: "Pflege und Betreuung von Büro-, Gewerbe- und Betriebsflächen.",
  },
];

export const processSteps = [
  {
    title: "Anfrage senden",
    text: "Kontaktieren Sie uns telefonisch oder über das Anfrageformular.",
  },
  {
    title: "Besichtigung / Abstimmung",
    text: "Wir besprechen den Bedarf und die gewünschten Leistungen.",
  },
  {
    title: "Angebot erhalten",
    text: "Sie erhalten ein transparentes, individuelles Angebot.",
  },
];

export const aboutPoints = [
  "Ein fester Ansprechpartner für Ihre Immobilie",
  "Kurze Wege in Aichach und Umgebung",
  "Klare Absprachen und verlässliche Termine",
];

export const propertyTypes = [
  "Einfamilienhaus",
  "Mehrfamilienhaus",
  "Wohnanlage / WEG",
  "Gewerbeobjekt",
  "Büro / Praxis",
  "Sonstiges",
];

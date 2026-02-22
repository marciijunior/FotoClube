/**
 * Mapa de meses abreviados em português para índices JavaScript (0-11).
 */
export const MONTH_MAP = {
  Jan: 0,
  Fev: 1,
  Mar: 2,
  Abr: 3,
  Mai: 4,
  Jun: 5,
  Jul: 6,
  Ago: 7,
  Set: 8,
  Out: 9,
  Nov: 10,
  Dez: 11,
};

/**
 * Array de nomes dos meses abreviados, indexado de 0 a 11.
 */
export const MONTH_NAMES = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

/**
 * Converte uma data no formato "20, Dez-2025" para um objeto Date.
 * @param {string} dateStr - Data no formato brasileiro do sistema ("DD, Mmm-YYYY")
 * @returns {Date}
 */
export function parseEventDate(dateStr) {
  try {
    const [dayStr, rest] = dateStr.split(", ");
    const [monthStr, yearStr] = rest.split("-");
    return new Date(parseInt(yearStr), MONTH_MAP[monthStr], parseInt(dayStr));
  } catch {
    return new Date(0);
  }
}

/**
 * Gera link para o calendário de eventos a partir de uma data string.
 * @param {string} dateString - Data no formato "DD, Mmm-YYYY"
 * @returns {string} URL relativa para /eventos com query params
 */
export function generateCalendarLink(dateString) {
  try {
    if (!dateString) return "/eventos";
    const [dayStr, rest] = dateString.split(", ");
    const [monthStr, yearStr] = rest.split("-");

    const day = parseInt(dayStr);
    const year = parseInt(yearStr);
    const month = MONTH_MAP[monthStr];

    return `/eventos?ano=${year}&mes=${month}&dia=${day}`;
  } catch {
    return "/eventos";
  }
}

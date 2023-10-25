export function formatDate(dateString: Date): string {
  const date = new Date(dateString); // Converter a string em um objeto Date
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Note that months are 0-based (January = 0)
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function formatDateToYYYYMMDD(birthDate: Date): string {
  const date = new Date(birthDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Os meses são base 0, então adicionamos 1 e formatamos com zero à esquerda, se necessário.
  const day = date.getDate().toString().padStart(2, "0"); // Formate o dia com zero à esquerda, se necessário.

  return `${year}-${month}-${day}`;
}

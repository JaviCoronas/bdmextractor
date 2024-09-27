import { createEvent, createEvents, DateArray } from 'ics';
import * as XLSX from 'xlsx';

type CalendarEvent = {
    week: string;
    dateStart: string;
    group: string;
    category: string;
    name: string;
    city: string;
    country: string;
  };

const FILE_NAME = 'calendario_fesba'

export const downloadCSV = async (data: CalendarEvent[]) => {
    try {
        const csvRows = [];
        const headers = ['Semana', 'Fecha de Inicio', 'Grupo', 'Categoría', 'Nombre', 'Ciudad', 'País'];
        csvRows.push(headers.join(';'));
  
        data.forEach(event => {
          const row = [
            event.week,
            event.dateStart,
            event.group,
            event.category,
            event.name,
            event.city,
            event.country
          ];
          csvRows.push(row.join(';'));
        });
  
        const csvString = csvRows.join('\n');
  
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
  
        const a = document.createElement('a');
        a.href = url;
        a.download = `${FILE_NAME}.csv`; 
        a.click();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error al obtener los datos o descargar el CSV:', error);
      }
}


export const downloadXLS = (events: CalendarEvent[]) => {
    const workbook = XLSX.utils.book_new();

    const eventsWithSpanishHeaders = events.map(event => ({
        'Semana': event.week,
        'Fecha de Inicio': event.dateStart,
        'Grupo': event.group,
        'Categoría': event.category,
        'Nombre': event.name,
        'Ciudad': event.city,
        'País': event.country
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(eventsWithSpanishHeaders);

    worksheet['!cols'] = [
        { wch: 10 }, // Ancho de la columna "Semana"
        { wch: 15 }, // Ancho de la columna "Fecha de Inicio"
        { wch: 15 }, // Ancho de la columna "Grupo"
        { wch: 10 }, // Ancho de la columna "Categoría"
        { wch: 75 }, // Ancho de la columna "Nombre"
        { wch: 30 }, // Ancho de la columna "Ciudad"
        { wch: 15 }, // Ancho de la columna "País"
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Eventos');
  
    XLSX.writeFile(workbook, `${FILE_NAME}.xlsx`);
};


const formatDateToICS = (dateString: string): string => {
    const [day, month, year] = dateString.split('/').map(Number);
    return `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`;
};

export const downloadICS = (events: CalendarEvent[]) => {
    let icsContent = 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\nCALSCALE:GREGORIAN\r\nMETHOD:PUBLISH\r\n'; // Encabezado del archivo .ics

    events.forEach((event) => {
        const formattedDate = formatDateToICS(event.dateStart); // Convertir la fecha al formato YYYYMMDD
        
        icsContent += `BEGIN:VEVENT\r\n`;
        icsContent += `UID:${event.name}-${formattedDate}@fesba\r\n`; // UID único
        icsContent += `DTSTART;VALUE=DATE:${formattedDate}\r\n`; // Fecha de inicio
        icsContent += `DTEND;VALUE=DATE:${formattedDate}\r\n`; // Fecha de fin (un día completo)
        icsContent += `SUMMARY:${event.name}\r\n`; // Título del evento
        icsContent += `DESCRIPTION:Evento en ${event.city}, ${event.country}\r\n`; // Descripción del evento
        icsContent += `LOCATION:${event.city}, ${event.country}\r\n`; // Ubicación
        icsContent += `STATUS:CONFIRMED\r\n`; // Estado del evento
        icsContent += `END:VEVENT\r\n`;
    });

    icsContent += 'END:VCALENDAR'; 

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${FILE_NAME}.ics`; 
    a.click();

    window.URL.revokeObjectURL(url);
};
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import {load } from 'cheerio'; // Usaremos cheerio para parsear el HTML
import { CalendarEvent } from '../domain/CalendarEvent';
import { CalendarFilter } from '../domain/CalendarFilter';

export const revalidate = 60
 
export async function POST(req: Request) {
  // Hacemos la solicitud a la página web
  const request = await req.json() as CalendarFilter
  const response = await axios.get('https://www.badminton.es/calendar/192/Calendario-FESBA');
  console.log(request)

  // Cargamos el HTML con cheerio
  const $ = load(response.data);

  // Aquí extraemos los datos de la tabla del calendario
  const events: CalendarEvent[] = [];

  // Reemplaza este selector con el correcto tras inspeccionar la estructura HTML
  $('table tr').each((index, element) => {
    const week = $(element).find('td:nth-child(1)').text().trim(); 
    const dateStart = $(element).find('td:nth-child(2)').text().trim(); //Fecha inicio
    const group = $(element).find('td:nth-child(3)').text().trim(); //Grupo
    const category = $(element).find('td:nth-child(4)').text().trim(); 
    const name = $(element).find('td:nth-child(5)').text().trim(); //Fecha inicio
    const city = $(element).find('td:nth-child(6)').text().trim(); //Grupo
    const country = $(element).find('td:nth-child(7)').text().trim(); //Grupo

    // Añadimos solo si los datos existen (puede que haya filas vacías)
    if (dateStart) {
      events.push({
        week: parseInt(week),
        dateStart,
        group,
        category,
        name,
        city,
        country
      });
    }
  });

  let eventsFiltered: CalendarEvent[] = events
    
  if(request.country === 'España') {
    eventsFiltered = events.filter(event =>{ event.country === 'Nacional'})
  }


  if (request.fromWeek && request.toWeek) {
    eventsFiltered = eventsFiltered.filter(event => {
      const eventWeek = event.week;
      return eventWeek >= request.fromWeek && eventWeek <= request.toWeek;
    });
  }

  console.log(eventsFiltered)
 
  return Response.json(eventsFiltered)
}

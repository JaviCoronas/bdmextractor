import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// Definir el tipo de datos que devolverá la API
type DataType = {
  id: number;
  name: string;
  value: number;
}; // Ajusta según tus necesidades

export default async function handler(req: NextApiRequest, res: NextApiResponse<any | { message: string }>) {
  if (req.method === 'GET') {
    try {
        console.log("asdasdad")
      //const response = await axios.get('https://www.badminton.es/calendar/192/Calendario-FESBA');
      //const data: DataType[] = response.data; // Tipamos la respuesta
      res.status(200).json("hello");
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'Error fetching data' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
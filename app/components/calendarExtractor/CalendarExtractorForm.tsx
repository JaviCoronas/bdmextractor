'use client'

import { useState } from 'react'
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Select,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react'

import { useToast } from '@chakra-ui/react'
import React from 'react'
import { downloadCSV, downloadICS, downloadXLS } from './services/fileCreation'
import { CalendarFilter } from '@/app/api/domain/CalendarFilter'
import { addDays, format, getISOWeek } from 'date-fns'

type CalendarEvent = {
  week: string;
  dateStart: string;
  group: string;
  category: string;
  name: string;
  city: string;
  country: string;
};

export enum TypeDownload {
  CSV = 'CSV',
  XLS = 'XLS',
  ICS = 'Google Calendar'
}


const Form1 = ({typeCompetition, setTypeCompetition}: any) => {

  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Tipo de Calendario
      </Heading>
      <Flex>
        <FormControl mr="5%" mb={140}>
          <RadioGroup onChange={setTypeCompetition} value={typeCompetition}>
            <Stack direction='column'>
              <Radio value='Nacional' colorScheme='orange'>Nacional</Radio>
              <Radio value='Internacional' colorScheme='orange'>Internacional</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
      </Flex>
    </>
  )
}

const Form2 = ({setWeekFrom, setWeekTo, fromWeek}: any) => {

  const generateWeeksOfYear = (year: number) => {
    const weeks = [];
    const startDate = new Date(year, 0, 1);
    let currentStart = startDate;

    for (let week = 1; week <= 52; week++) {
      const currentEnd = addDays(currentStart, 6); 

      const formattedStart = format(currentStart, 'd/M');
      const formattedEnd = format(currentEnd, 'd/M');

      const weekText = `Semana ${week} - Del ${formattedStart} al ${formattedEnd}`;

      weeks.push({ week, text: weekText });

      currentStart = addDays(currentStart, 7);
    }

    return weeks;
  };

  const weeks = generateWeeksOfYear(2024);
  const currentWeek = getISOWeek(new Date()); // Semana ISO actual
  const availableWeeksFrom = weeks.filter(week => week.week >= currentWeek);
  const filteredWeeks = weeks.filter(week => parseInt(fromWeek) ? week.week >= parseInt(fromWeek) : true);

  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Selección Semanas
      </Heading>
      <Flex mb="70" flexDirection={"column"}>
        <FormControl as={GridItem} colSpan={[6, 3]}>
          <FormLabel
            htmlFor="semanas"
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: 'gray.50',
            }}>
            Desde
          </FormLabel>
          <Select
            id="from"
            name="fromSemana"
            placeholder="Selecciona una opción"
            focusBorderColor="brand.400"
            shadow="sm"
            size="sm"
            w="full"
            rounded="md"
            onChange={(e) => setWeekFrom(e.target.value)}>
            {availableWeeksFrom.map(week => (
              <option key={week.week} value={week.week}>
                {week.text}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl as={GridItem} colSpan={[6, 3]}>
          <FormLabel
            htmlFor="semanas"
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: 'gray.50',
            }}>
            Hasta
          </FormLabel>
          <Select
            id="to"
            name="toSemana"
            placeholder="Selecciona una opción"
            focusBorderColor="brand.400"
            shadow="sm"
            size="sm"
            w="full"
            rounded="md"
            disabled={!fromWeek}
            onChange={(e) => setWeekTo(e.target.value)}>
            {filteredWeeks.map(week => (
              <option key={week.week} value={week.week}>
                {week.text}
              </option>
            ))}
          </Select>
        </FormControl>
      </Flex>

    </>
  )
}

const Form3 = ({typeDownload, setTypeDownload}: any) => {

  return (
    <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Elige archivo de descarga
      </Heading>
      <Flex>
        <FormControl mr="5%" mb={90}>
          <RadioGroup onChange={setTypeDownload} value={typeDownload}>
            <Stack direction='column' mt={15}>
              <Radio value={TypeDownload.CSV} colorScheme='orange'>CSV</Radio>
              <Radio value={TypeDownload.XLS} colorScheme='orange'>Excel</Radio>
              <Radio value={TypeDownload.ICS} colorScheme='orange'>Google Calendar</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
      </Flex>
    </>
  )
}

export default function CalendarExtractorForm() {
  const toast = useToast()
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(33.33)

  const [data, setData] = useState<CalendarEvent[]>([]); // Tipar el estado
  const [typeCompetition, setTypeCompetition] = React.useState('Nacional')
  const [weekStart, setWeekStart] = React.useState(1)
  const [weekTo, setWeekTo] = React.useState(2)
  const [typeDownload, setTypeDownload] = React.useState(TypeDownload.CSV)


  const fetchAndDownload = async (type: TypeDownload) => {
    try {
      const response = await fetch('/api/tournaments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({country: typeCompetition, fromWeek: weekStart, toWeek: weekTo} as CalendarFilter), 
      });
      const data: CalendarEvent[] = await response.json();
      const eventsFiltered = (typeCompetition == 'Nacional') ? data.filter(event => event.country === 'España' || event.country === '') : data.filter(event => event.country !== 'España' && event.country !== '')
      setData(eventsFiltered);
      switch(type) {
        case TypeDownload.CSV : {downloadCSV(eventsFiltered); break;}
        case TypeDownload.XLS : {downloadXLS(eventsFiltered); break;}
        case TypeDownload.ICS : {downloadICS(eventsFiltered); break;}
      }
    } catch (error) {
      console.error('Error al obtener los datos o descargar el archivo:', error);
    }
  };

  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        width={600}
        height={400}
        p={6}
        m="10px auto"
        as="form">
        <Progress hasStripe value={progress} mb="5%" mx="5%" colorScheme='orange' isAnimated></Progress>
        {step === 1 ? <Form1 typeCompetition={typeCompetition} setTypeCompetition={setTypeCompetition}/> : 
          step === 2 ? <Form2 setWeekFrom={setWeekStart} setWeekTo={setWeekTo} fromWeek={weekStart}/> : 
          <Form3 typeDownload={typeDownload} setTypeDownload={setTypeDownload} />}
        <ButtonGroup mt="5%" w="100%" >
          <Flex w="100%" justifyContent="flex-end">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1)
                  setProgress(progress - 33.33)
                }}
                isDisabled={step === 1}
                colorScheme="orange"
                variant="solid"
                w="7rem"
                mr="5%">
                Atrás
              </Button>
              <Button
                w="7rem"
                hidden={step === 3}
                onClick={() => {
                  setStep(step + 1)
                  if (step === 3) {
                    setProgress(100)
                  } else {
                    setProgress(progress + 33.33)
                  }
                }}
                colorScheme="orange"
                variant="outline">
                Siguiente
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                onClick={() => {
                  toast({
                    title: 'Procediendo a la descarga',
                    description: "En breve se realizará la descarga ",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  })
                  switch (typeDownload) {
                    case TypeDownload.CSV : {
                      fetchAndDownload(TypeDownload.CSV)
                      break;
                    }
                    case TypeDownload.XLS : {
                      fetchAndDownload(TypeDownload.XLS)
                      break;
                    }
                    case TypeDownload.ICS : {
                      fetchAndDownload(TypeDownload.ICS)
                      break;
                    }
                  }
                }}>
                Descarga
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  )
}
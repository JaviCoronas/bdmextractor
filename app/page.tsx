'use client'
import { Link } from "@chakra-ui/next-js";
import { Stack, Heading, Button, Flex, Container, Text, Box } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image'

type CalendarEvent = {
  week: string;
  dateStart: string;
  group: string;
  category: string;
  name: string;
  city: string;
  country: string;
};



export default function Home() {
  const router = useRouter();

  const goToExtractor = () => {
    router.push('/extractor');
  };
  const goToLeerMas = () => {
    router.push('/leermas');
  };

  return (
    <div className="">
      <main className="">
      <Container maxW={'5xl'}>
        <div className="flex justify-center items-center mt-10">
          <Image src="/assets/logo-rbg.png" alt='Logo' width="500" height="500"/>
        </div>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}>
          Bienvenido a BadmintonESP{' '}
          <Text as={'span'} color={'orange.400'}>
            Extractor
          </Text>
        </Heading>
        <Text color={'gray.500'} maxW={'3xl'}>
        BadmintonESP Extractor es una herramienta avanzada diseñada para facilitar la obtención y descarga de datos directamente desde el calendario oficial de la Federación Española de Bádminton (FESBA). Nuestro sitio te permite extraer fácilmente información clave sobre los campeonatos, torneos y eventos, ahorrándote tiempo y esfuerzo.
        </Text>
        <Stack spacing={6} direction={'row'}>
          <Button
            rounded={'full'}
            px={6}
            colorScheme={'orange'}
            bg={'orange.400'}
            _hover={{ bg: 'orange.500' }}
            onClick={goToExtractor}>
            Empieza
          </Button>
          <Button rounded={'full'} px={6} onClick={goToLeerMas}>
            Leer más...
          </Button>
        </Stack>
      </Stack>
    </Container>
      </main>
    </div>
  );
}

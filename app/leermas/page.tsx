import React from 'react'
import Image from 'next/image'
import { Stack, Heading, Button, Flex, Container, Text, Box, Link } from "@chakra-ui/react";
import { FaCoffee } from 'react-icons/fa'; // Un ícono de café, opcional para personalizar el botón


const LeerMas = () => {
  return (
    <><div className="flex justify-center items-center mt-10">
          <Image src="/assets/logo-rbg.png" alt='Logo' width="500" height="500" />
      </div>
      <div
        className='text-center mr-3 ml-3'>
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}>
          Todo sobre BadmintonESP{' '}
          <Text as={'span'} color={'orange.400'}>
            Extractor
          </Text>
        </Heading>
        <Text color={'gray.500'} maxW={'3xl'} pb={5} pt={5}>
            Este proyecto tiene como objetivo crear una plataforma web que facilite la extracción de datos de la página oficial de la <strong>Federación Española de Bádminton <Link className="" href='https://www.badminton.es'>(FESBA)</Link></strong>. El sitio permitirá a los usuarios obtener información actualizada sobre competiciones, eventos y torneos de forma estructurada y descargable en diferentes formatos.        
        </Text>
        <Text color={'gray.500'} maxW={'3xl'} pb={5}>
            La finalidad es ofrecer un tratamiento más eficiente de los datos obtenidos, permitiendo a entrenadores, jugadores, clubes y aficionados acceder a la información de manera más organizada y personalizada. Esto incluye la capacidad de filtrar y seleccionar datos relevantes por fechas, tipos de competición, ubicaciones, y categorías.
        </Text>
        <Text color={'gray.500'} maxW={'3xl'} pb={5}>
            El desarrollo de la plataforma no se limitará únicamente a la extracción de información sobre torneos y competiciones actuales. A medida que evoluciona el proyecto, se proyecta expandir las capacidades de la plataforma para incluir.        
        </Text>
        <Text color={'gray.500'} maxW={'3xl'} pb={5}>
            Si te gusta lo que ves y quieres apoyarme, invítame a un café para poder seguir viviendo :).        </Text>
      </div>
      <div className='flex m-5 justify-center items-center'>

      <Button
        as="a"
        href="https://buymeacoffee.com/javiercoronas" // Enlace a tu página de donaciones
        target="_blank" // Abrir en una nueva pestaña
        leftIcon={<FaCoffee />} // Agregar el ícono de café
        bg="yellow.400" // Color de fondo del botón
        color="black" // Color del texto
        _hover={{ bg: 'yellow.500' }} // Color al pasar el mouse
        >
      Invítame un café
    </Button>
        </div>
      </>
  )
}

export default LeerMas
'use client'
import { Link } from "@chakra-ui/next-js";
import { Stack, Heading, Button, Flex, Container, Text } from "@chakra-ui/react";
import { useState } from "react";
import CalendarExtractorForm from "../components/calendarExtractor/CalendarExtractorForm";

export default function Extractor() {
  return (
    <div className="">
      <main className="">
      <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}>
          BadmintonESP{' '}
          <Text as={'span'} color={'orange.400'}>
            Extractor Torneos
          </Text>
        </Heading>
        <Text color={'gray.500'} maxW={'3xl'}>
          Sigue las instrucciones del formulario y procede a la extracción
        </Text>
        <Flex w={'full'}>
          <CalendarExtractorForm />
        </Flex>
      </Stack>
    </Container>
      </main>
    </div>
  );
}
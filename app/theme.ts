import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    fonts: {
      heading: 'var(--font-rubik)',
      body: 'var(--font-rubik)',
    },
    styles: {
        global: {
            bg: "#0c1545"
        }
    }
});
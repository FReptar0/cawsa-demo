import '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';

const MyApp = ({ Component, pageProps }) => {

    return (
        <>
            <Head>
                <title>Cawsa - Demo</title>
                <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                <meta name='lang' content='en' />
                <meta name='description' content='Cawsa - Demo' />
                <meta name='author' content='GitHub: FReptar0 | Linkedin: /in/fernando-rm' />
                <meta name='robots' content='index, follow' />
                <meta httpEquiv='cache-control' content='max-age=31536000' />
            </Head>
            <ChakraProvider>
                <Component {...pageProps} />
            </ChakraProvider>
        </>
    );
};

export default MyApp;
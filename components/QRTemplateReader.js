import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import Swal from 'sweetalert2';
import axios from 'axios';

const QRFormComponent = () => {

    const [scanResult, setScanResult] = useState(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            fps: 5,
            qrbox: {
                width: 250,
                height: 250
            },
        });

        scanner.render(onScanSuccess);

        function onScanSuccess(qrCodeMessage) {
            console.log(qrCodeMessage);
            // pasar el qrCodeMessage a json
            const qrCodeMessageJson = JSON.parse(qrCodeMessage);
            console.log(qrCodeMessageJson);
            scanner.pause();
            setScanResult(qrCodeMessageJson);

            // TODO: enviar el qrCodeMessageJson al backend
        }
    }, []);

    return (
        <Box
            boxShadow={'xl'}
            p={4}
            borderRadius="md"
            maxWidth="2xl"
            mx="auto"
            my={16}
        >
            <Text
                fontSize="2xl"
                fontWeight="bold"
                mb={4}
                backgroundColor="orange.300"
                textAlign="center"
                height="50px"
                lineHeight="50px"
                borderRadius="md"
                width="90%"
                mx="auto"
            >
                Scan QR
            </Text>
            <Box id="reader" />

        </Box>
    );
};

export default QRFormComponent;

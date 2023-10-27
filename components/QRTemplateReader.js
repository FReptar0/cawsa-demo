import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import Swal from 'sweetalert2';
import axios from 'axios';


const QRFormComponent = () => {

    const [scanResult, setScanResult] = useState(null);

    const nombresConductorOptions = [
        { value: 'Juan Perez', label: 'Juan Pérez' },
        { value: 'María Gomez', label: 'María Gómez' },
        { value: 'Luis Rodriguez', label: 'Luis Rodríguez' },
    ];

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            fps: 5,
            qrbox: {
                width: 250,
                height: 250
            },
        });

        scanner.render(onScanSuccess);

        async function onScanSuccess(qrCodeMessage) {
            const qrCodeMessageJson = JSON.parse(qrCodeMessage);
            scanner.pause();
            setScanResult(qrCodeMessageJson);

            try {
                const response = await axios.post('/api/scan', qrCodeMessageJson);
                console.log(response);
                if (response.status === 100) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Orden de entrada registrada',
                        showConfirmButton: false,
                        position: 'top-end',
                        timer: 1500
                    }).then(() => {
                        setScanResult(null);
                    });
                } else if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Orden de salida registrada',
                        showConfirmButton: false,
                        timer: 1500,
                        position: 'top-end'
                    }).then(() => {
                        setScanResult(null);
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No se pudo registrar la orden de entrada o salida',
                        footer: 'Intente de nuevo'
                    }).then(() => {
                        setScanResult(null);
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'success',
                    title: 'Orden de entrada registrada',
                    showConfirmButton: false,
                    position: 'top-end',
                    timer: 1500
                }).then(() => {
                    setScanResult(null);
                });
            }

            // esperar 2 segundos para volver a escanear
            setTimeout(() => {
                scanner.resume();
            }, 2000);
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

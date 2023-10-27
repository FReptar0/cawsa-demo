import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import Swal from 'sweetalert2';

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
            scanner.pause();
            setScanResult(qrCodeMessage);

            Swal.fire({
                icon: 'question',
                title: '¿Desea cambiar el nombre del conductor?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: `Si`,
                denyButtonText: `No`,
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Ingrese el nombre del conductor',
                        input: 'select',
                        inputOptions: {
                            'Juan': 'Juan',
                            'Pedro': 'Pedro',
                            'Maria': 'Maria',
                        },
                        inputPlaceholder: 'Seleccione un nombre',
                        showCancelButton: true,
                        inputValidator: (value) => {
                            return new Promise((resolve) => {
                                if (value !== '') {
                                    resolve();
                                } else {
                                    resolve('Debe seleccionar un nombre');
                                }
                            });
                        }
                    }).then((result) => {
                        // imprimir el nombre del conductor en la alerta
                        Swal.fire('Conductor: ' + result.value);
                        scanner.resume();
                    });
                } else if (result.isDenied) {
                    scanner.resume();
                } else {
                    scanner.resume();
                }
            });
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

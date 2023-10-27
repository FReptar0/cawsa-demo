import React, { useEffect, useRef, useState } from 'react';
import QrCode from 'qrcode-reader';
import {
    Box,
    Button,
    HStack,
    Text,
} from '@chakra-ui/react';

const QRFormComponent = () => {
    const videoRef = useRef(null);
    const [isQRScanning, setIsQRScanning] = useState(false);
    const [isCameraEnabled, setIsCameraEnabled] = useState(false);

    useEffect(() => {
        const qr = new QrCode();
        const video = videoRef.current;

        const handleQrCode = (json) => {
            console.log('Código QR leído: ' + json);
        };

        if (isCameraEnabled) {
            navigator.mediaDevices
                .getUserMedia({ video: { facingMode: 'environment' } })
                .then((stream) => {
                    video.srcObject = stream;
                    video.setAttribute('playsinline', true);
                    video.play().then(() => {
                        video.addEventListener('loadedmetadata', function () {
                            const canvas = document.createElement('canvas');
                            canvas.width = 100; // Establece el ancho del lienzo en 100px
                            canvas.height = 100; // Establece la altura del lienzo en 100px
                            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

                            try {
                                qr.decode(canvas);
                            } catch (e) {
                                console.error(e);
                            }
                        });
                    });
                });
        }

        qr.callback = (result) => {
            if (result) {
                handleQrCode(result.result);
            }
        };
    }, [isCameraEnabled]);

    const toggleCamera = () => {
        setIsCameraEnabled(!isCameraEnabled);
    };

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
            <Box
                border="1px solid #ccc"
                borderRadius="lg"
                width="300px" // Establece el ancho del cuadro del video en 100px
                height="220px" // Establece la altura del cuadro del video en 100px
                overflow="hidden"
                position="relative"
                background={'blackAlpha.800'}
                mx="auto"
            >
                {isCameraEnabled && (
                    <video ref={videoRef}></video>
                )}
            </Box>
            <HStack spacing={4} mt={4} justifyContent="center">
                <Button onClick={() => setIsQRScanning(!isQRScanning)}>
                    {isQRScanning ? 'Detener Escaneo QR' : 'Iniciar Escaneo QR'}
                </Button>
                <Button onClick={toggleCamera}>
                    {isCameraEnabled ? 'Deshabilitar Cámara' : 'Habilitar Cámara'}
                </Button>
            </HStack>
        </Box>
    );
};

export default QRFormComponent;

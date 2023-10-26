import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    VStack,
    Stack,
} from '@chakra-ui/react';
import Select from 'react-select';
import axios from 'axios';
import Swal from 'sweetalert2';

const FormSchema = Yup.object().shape({
    placas: Yup.string().required('Las placas son obligatorias'),
    nombreConductor: Yup.string().required('El nombre del conductor es obligatorio'),
});

// Ejemplo de opciones para las listas desplegables
const placasOptions = [
    { value: 'ABC123', label: 'ABC123' },
    { value: 'XYZ456', label: 'XYZ456' },
    { value: 'DEF789', label: 'DEF789' },
];

const QRFormComponent = () => {
    const formik = useFormik({
        initialValues: {
            placas: '',
            nombreConductor: '', // Agregamos el campo nombreConductor
        },
        validationSchema: FormSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axios.post('/api/generateqr', values);

                if (response.status === 200) {
                    Swal.fire({
                        title: '¡QR generado!',
                        text: 'El QR se ha generado correctamente',
                        html: `<img src="${response.data.data}" alt="QR" style="width: 200px; height: 200px; display: block; margin: 0 auto;" />`,
                        confirmButtonText: 'Descargar QR',
                        showCancelButton: true,
                        cancelButtonText: 'Cerrar',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            const link = document.createElement('a');
                            link.href = response.data.data;
                            link.download = `${values.placas}_qr.png`;
                            link.click();
                        }
                    });
                    resetForm();
                } else {
                    console.log(response.data);
                    resetForm();
                }
            } catch (error) {
                console.log(error);
                resetForm();
            }
        },
    });

    return (
        <Box p={4} borderRadius="md" boxShadow="md" maxWidth="2xl" mx="auto" my={16}>
            <form onSubmit={formik.handleSubmit}>
                <VStack spacing={4} padding={8}>
                    <FormControl isRequired isInvalid={formik.touched.placas && formik.errors.placas}>
                        <FormLabel>Placas</FormLabel>
                        <Select
                            name="placas"
                            value={placasOptions.find((option) => option.value === formik.values.placas)}
                            options={placasOptions}
                            onChange={(selectedOption) => formik.setFieldValue('placas', selectedOption.value)}
                            onBlur={formik.handleBlur}
                            isSearchable
                            placeholder="Selecciona las placas"
                        />
                    </FormControl>

                    <FormControl isRequired isInvalid={formik.touched.nombreConductor && formik.errors.nombreConductor}>
                        <FormLabel>Nombre del Conductor</FormLabel>
                        <Input
                            name="nombreConductor"
                            type="text"
                            value={formik.values.nombreConductor}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Ingresa el nombre del conductor"
                        />
                    </FormControl>

                    <Button type="submit" colorScheme="blue" isLoading={formik.isSubmitting}>
                        Enviar
                    </Button>
                </VStack>
            </form>
        </Box>
    );
};

export default QRFormComponent;

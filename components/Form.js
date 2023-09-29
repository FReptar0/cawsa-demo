import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    VStack,
    Text,
} from '@chakra-ui/react';
import Select from 'react-select';


const FormSchema = Yup.object().shape({
    folio: Yup.string().required('El Folio es obligatorio'),
    fechaEntrada: Yup.date().required('La fecha de entrada es obligatoria'),
    horaEntrada: Yup.string().required('La hora de entrada es obligatoria'),
    fechaSalida: Yup.date().required('La fecha de salida es obligatoria'),
    horaSalida: Yup.string().required('La hora de salida es obligatoria'),
    placas: Yup.string().required('Las placas son obligatorias'),
    nombreConductor: Yup.string().required('El nombre del conductor es obligatorio'),
});

// Ejemplo de opciones para las listas desplegables
const placasOptions = [
    { value: 'ABC123', label: 'ABC123' },
    { value: 'XYZ456', label: 'XYZ456' },
    { value: 'DEF789', label: 'DEF789' },
];

const nombresConductorOptions = [
    { value: 'Juan Pérez', label: 'Juan Pérez' },
    { value: 'María Gómez', label: 'María Gómez' },
    { value: 'Luis Rodríguez', label: 'Luis Rodríguez' },
];

const FormComponent = () => {
    const formik = useFormik({
        initialValues: {
            folio: '',
            fechaEntrada: '',
            horaEntrada: '',
            fechaSalida: '',
            horaSalida: '',
            placas: '',
            nombreConductor: '',
        },
        validationSchema: FormSchema,
        onSubmit: (values) => {
            // Aquí puedes manejar la lógica de envío del formulario
            console.log(values);
        },
    });

    return (
        <Box p={4}
            borderRadius="md"
            boxShadow="md"
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
                In/Out Data Entry
            </Text>
            <form onSubmit={formik.handleSubmit}>
                <VStack spacing={4} padding={8}>
                    <FormControl isRequired isInvalid={formik.touched.folio && formik.errors.folio}>
                        <FormLabel>Folio</FormLabel>
                        <Input
                            name="folio"
                            type="text"
                            value={formik.values.folio}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </FormControl>

                    <FormControl isRequired isInvalid={formik.touched.fechaEntrada && formik.errors.fechaEntrada}>
                        <FormLabel>Fecha de Entrada</FormLabel>
                        <Input
                            name="fechaEntrada"
                            type="date"
                            value={formik.values.fechaEntrada}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </FormControl>

                    <FormControl isRequired isInvalid={formik.touched.horaEntrada && formik.errors.horaEntrada}>
                        <FormLabel>Hora de Entrada</FormLabel>
                        <Input
                            name="horaEntrada"
                            type="time"
                            value={formik.values.horaEntrada}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </FormControl>

                    <FormControl isRequired isInvalid={formik.touched.fechaSalida && formik.errors.fechaSalida}>
                        <FormLabel>Fecha de Salida</FormLabel>
                        <Input
                            name="fechaSalida"
                            type="date"
                            value={formik.values.fechaSalida}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </FormControl>

                    <FormControl isRequired isInvalid={formik.touched.horaSalida && formik.errors.horaSalida}>
                        <FormLabel>Hora de Salida</FormLabel>
                        <Input
                            name="horaSalida"
                            type="time"
                            value={formik.values.horaSalida}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </FormControl>

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

                    <FormControl
                        isRequired
                        isInvalid={formik.touched.nombreConductor && formik.errors.nombreConductor}
                    >
                        <FormLabel>Nombre del Conductor</FormLabel>
                        <Select
                            name="nombreConductor"
                            value={nombresConductorOptions.find(
                                (option) => option.value === formik.values.nombreConductor
                            )}
                            options={nombresConductorOptions}
                            onChange={(selectedOption) =>
                                formik.setFieldValue('nombreConductor', selectedOption.value)
                            }
                            onBlur={formik.handleBlur}
                            isSearchable
                            placeholder="Selecciona el nombre del conductor"
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

export default FormComponent;

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
    Flex,
    Stack, // Importa el componente Stack de Chakra UI
} from '@chakra-ui/react';
import Select from 'react-select';
import axios from 'axios';
import Swal from 'sweetalert2';

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
        onSubmit: async (values, { resetForm }) => {
            console.log(values);

            const response = await axios.post('/api/register', values).catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true,
                    position: 'top-right',
                }).then(() => {
                    formik.setFieldValue('placas', '');
                    formik.setFieldValue('nombreConductor', '');
                    resetForm();
                });
            });

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Order saved',
                    text: 'Order saved successfully',
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true,
                    position: 'top-right',
                }).then(() => {
                    formik.setFieldValue('nombreConductor', '');
                    formik.setFieldValue('placas', '');
                    resetForm();
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true,
                    position: 'top-right',
                }).then(() => {
                    formik.setFieldValue('placas', '');
                    formik.setFieldValue('nombreConductor', '');
                    resetForm();
                });
            }
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
                            placeholder="Ingresa el folio"
                        />
                    </FormControl>

                    <Stack
                        direction={{ base: 'column', md: 'row' }} // Esto cambia la dirección del Stack en pantallas pequeñas
                        justifyContent="space-between"
                        alignItems="center"
                        width="100%"
                        spacing={4} // Espaciado entre los elementos del Stack
                    >
                        <FormControl
                            isRequired
                            isInvalid={formik.touched.fechaEntrada && formik.errors.fechaEntrada}
                            width={{ base: '100%', md: '50%' }} // Ancho del campo en pantallas pequeñas y medianas
                            marginRight={{ base: 0, md: '10' }} // Espacio derecho en pantallas medianas
                        >
                            <FormLabel>Fecha de Entrada</FormLabel>
                            <Input
                                name="fechaEntrada"
                                type="date"
                                value={formik.values.fechaEntrada}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </FormControl>

                        <FormControl
                            isRequired
                            isInvalid={formik.touched.horaEntrada && formik.errors.horaEntrada}
                            width={{ base: '100%', md: '50%' }} // Ancho del campo en pantallas pequeñas y medianas
                        >
                            <FormLabel>Hora de Entrada</FormLabel>
                            <Input
                                name="horaEntrada"
                                type="time"
                                value={formik.values.horaEntrada}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </FormControl>
                    </Stack>

                    <Stack
                        direction={{ base: 'column', md: 'row' }} // Esto cambia la dirección del Stack en pantallas pequeñas
                        justifyContent="space-between"
                        alignItems="center"
                        width="100%"
                        spacing={4} // Espaciado entre los elementos del Stack
                    >
                        <FormControl
                            isRequired
                            isInvalid={formik.touched.fechaSalida && formik.errors.fechaSalida}
                            width={{ base: '100%', md: '50%' }} // Ancho del campo en pantallas pequeñas y medianas
                            marginRight={{ base: 0, md: '10' }} // Espacio derecho en pantallas medianas
                        >
                            <FormLabel>Fecha de Salida</FormLabel>
                            <Input
                                name="fechaSalida"
                                type="date"
                                value={formik.values.fechaSalida}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                width="100%"
                            />
                        </FormControl>

                        <FormControl
                            isRequired
                            isInvalid={formik.touched.horaSalida && formik.errors.horaSalida}
                            width={{ base: '100%', md: '50%' }} // Ancho del campo en pantallas pequeñas y medianas
                        >
                            <FormLabel>Hora de Salida</FormLabel>
                            <Input
                                name="horaSalida"
                                type="time"
                                value={formik.values.horaSalida}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </FormControl>
                    </Stack>

                    <FormControl
                        isRequired
                        isInvalid={formik.touched.placas && formik.errors.placas}
                    >
                        <FormLabel>Placas</FormLabel>
                        <Select
                            name="placas"
                            value={placasOptions.find((option) => option.value === formik.values.placas)}
                            options={placasOptions}
                            onChange={(selectedOption) => formik.setFieldValue('placas', selectedOption.value)}
                            onBlur={formik.handleBlur}
                            isSearchable
                            placeholder="Selecciona las placas"
                            id='placas'
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
                            id='nombreConductor'
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

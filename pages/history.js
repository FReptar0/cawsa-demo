import Header from "@/components/Header";
import { Container, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

export default function history() {
    // Datos estáticos para la tabla
    const data = [
        {
            folio: "001",
            placas: "ABC123",
            conductor: "Juan Pérez",
            fechaEntrada: "2023-10-20",
            horaEntrada: "09:00 AM",
            fechaSalida: "2023-10-20",
            horaSalida: "05:00 PM",
            status: "Completado",
        },
        {
            folio: "001",
            placas: "ABC123",
            conductor: "Juan Pérez",
            fechaEntrada: "2023-10-20",
            horaEntrada: "09:00 AM",
            fechaSalida: "2023-10-20",
            horaSalida: "05:00 PM",
            status: "Completado",
        },
        {
            folio: "001",
            placas: "ABC123",
            conductor: "Juan Pérez",
            fechaEntrada: "2023-10-20",
            horaEntrada: "09:00 AM",
            fechaSalida: "",
            horaSalida: "",
            status: "Salida pendiente",
        },
        {
            folio: "001",
            placas: "ABC123",
            conductor: "Juan Pérez",
            fechaEntrada: "2023-10-20",
            horaEntrada: "09:00 AM",
            fechaSalida: "",
            horaSalida: "",
            status: "Salida pendiente",
        },
        {
            folio: "001",
            placas: "ABC123",
            conductor: "Juan Pérez",
            fechaEntrada: "2023-10-20",
            horaEntrada: "09:00 AM",
            fechaSalida: "",
            horaSalida: "",
            status: "Salida pendiente",
        },
        // Agregar más filas de datos aquí
    ];

    return (
        <>
            <Header />
            <Container maxW="container.xl">
                <div
                    style={
                        {
                            overflowX: "auto"
                        }
                    }
                >
                    <Table variant="striped" colorScheme="teal">
                        <Thead>
                            <Tr>
                                <Th>#</Th>
                                <Th>Folio</Th>
                                <Th>Placas</Th>
                                <Th>Conductor</Th>
                                <Th>Fecha entrada</Th>
                                <Th>Hora de entrada</Th>
                                <Th>Fecha salida</Th>
                                <Th>Hora de salida</Th>
                                <Th>Status</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((item, index) => (
                                <Tr key={index}>
                                    <Td>{index + 1}</Td>
                                    <Td>{item.folio}</Td>
                                    <Td>{item.placas}</Td>
                                    <Td>{item.conductor}</Td>
                                    <Td>{item.fechaEntrada}</Td>
                                    <Td>{item.horaEntrada}</Td>
                                    <Td>{item.fechaSalida}</Td>
                                    <Td>{item.horaSalida}</Td>
                                    <Td>{item.status}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </div>
            </Container>
        </>
    );
}

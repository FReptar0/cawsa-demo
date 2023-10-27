import Header from "@/components/Header";
import { Container, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { connectToDatabase } from "@/config/MongoDB";

export default function history({ history}) {
    // Datos estáticos para la tabla
    const data = history.map((item) => {
        return {
            folio: item.folio,
            placas: item.placas,
            conductor: item.nombreConductor,
            fechaEntrada: item.fechaSinHora,
            horaEntrada: item.horaEntrada,
            fechaSalida: item.fechaSalida,
            horaSalida: item.horaSalida,
            status: item.isOut ? "Salida registrada" : "Salida pendiente",
        };
    });

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

export async function getServerSideProps() {
    const db = await connectToDatabase();
    const collection = db.collection("cawsa-register-history");
    const query = {};
    const options = {};

    const result = await collection.find(query, options).toArray();

    return {
        props: {
            history: JSON.parse(JSON.stringify(result)),
        },
    };
}

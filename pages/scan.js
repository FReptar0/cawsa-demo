import Header from "@/components/Header";
import QRFormReader from "@/components/QRTemplateReader";
import { Container } from "@chakra-ui/react";

export default function scan() {
    return (
        <>
            <Header />
            <Container maxW="container.xl">
                <QRFormReader />
            </Container>
        </>
    )
}

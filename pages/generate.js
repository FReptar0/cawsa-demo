import Header from '@/components/Header'
import QRFormComponent from '@/components/QRForm'
import { Container } from '@chakra-ui/react'

export default function index() {
    return (
        <>
            <Header />
            <Container maxW="container.xl">
                <QRFormComponent />
            </Container>
        </>
    )
}

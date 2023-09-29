import Form from '@/components/Form'
import Header from '@/components/Header'
import { Container } from '@chakra-ui/react'

export default function index() {
    return (
        <>
            <Header />
            <Container maxW="container.xl">
                <Form />
            </Container>
        </>
    )
}

import React from 'react';
import {
    Box,
    Flex,
    Spacer,
    IconButton,
    Avatar,
    Badge,
    Text
} from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';

const Header = () => {
    return (
        <Flex
            as="header"
            align="center"
            justify="space-between"
            px={16}
            py={4}
            boxShadow="md"
            height="120px"
            marginBottom="48px"
        >
            <Box>
                <Text fontSize="2xl" fontWeight="bold" color="purple.800">
                    Cawsa Data Entry
                </Text>
            </Box>
            <Spacer />
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                textAlign="center"
            >
                <Avatar
                    size="md"
                    name="Fernando"
                    src="https://via.placeholder.com/36"
                    marginBottom="2"
                />
                <Badge
                    ml={2}
                    fontSize="xs"
                    colorScheme="green"
                    variant="solid"
                    minW="100px"
                    maxW="100px"
                >
                    Admin
                </Badge>
            </Box>
            <IconButton
                ml={4}
                size="lg"
                color="gray.900"
                variant="ghost"
                aria-label="Logout"
                icon={<FiLogOut />}
                marginLeft="24px"
            />
        </Flex>
    );
};

export default Header;

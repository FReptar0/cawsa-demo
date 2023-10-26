import React from 'react';
import {
    Box,
    Flex,
    IconButton,
    Text,
    Link,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FiMenu } from 'react-icons/fi';

const Header = () => {

    const isIndex = useRouter().pathname === '/';
    const isGenerate = useRouter().pathname === '/generate';
    const isScan = useRouter().pathname === '/scan';
    const isHistory = useRouter().pathname === '/history';

    return (
        <Flex
            as="header"
            align="center"
            justify="space-between"
            px={10}
            py={10}
            boxShadow="md"
            height="60px"
            marginBottom="4"
        >
            <Box display={{ base: 'block', md: 'none' }}>
                <Menu>
                    <MenuButton
                        as={IconButton}
                        icon={<FiMenu />}
                        variant="ghost"
                        aria-label="Menu"
                        size="lg"
                    />
                    <MenuList>
                        {!isGenerate && (
                            <MenuItem>
                                <Link href="/generate">Generate QR</Link>
                            </MenuItem>
                        )}
                        {!isScan && (
                            <MenuItem>
                                <Link href="/scan">Scan QR</Link>
                            </MenuItem>
                        )}
                        {!isHistory && (
                            <MenuItem>
                                <Link href="/history">Historial</Link>
                            </MenuItem>
                        )}
                        {!isIndex && (
                            <MenuItem>
                                <Link href="/">Manual Entry</Link>
                            </MenuItem>
                        )}
                    </MenuList>
                </Menu>
            </Box>
            <Flex align="center">
                <Text fontSize="lg" fontWeight="bold" color="purple.800">
                    Cawsa - Demo
                </Text>
            </Flex>
            <Box margin={20} flex="1" display={{ base: 'none', md: 'flex' }}>
                {!isGenerate && (
                    <Link marginX={4} fontSize={15} fontWeight="medium" href="/generate">
                        Generate QR
                    </Link>
                )}
                {!isScan && (
                    <Link marginX={4} fontSize={15} fontWeight="medium" href="/scan">
                        Scan QR
                    </Link>
                )}
                {!isHistory && (
                    <Link marginX={4} fontSize={15} fontWeight="medium" href="/history">
                        Historial
                    </Link>
                )}
                {!isIndex && (
                    <Link marginX={4} fontSize={15} fontWeight="medium" href="/">
                        Manual Entry
                    </Link>)
                }
            </Box>
        </Flex>
    );
};

export default Header;

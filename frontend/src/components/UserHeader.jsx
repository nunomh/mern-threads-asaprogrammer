import {
    Avatar,
    Box,
    Flex,
    Link,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Portal,
    Text,
    VStack,
    useColorModeValue,
} from '@chakra-ui/react';
import { BsInstagram } from 'react-icons/bs';
import { CgMoreO } from 'react-icons/cg';

const UserHeader = () => {
    return (
        <VStack gap={4} alignItems={'start'}>
            <Flex justifyContent={'space-between'} w={'full'}>
                <Box>
                    <Text fontSize={'2xl'} fontWeight={'bold'}>
                        Mark Zuckerberg
                    </Text>
                    <Flex gap={2} alignItems={'center'}>
                        <Text fontSize={'sm'} bg={'gray.dark'} color={'gray.light'} p={1} borderRadius={'full'}>
                            @zuck
                        </Text>
                        <Text fontSize={'sm'}>·</Text>
                        <Text fontSize={'sm'}>1.2M followers</Text>
                    </Flex>
                </Box>
                <Box>
                    <Avatar name="Mark Zuckerberg" src="/zuck-avatar.png" size={'xl'} />
                </Box>
            </Flex>

            <Text>Co-founder, executive chairman and CEO of Metal Platform</Text>
            <Flex w={'full'} justifyContent={'space-between'}>
                <Flex gap={2} alignItems={'center'}>
                    <Text color={'gray.light'}>3.2K followers</Text>
                    <Box w={1} h={1} bg={'gray.light'} borderRadius={'full'}></Box>
                    <Link color={'gray.light'}>instagram.com</Link>
                </Flex>
                <Flex>
                    <Box className="icon-container">
                        <BsInstagram size={24} cursor={'pointer'} />
                    </Box>
                    <Box className="icon-container">
                        <Menu>
                            <MenuButton>
                                <CgMoreO size={24} cursor={'pointer'} />
                            </MenuButton>
                            <Portal>
                                <MenuList bg={useColorModeValue('gray.200', 'gray.dark')}>
                                    <MenuItem bg={useColorModeValue('gray.200', 'gray.dark')}>Copy link</MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>
                    </Box>
                </Flex>
            </Flex>
        </VStack>
    );
};

export default UserHeader;

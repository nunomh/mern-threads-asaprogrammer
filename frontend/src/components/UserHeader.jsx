import { Box, Flex, VStack } from '@chakra-ui/react';

const UserHeader = () => {
    return (
        <VStack gap={4} alignItems={'start'}>
            <Flex justifyContent={'space-between'} w={'full'}>
                <Box>user</Box>
                <Box>avatar</Box>
            </Flex>
        </VStack>
    );
};

export default UserHeader;

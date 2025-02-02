import { Avatar, Flex, Img, Text } from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';

const PostPage = () => {
    return (
        <>
            <Flex>
                <Flex w={'full'} alignItems={'center'} gap={3}>
                    <Avatar size={'md'} name="Mark Zuckerberg" src="/zuck-avatar.png" />
                    <Flex>
                        <Text fontSize={'sm'} fontWeight={'bold'}>
                            Mark Zuckerberg
                        </Text>
                        <Img src="/verified.png" w={4} h={4} ml={1} />
                    </Flex>
                </Flex>
                <Flex gap={4} alignItems={'center'}>
                    <Text fontStyle={'sm'} color={'gray.light'}>
                        1d
                    </Text>
                    <BsThreeDots />
                </Flex>
            </Flex>
        </>
    );
};

export default PostPage;

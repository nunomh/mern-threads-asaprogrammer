import { Avatar, Flex, Img, Text, Box, Image, Divider, Button } from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import PostActions from '../components/PostActions';
import { useState } from 'react';
import Comment from '../components/Comment';

const PostPage = () => {
    const [liked, setLiked] = useState(false);
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
            <Text my={3}>Let&apos;s talk about threads</Text>
            <Box borderRadius={6} overflow={'hidden'} border={'1px solid'} borderColor={'gray.light'}>
                <Image src={'/post1.png'} w={'full'} />
            </Box>
            <Flex gap={3} my={3}>
                <PostActions liked={liked} setLiked={setLiked} />
            </Flex>
            <Flex gap={2} alignItems={'center'}>
                <Text color={'gray.light'} fontSize={'sm'}>
                    238 replies
                </Text>
                <Box w={0.5} h={0.5} borderRadius={'full'} bg={'gray.light'}></Box>
                <Text color={'gray.light'} fontSize={'sm'}>
                    {200 + (liked ? 1 : 0)} likes
                </Text>
            </Flex>
            <Divider my={4} />

            <Flex justifyContent={'space-between'}>
                <Flex gap={2} alignItems={'center'}>
                    <Text fontSize={'2xl'}>👋</Text>
                    <Text color={'gray.light'}>Get the app to like, reply and post.</Text>
                </Flex>
                <Button>Get</Button>
            </Flex>

            <Divider my={4} />
            <Comment />
            <Comment />
            <Comment />
        </>
    );
};

export default PostPage;

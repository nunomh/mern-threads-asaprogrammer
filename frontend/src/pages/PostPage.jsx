import { Avatar, Flex, Img, Text, Box, Image, Divider, Button, Spinner } from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import PostActions from '../components/PostActions';
import Comment from '../components/Comment';
import useGetUserProfile from '../hooks/useGetUserProfile';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useShowToast from '../hooks/useShowToast';
import { formatDistanceToNow } from 'date-fns';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import { DeleteIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const PostPage = () => {
    const { loading, user } = useGetUserProfile();

    const [post, setPost] = useState(null);
    const [loadingPost, setLoadingPost] = useState(true);
    const { pid } = useParams();
    const showToast = useShowToast();
    const currentUser = useRecoilValue(userAtom);
    const navigate = useNavigate();

    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await fetch(`/api/posts/${pid}`);
                const data = await res.json();
                if (data.error) {
                    showToast('Error', data.error, 'error');
                    return;
                }
                setPost(data);
            } catch (error) {
                showToast('Error', error.message, 'error');
            } finally {
                setLoadingPost(false);
            }
        };
        getPost();
    }, []);

    const handleDeletePost = async () => {
        try {
            if (!window.confirm('Are you sure you want to delete this post?')) return;

            const res = await fetch(`/api/posts/${post._id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.error) {
                showToast('Error', data.error, 'error');
                return;
            }
            showToast('Success', 'Post deleted successfully', 'success');
            navigate(`/${user.username}`);
        } catch (error) {
            showToast('Error', error.message, 'error');
        }
    };

    if (!user && loading) {
        return (
            <Flex justifyContent={'center'}>
                <Spinner size={'xl'} />
            </Flex>
        );
    }

    if (!post) {
        return null;
    }

    return (
        <>
            <Flex>
                <Flex w={'full'} alignItems={'center'} gap={3}>
                    <Avatar size={'md'} name={user.name} src={user.profilePic} />
                    <Flex>
                        <Text fontSize={'sm'} fontWeight={'bold'}>
                            {user.username}
                        </Text>
                        <Img src="/verified.png" w={4} h={4} ml={1} />
                    </Flex>
                </Flex>
                <Flex gap={4} alignItems={'center'}>
                    <Text fontSize={'xs'} width={36} textAlign={'right'} color={'gray.light'}>
                        {formatDistanceToNow(new Date(post.createdAt))} ago
                    </Text>
                    {/* <BsThreeDots /> */}

                    {currentUser?._id === user._id && (
                        <DeleteIcon size={20} cursor={'pointer'} onClick={handleDeletePost} />
                    )}
                </Flex>
            </Flex>
            <Text my={3}>{post.text}</Text>

            {post.img && (
                <Box borderRadius={6} overflow={'hidden'} border={'1px solid'} borderColor={'gray.light'}>
                    <Image src={post.img} w={'full'} />
                </Box>
            )}

            <Flex gap={3} my={2}>
                <PostActions post={post} />
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
            {post.replies.map(reply => (
                <Comment
                    key={reply._id}
                    reply={reply}
                    lastReply={reply._id === post.replies[post.replies.length - 1]._id}
                />
            ))}
        </>
    );
};

export default PostPage;

import { useState, useEffect } from 'react';
import UserHeader from '../components/UserHeader';
import { useParams } from 'react-router-dom';
import useShowToastWithCallback from '../hooks/useShowToastWithCallback';
import { Spinner, Flex } from '@chakra-ui/react';
import Post from '../components/Post';
import useGetUserProfile from '../hooks/useGetUserProfile';

const UserPage = () => {
    const { loading, user } = useGetUserProfile();

    const { username } = useParams();
    const showToast = useShowToastWithCallback();
    const [posts, setPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(true);

    useEffect(() => {
        const getPosts = async () => {
            setLoadingPosts(true);
            try {
                const res = await fetch(`/api/posts/user/${username}`);
                const data = await res.json();
                if (data.error) {
                    showToast('Error', data.error, 'error');
                    return;
                }
                setPosts(data);
            } catch (error) {
                showToast('Error', error, 'error');
                setPosts([]);
            } finally {
                setLoadingPosts(false);
            }
        };

        getPosts();
    }, [username]);

    if (!user && loading)
        return (
            <Flex h={'100vh'} justifyContent={'center'} alignItems={'center'}>
                <Spinner size={'xl'} />
            </Flex>
        );
    if (!user && !loading) return <h1>User not found</h1>;

    return (
        <>
            <UserHeader user={user} />

            {!loadingPosts && posts.length === 0 && <h1>User has no posts</h1>}

            {loadingPosts && (
                <Flex h={'100vh'} justifyContent={'center'} alignItems={'center'}>
                    <Spinner size={'xl'} />
                </Flex>
            )}

            {posts.map(post => (
                <Post post={post} key={post._id} postedBy={post.postedBy} />
            ))}
        </>
    );
};

export default UserPage;

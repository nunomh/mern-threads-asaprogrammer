import { Flex, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useShowToast from '../hooks/useShowToast';
import Post from '../components/Post';
import { useRecoilState } from 'recoil';
import postsAtom from '../atoms/postsAtom';

const HomePage = () => {
    const [posts, setPosts] = useRecoilState(postsAtom);
    const [loading, setLoading] = useState(true);
    const showToast = useShowToast();

    useEffect(() => {
        const getFeedPosts = async () => {
            try {
                const res = await fetch('/api/posts/feed');
                const data = await res.json();
                if (data.error) {
                    showToast('Error', data.error, 'error');
                    return;
                }
                console.log(data);
                setPosts(data);
            } catch (error) {
                showToast('Error', error, 'error');
            } finally {
                setLoading(false);
            }
        };

        getFeedPosts();
    }, [setPosts]);

    return (
        <>
            {loading && (
                <Flex h={'100vh'} justifyContent={'center'} alignItems={'center'}>
                    <Spinner size={'xl'} />
                </Flex>
            )}

            {!loading && posts.length === 0 && <h1>Follow some users to see their posts</h1>}

            {posts.map(post => (
                <Post key={post._id} post={post} postedBy={post.postedBy} />
            ))}
        </>
    );
};

export default HomePage;

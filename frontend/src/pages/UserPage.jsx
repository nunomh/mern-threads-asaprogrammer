import { useState, useEffect } from 'react';
import UserHeader from '../components/UserHeader';
import UserPost from '../components/UserPost';
import { useParams } from 'react-router-dom';
import useShowToastWithCallback from '../hooks/useShowToastWithCallback';
import { Spinner, Flex } from '@chakra-ui/react';

const UserPage = () => {
    const [user, setUser] = useState(null);
    const { username } = useParams();
    const showToast = useShowToastWithCallback();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`/api/users/profile/${username}`);
                const data = await res.json();
                if (data.error) {
                    showToast('Error', data.error, 'error');
                    return;
                }
                setUser(data);
            } catch (error) {
                showToast('Error', error, 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [username, showToast]);

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
            <UserPost likes={10} replies={2} postImg="/post1.png" postTitle="Threads post title" />
            <UserPost likes={11} replies={3} postImg="/post2.png" postTitle="Threads post title 2" />
            <UserPost likes={12} replies={4} postImg="/post3.png" postTitle="Threads post title 3" />
            <UserPost likes={13} replies={5} postTitle="Threads post title 4" />
        </>
    );
};

export default UserPage;

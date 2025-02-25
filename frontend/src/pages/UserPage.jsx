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

        const getPosts = async () => {};

        fetchUser();
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
        </>
    );
};

export default UserPage;

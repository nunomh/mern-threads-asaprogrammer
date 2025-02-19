import { useState, useEffect } from 'react';
import UserHeader from '../components/UserHeader';
import UserPost from '../components/UserPost';
import { useParams } from 'react-router-dom';
import useShowToastWithCallback from '../hooks/useShowToastWithCallback';

const UserPage = () => {
    const [user, setUser] = useState(null);
    const { username } = useParams();
    const showToast = useShowToastWithCallback();

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
            }
        };
        fetchUser();
    }, [username, showToast]);

    if (!user) return <div>Loading...</div>;

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

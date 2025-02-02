import UserHeader from '../components/UserHeader';
import UserPost from '../components/UserPost';

const UserPage = () => {
    return (
        <>
            <UserHeader />
            <UserPost likes={10} replies={2} postImg="/post1.png" postTitle="Threads post title" />
            <UserPost likes={11} replies={3} postImg="/post2.png" postTitle="Threads post title 2" />
            <UserPost likes={12} replies={4} postImg="/post3.png" postTitle="Threads post title 3" />
            <UserPost likes={13} replies={5} postTitle="Threads post title 4" />
        </>
    );
};

export default UserPage;

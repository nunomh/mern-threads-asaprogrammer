import { Container } from '@chakra-ui/react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserPage from './pages/UserPage';
import PostPage from './pages/PostPage';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import { useRecoilValue } from 'recoil';
import userAtom from './atoms/userAtom';
// import LogoutButton from './components/LogoutButton';
import UpdateProfilePage from './pages/UpdateProfilePage';
import CreatePostButton from './components/CreatePostButton';

function App() {
    const user = useRecoilValue(userAtom);
    return (
        <Container maxW="620px">
            <Header />
            <Routes>
                <Route path="/" element={user ? <HomePage /> : <Navigate to="/auth" />} />
                <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />
                <Route path="/update" element={user ? <UpdateProfilePage /> : <Navigate to="/" />} />

                <Route
                    path="/:username"
                    element={
                        user ? (
                            <>
                                <UserPage />
                                <CreatePostButton />
                            </>
                        ) : (
                            <UserPage />
                        )
                    }
                />
                <Route path="/:username/post/:pid" element={<PostPage />} />
            </Routes>

            {/* {user && <LogoutButton />} */}
            {/* {user && <CreatePostButton />} */}
        </Container>
    );
}

export default App;

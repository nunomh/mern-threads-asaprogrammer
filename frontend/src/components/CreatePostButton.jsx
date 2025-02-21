import {
    Button,
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    Textarea,
    Text,
    Input,
    Flex,
    Image,
    CloseButton,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useState, useRef } from 'react';
import usePreviewImg from '../hooks/usePreviewImg';
import { BsFillImageFill } from 'react-icons/bs';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import useShowToast from '../hooks/useShowToast';

const MAX_CHAR = 500;

const CreatePostButton = () => {
    const user = useRecoilValue(userAtom);
    const showToast = useShowToast();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [postText, setPostText] = useState('');

    const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
    const imageRef = useRef(null);

    const [reaimingCharacters, setReaimingCharacters] = useState(MAX_CHAR);

    const handleTextChange = event => {
        const inputText = event.target.value;

        if (inputText.length > MAX_CHAR) {
            const truncatedText = inputText.slice(0, MAX_CHAR);
            setPostText(truncatedText);
            setReaimingCharacters(0);
        } else {
            setPostText(inputText);
            setReaimingCharacters(MAX_CHAR - inputText.length);
        }
    };

    const handleCreatePost = async () => {
        const res = await fetch('/api/posts/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                postedBy: user._id,
                text: postText,
                img: imgUrl,
            }),
        });

        const data = await res.json();

        if (data.error) {
            showToast('Error', data.error, 'error');
            return;
        }

        showToast('Success', 'Post created successfully', 'success');

        onClose();
    };

    return (
        <>
            <Button
                position={'fixed'}
                bottom={10}
                right={10}
                leftIcon={<AddIcon />}
                bg={useColorModeValue('gray.300', 'gray.dark')}
                onClick={onOpen}
            >
                Post
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Textarea placeholder="What's on your mind?" onChange={handleTextChange} value={postText} />
                            <Text fontSize={'xs'} fontWeight={'bold'} textAlign={'right'} m={1} color={'gray.400'}>
                                {reaimingCharacters}/{MAX_CHAR}
                            </Text>

                            <Input type="file" hidden ref={imageRef} onChange={handleImageChange} />

                            <BsFillImageFill
                                style={{ marginLeft: '5px', cursor: 'pointer' }}
                                size={16}
                                onClick={() => imageRef.current.click()}
                            />
                        </FormControl>

                        {imgUrl && (
                            <Flex mt={5} w={'full'} position={'relative'}>
                                <Image src={imgUrl} alt="Selected Image" />
                                <CloseButton
                                    onClick={() => setImgUrl('')}
                                    bg={'gray.800'}
                                    position={'absolute'}
                                    top={2}
                                    right={2}
                                />
                            </Flex>
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme="blue" mr={3} onClick={handleCreatePost}>
                            Post
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CreatePostButton;

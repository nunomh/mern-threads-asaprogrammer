import { atom } from 'recoil';

const authScreenAtom = atom({
    key: 'authSchemaAtom',
    default: 'login',
});

export default authScreenAtom;

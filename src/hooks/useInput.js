import { useState } from "react";

const useInput = (initialValue) => {
    const [target, setTarget] = useState(initialValue);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setTarget((pre) => ({ ...pre, [name]: value }));
    };

    const onClearHandler = () => {
        setTarget(initialValue);
    };

    /**
     * @description
     * 1. 닉네임은 0글자 초과면 무조건 true
     * 2. password는 8글자 이상, 특수문자 1개 이상, 대문자 영어 1개 이상이면 true
     */
    const onValidator = (input) => {
        let result;
        // const nickName = ''
        // const code = ''
        // const nicknameRegex = /^[a-zA-Z0-9]{6,}/gi;
        const phoneNumber = /^\d{10,11}$/
        const emailRegex = /^[a-z0-9_+.-]+@[a-z0-9-]+\.[a-z0-9]{2,4}$/;
        // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,15}$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
        // const passwordRegex =
        //     /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/;
        if (input === "email") {
          result= emailRegex.test(target.userId);
        } else if (input === "password") {
          result= passwordRegex.test(target.password);
        } else if (input === "phoneNumber") {
          result= phoneNumber.test(target.phoneNumber);
        } else if (input === "passwordConfirm"){
          result = target.password === target.passwordConfirm;
        } else if (input === 'nickname') {
          result = target.nickname.trim().length > 0;
          // result = nicknameRegex.test(target.nickname) > 0;
        } else if (input === 'code') {
          result = target.code.trim().length > 0;
        }
        return result;
    };

    return [target, onChangeHandler, onClearHandler, onValidator];
};

export default useInput
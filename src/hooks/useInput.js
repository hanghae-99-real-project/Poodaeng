import { useState } from "react";

const useInput = (initialValue) => {
    const [target, setTarget] = useState(initialValue);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        if (name === "email") {
            setTarget((pre) => ({ ...pre, userId: value }));
        } else {
            setTarget((pre) => ({ ...pre, [name]: value }));
        }
    };

    const onClearHandler = () => {
        setTarget(initialValue);
    };

    const onValidator = (input) => {
        let result;
        const emailRegex = /^[a-z0-9_+.-]+@[a-z0-9-]+\.[a-z0-9]{2,4}$/;
        const passwordRegex =
            /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/;
        if (input === "email") {
          result= emailRegex.test(target.userId);
        } else if (input === "password") {
          result= passwordRegex.test(target.password);
        }
        return result;
    };

    return [target, onChangeHandler, onClearHandler, onValidator];
};

export default useInput
const useValidate = (target, input) => {
    const emailRegex = /^[a-z0-9_+.-]+@[a-z0-9-]+\.[a-z0-9]{2,4}$/;
    const passwordRegex =
        /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/;
    if (target === "email") {
        return emailRegex.test(input.userId);
    } 
    return passwordRegex.test(input.password);
    
};

export default useValidate
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../redux/api/authApi";
import validator from "validator";

const useSignUp = () => {
    const [register, { isLoading, isSuccess, error, isError, data }] =
        useRegisterMutation();

    const navigate = useNavigate();

    const [formData, setFormData] = useState<{
        fullName: string;
        userName: string;
        email: string;
        password: string;
    }>({
        fullName: "",
        userName: "",
        email: "",
        password: "",
    });
    const [touched, setTouched] = useState({
        fullName: false,
        userName: false,
        email: false,
        password: false,
    });

    const handleSignUp = (event: React.FormEvent) => {
        event.preventDefault();
        if (
            formData.fullName.length >= 7 &&
            formData.userName.length >= 5 &&
            validator.isEmail(formData.email) &&
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
                formData.password
            )
        ) {
            register(formData);
        }
        else {
            setTouched({
                fullName: true,
                userName: true,
                email: true,
                password: true,
            });
        }
    };
    useEffect(() => {
        if (isSuccess && data) {
            toast.success(data.message, {
                position: "top-center",
            });
            setTimeout(() => {
                navigate("/");
            }, 1000);
            setFormData({ fullName: "", userName: "", email: "", password: "" });
        }
        if (isError && error) {
            const errorMessage =
                (error as any)?.data?.message || "An unexpected error occurred";
            toast.error(errorMessage, {
                position: "top-center",
            });
        }
    }, [isSuccess, isError, error, data, navigate]);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched((prevState) => ({
            ...prevState,
            [name]: true,
        }));
    };

    return { handleFormChange, handleSignUp, touched, handleBlur, formData, isLoading }


}

export default useSignUp;
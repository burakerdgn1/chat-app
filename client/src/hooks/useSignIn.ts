import { useState } from "react";
import { useLoginMutation } from "../redux/api/authApi";
import { useDispatch } from "react-redux";
import validator from "validator";
import { setUser } from "../redux/slices/userSlice";
import { toast } from "react-toastify";

const useSignIn = () => {
    const [loginUser, { isLoading }] =
        useLoginMutation();
    const [formData, setFormData] = useState<{
        email: string;
        password: string;
    }>({
        email: "",
        password: "",
    });
    const dispatch = useDispatch();
    const handleSignIn = async (event: React.FormEvent) => {
        event.preventDefault();
        if (
            validator.isEmail(formData.email) &&
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
                formData.password
            )
        ) {
            try {
                const response = await loginUser(formData).unwrap();
                if (response.user && response.token) {
                    dispatch(setUser(response.user));
                    localStorage.setItem('user', JSON.stringify(response.user));
                    toast.success(response.message, {
                        position: "top-center",
                    });
                }
            } catch (err) {
                const errorMessage =
                    (err as any)?.data?.message || "An unexpected error occurred";
                toast.error(errorMessage, {
                    position: "top-center",
                });
            }
        } else {
            toast.error("Invalid email or password format.", {
                position: "top-center",
            });
        }
    };
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return { handleFormChange, handleSignIn, formData, isLoading }


}

export default useSignIn;
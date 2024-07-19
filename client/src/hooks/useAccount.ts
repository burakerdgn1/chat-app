import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useGetMeQuery, useUploadProfilePictureMutation } from "../redux/api/userApi";

export const useAccount = () => {
    const { data: user, isLoading } = useGetMeQuery();
    const [uploadProfilePicture] = useUploadProfilePictureMutation();

    const [userData, setUserData] = useState({
        fullName: "",
        userName: "",
        email: "",
        profilePicture: "",
    });

    const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null);

    useEffect(() => {
        if (user) {
            setUserData({ ...user });
        }
    }, [user]);

    const updateUserData = (newData: typeof userData) => {
        setUserData(newData);
    };

    const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserData({ ...userData, profilePicture: reader.result as string });
                // console.log(reader.result as string);
            };
            reader.readAsDataURL(file);
            setProfilePictureFile(file);
        }
    };

    const handleSaveClick = async () => {
        if (profilePictureFile) {
            const formData = new FormData();
            formData.append("profilePicture", profilePictureFile);
            try {
                await uploadProfilePicture(formData).unwrap();
                toast.success("Profile picture updated successfully!", {
                    position: "top-center",
                });
            } catch (err) {
                console.error("Failed to upload profile picture:", err);
                toast.error("Failed to update profile picture. Please try again.", {
                    position: "top-center",
                });
            }
        } else {
            toast.error("Please select a profile picture to upload.", {
                position: "top-center",
            });
        }
    };

    const handleCancelClick = () => {
        setProfilePictureFile(null);
        setUserData({
            ...userData,
            profilePicture: user ? user.profilePicture : "",
        });
    };

    return {
        userData,
        isLoading,
        handleProfilePictureChange,
        handleSaveClick,
        handleCancelClick,
        updateUserData,
        user
    };
};

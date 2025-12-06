import { useState } from "react";
import useUpdateUserProfile from "../../hooks/useUpdateUserProfile";

const EditProfileModal = ({ authUser }) => {
    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        bio: "",
        link: "",
        newPassword: "",
        currentPassword: "",
    });

    const { updateProfile, isUpdatingProfile } = useUpdateUserProfile();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const openModal = () => {
        // Reset form with latest authUser data every time modal opens
        setFormData({
            fullName: authUser?.fullName || "",
            username: authUser?.username || "",
            email: authUser?.email || "",
            bio: authUser?.bio || "",
            link: authUser?.link || "",
            newPassword: "",
            currentPassword: "",
        });

        document.getElementById("edit_profile_modal").showModal();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile(formData);
    };

    return (
        <>
            {/* Button to open modal */}
            <button
                className='btn btn-outline rounded-full btn-sm'
                onClick={openModal}
            >
                Edit profile
            </button>

            {/* Modal */}
            <dialog id='edit_profile_modal' className='modal'>
                <div className='modal-box border rounded-md border-gray-700 shadow-md'>
                    <h3 className='font-bold text-lg my-3'>Update Profile</h3>

                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        {/* Full Name & Username */}
                        <div className='flex flex-wrap gap-2'>
                            <input
                                type='text'
                                placeholder='Full Name'
                                className='flex-1 input border border-gray-700 rounded p-2 input-md'
                                value={formData.fullName}
                                name='fullName'
                                onChange={handleInputChange}
                            />
                            <input
                                type='text'
                                placeholder='Username'
                                className='flex-1 input border border-gray-700 rounded p-2 input-md'
                                value={formData.username}
                                name='username'
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Email & Bio */}
                        <div className='flex flex-wrap gap-2'>
                            <input
                                type='email'
                                placeholder='Email'
                                className='flex-1 input border border-gray-700 rounded p-2 input-md'
                                value={formData.email}
                                name='email'
                                onChange={handleInputChange}
                            />
                            <textarea
                                placeholder='Bio'
                                className='flex-1 textarea textarea-bordered border-gray-700 rounded resize-none h-24'
                                value={formData.bio}
                                name='bio'
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Passwords */}
                        <div className='flex flex-wrap gap-2'>
                            <input
                                type='password'
                                placeholder='Current Password (required to save changes)'
                                className='flex-1 input border border-gray-700 rounded p-2 input-md'
                                value={formData.currentPassword}
                                name='currentPassword'
                                onChange={handleInputChange}
                            />
                            <input
                                type='password'
                                placeholder='New Password (leave blank to keep current)'
                                className='flex-1 input border border-gray-700 rounded p-2 input-md'
                                value={formData.newPassword}
                                name='newPassword'
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Link */}
                        <input
                            type='text'
                            placeholder='Link (e.g. https://example.com)'
                            className='input border border-gray-700 rounded p-2 input-md'
                            value={formData.link}
                            name='link'
                            onChange={handleInputChange}
                        />

                        {/* Submit Button */}
                        <button
                            type='submit'
                            className='btn btn-primary rounded-full btn-sm text-white mt-2'
                            disabled={isUpdatingProfile}
                        >
                            {isUpdatingProfile ? "Updating..." : "Update Profile"}
                        </button>
                    </form>

                    {/* Close modal backdrop */}
                    <form method='dialog' className='modal-backdrop'>
                        <button>close</button>
                    </form>
                </div>
            </dialog>
        </>
    );
};

export default EditProfileModal;
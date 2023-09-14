'use client';
import { Form, Input } from 'antd';
import axios from 'axios';
import toast from 'react-hot-toast';
const Register = () => {
    const handleRegister = async (data: {
        email: string;
        password: string;
    }) => {
        const response = await axios.post('/api/register', data);
        toast.success(response.data.message);
    };

    return (
        <div className="min-h-screen  ">
            <button
                onClick={() => {
                    handleRegister({
                        email: 'lethanhhieu2711@gmail.com',
                        password: 'lethanhhieu2711@gmail.com',
                    });
                }}
            >
                Register
            </button>
        </div>
    );
};

export default Register;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../contexts/UserContext";

export default function useAuth() {
    const navigate = useNavigate();
    const [user] = useUser()
    useEffect(() => {
        if(!user) {
            navigate('/login')
        } else {
            if(user.role === 'student' )
                navigate('/student')
            else if(user.role === 'teacher')
                navigate('/teacher')
        }

    }, [user])
}
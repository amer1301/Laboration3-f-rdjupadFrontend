import { useAuth } from "../context/AuthContext";

const MyProfilePage = () => {
    const {user} = useAuth();

    return (
        <div>
            <h1>Hej {user ? user.firstname : ""}</h1>
        </div>
    )
}

export default MyProfilePage
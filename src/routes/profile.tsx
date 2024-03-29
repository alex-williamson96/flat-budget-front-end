import { useQuery } from "react-query";
import UserService from "../services/user-service";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../components/Login/LogoutButton";

export interface UserProfile {
  accountList?: any;
  activeBudget: any;
  budgetList: any;
  createdDate: Date;
  currency: string;
  currencyFormat: string;
  dateFormat: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  password?: string;
  updatedDate: string;
}

const Profile = () => {
  const { status, data } = useQuery({
    queryKey: "user",
    queryFn: UserService.getCurrentUser,
    staleTime: 300000,
  });

  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated &&
    user && (
      <div>
        <LogoutButton />
        <img src={user.picture} alt={user.nickname} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <div>
          {status === "loading" ? (
            "Loading..."
          ) : (
            <span>Profile works! {JSON.stringify(data)}</span>
          )}
        </div>
      </div>
    )
  );

  // return (
  //   <div>
  //     {status === "loading" ? (
  //       "Loading..."
  //     ) : (
  //       <span>
  //         Profile works! {status} {JSON.stringify(data)}
  //       </span>
  //     )}
  //   </div>
  // );
};

export default Profile;

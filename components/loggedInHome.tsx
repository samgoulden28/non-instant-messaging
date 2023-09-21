import { useUser } from "./userContext";

export const LoggedInHome = () => {
  const {
    user: { username, isAuthenticated },
  } = useUser();

  if (!isAuthenticated) return null;

  return (
    <div>
      <h4>Hello {username} </h4>
    </div>
  );
};

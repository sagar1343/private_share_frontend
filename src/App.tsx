import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import axios from "axios";

export const App = () => {
  const handleAuth = async (credentialResponse: CredentialResponse) => {
    const response = await axios.post(
      "http://localhost:8000/auth/google-login/",
      {
        token: credentialResponse.credential,
      }
    );
    console.log(response.data);
  };

  return (
    <div>
      <GoogleOAuthProvider clientId="1085027911555-pbbdr6onm4864g8353p0a0oabr9nlp39.apps.googleusercontent.com">
        <div className="w-64">
          <GoogleLogin
            onSuccess={handleAuth}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </GoogleOAuthProvider>
      <Button className="cursor-pointer">CLick</Button>
    </div>
  );
};

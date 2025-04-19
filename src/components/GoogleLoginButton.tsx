import { useAuthContext } from "@/context/AuthContext";
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";

export default function GoogleLoginButton() {
  const { login } = useAuthContext();

  return (
    <GoogleOAuthProvider clientId="1085027911555-pbbdr6onm4864g8353p0a0oabr9nlp39.apps.googleusercontent.com">
      <div className="w-64">
        <GoogleLogin
          onSuccess={(credentialResponse: CredentialResponse) => {
            login(credentialResponse);
          }}
          theme="filled_black"
          ux_mode="popup"
          text="continue_with"
        />
      </div>
    </GoogleOAuthProvider>
  );
}

import { useLoginMutation } from "@/features/auth/api/auth-api";
import { Path } from "@/common/routing/path";

export const Login = () => {
  const [login] = useLoginMutation();

  const loginHandler = () => {
    const redirectUri =
      import.meta.env.VITE_DOMAIN_ADDRESS + Path.OAuthRedirect;
    const url = `${import.meta.env.VITE_BASE_URL}/auth/oauth-redirect?callbackUrl=${redirectUri}`;

    window.open(url, "oauthPopup", "width=600,height=600");

    const recieveMessage = (event: MessageEvent) => {
      if (event.origin !== import.meta.env.VITE_DOMAIN_ADDRESS) return;

      const { code } = event.data;
      if (!code) return;

      window.removeEventListener("message", recieveMessage);
      login({ code, redirectUri, rememberMe: false });
    };

    window.addEventListener("message", recieveMessage);
  };

  return (
    <button type={"button"} onClick={loginHandler}>
      login
    </button>
  );
};

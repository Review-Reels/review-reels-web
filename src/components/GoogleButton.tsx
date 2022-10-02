import { useEffect, useRef, useState } from "react";
import { GoogleClientId } from "../constants/GoogleConstant";
interface Props {
  handleGoogleSignIn: (handleCredentialResponse: CredentialResponse) => void;
}

export default function GoogleButton({
  handleGoogleSignIn,
}: Props): JSX.Element {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.google || !divRef.current) {
      return;
    }

    try {
      window.google.accounts.id.initialize({
        client_id: GoogleClientId,
        callback: async (res: CredentialResponse) => {
          handleGoogleSignIn(res);
        },
      });
      window.google.accounts.id.renderButton(divRef.current, {
        type: "standard",
        theme: "outline",
        size: "large",
      });
    } catch (error) {
      console.log({ error });
    }
  }, [handleGoogleSignIn]);

  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (scriptLoaded) return undefined;

    const initializeGoogle = () => {
      console.log(window.google, scriptLoaded, window?.google?.accounts.id);
      if (!window.google || scriptLoaded) return;

      setScriptLoaded(true);
      window.google.accounts.id.initialize({
        client_id: GoogleClientId,
        callback: async (res: CredentialResponse) => {
          handleGoogleSignIn(res);
        },
      });
      window.google.accounts.id.prompt();
    };

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.onload = initializeGoogle;
    script.async = true;
    script.id = "google-client-script";
    document.querySelector("body")?.appendChild(script);

    return () => {
      window.google?.accounts.id.cancel();
      document.getElementById("google-client-script")?.remove();
    };
  }, [scriptLoaded, handleGoogleSignIn]);

  return <div ref={divRef} className={"g_id_signin"} />;
}

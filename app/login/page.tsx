import { getServerDictionary } from "@/lib/i18n/server";
import LoginPage from "./login-content";

export default function Login() {
  const { dict } = getServerDictionary();
  return <LoginPage dict={dict.login} />;
}

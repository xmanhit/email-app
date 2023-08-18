import {
  Form,
  redirect,
  useActionData,
  useLocation,
  useNavigation,
} from "react-router-dom";
import { useMemo, useState } from "react";
import { fakeAuthProvider } from "../../utils/auth";
import User from "../../utils/user";
import styles from "./login.module.css";
import connectLogoBlack from "../../assets/connect_logo_black.svg";

export async function loginAction({ request }) {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");

  const isLoginValid = User.isLoginValid({ email, password });
  // Validate our form inputs and return validation errors via useActionData()
  if (!isLoginValid) {
    return {
      error: "You must provide a email to log in",
    };
  }

  // Sign in and redirect to the proper destination if successful.
  try {
    await fakeAuthProvider.signin(email);
  } catch (error) {
    // Unused as of now but this is how you would handle invalid
    // email/password combinations - just like validating the inputs
    // above
    console.error(error);
    return {
      error: "Invalid login attempt",
    };
  }

  let redirectTo = formData.get("redirectTo");
  return redirect(redirectTo || "/main");
}

export async function loginLoader() {
  if (fakeAuthProvider.isAuthenticated) {
    return redirect("/main");
  }
  return null;
}

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("test@test");
  const allUserEmailOptions = useMemo(
    () => [
      { value: "", label: "------Choose an email" },
      ...User.getAllUsersEmail.map((email) => ({
        value: email,
        label: email,
      })),
    ],
    []
  );

  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let from = params.get("from") || "/main";

  let navigation = useNavigation();
  let isLoggingIn = navigation.formData?.get("email") != null;

  let actionData = useActionData();

  return (
    <div className={styles.container}>
      <Form className={styles.form} method="post" replace>
        <div className={styles.header}>
          <img className={styles.logo} src={connectLogoBlack} alt="logo" />
          <p className={styles.title}>Login to check your email!!</p>
        </div>
        <div className={styles.mb3}>
          <input type="hidden" name="redirectTo" value={from} />
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <select
            className={styles.input}
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          >
            {allUserEmailOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.mb3}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            className={`${styles.input} ${
              actionData?.error ? styles.borderRed500 : styles.borderGray900
            }`}
            id="password"
            name="password"
            type="password"
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {actionData?.error ? (
            <p className={styles.textRed500}>Wrong email or password !!</p>
          ) : null}
        </div>
        <button
          className={styles.btnLogin}
          type="submit"
          disabled={isLoggingIn}
        >
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
      </Form>
    </div>
  );
}

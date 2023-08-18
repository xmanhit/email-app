import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

const { Loading } = React.lazy(() => import("./pages/Loading"));

function App() {
  const router = createBrowserRouter([
    {
      id: "root",
      path: "/",

      async lazy() {
        let { fakeAuthProvider } = await import("./utils/auth");
        let { Layout } = await import("./components/Layout");
        let { RootErrorBoundary } = await import("./pages/Error");
        return {
          loader: () => ({ email: fakeAuthProvider.email }),
          Component: Layout,
          ErrorBoundary: RootErrorBoundary,
        };
      },
      children: [
        {
          index: true,
          async lazy() {
            return {
              loader: () => {
                return redirect("main");
              },
            };
          },
        },
        {
          path: "login",
          async lazy() {
            let { loginAction, loginLoader, LoginPage } = await import(
              "./pages/Login"
            );
            let { RootErrorBoundary } = await import("./pages/Error");

            return {
              action: loginAction,
              loader: loginLoader,
              Component: LoginPage,
              ErrorBoundary: RootErrorBoundary,
            };
          },
        },
        {
          path: "main",
          async lazy() {
            let { mainLoader, MainPage } = await import("./pages/Main");
            let { RootErrorBoundary } = await import("./pages/Error");

            return {
              loader: mainLoader,
              Component: MainPage,
              ErrorBoundary: RootErrorBoundary,
            };
          },
          children: [
            {
              index: true,
              loader: () => {
                return redirect("email");
              },
            },
            {
              path: "email",
              async lazy() {
                let { EmailPage } = await import("./pages/Email");
                return { Component: EmailPage };
              },
              children: [
                {
                  index: true,
                  async lazy() {
                    let { ChooseFolder } = await import(
                      "./components/ChooseFolder"
                    );
                    return { Component: ChooseFolder };
                  },
                },
                {
                  id: "folder",
                  path: ":folder",
                  async lazy() {
                    let { summaryMessageLoader, SummaryMessagePage } =
                      await import("./pages/SummaryMessage");
                    let { RootErrorBoundary } = await import("./pages/Error");

                    return {
                      loader: summaryMessageLoader,
                      Component: SummaryMessagePage,
                      ErrorBoundary: RootErrorBoundary,
                    };
                  },

                  children: [
                    {
                      index: true,
                      async lazy() {
                        let { ChooseEmail } = await import(
                          "./components/ChooseEmail"
                        );
                        return { Component: ChooseEmail };
                      },
                    },
                    {
                      id: "detail",
                      path: ":id",
                      async lazy() {
                        let { detailMessageLoader, DetailMessagePage } =
                          await import("./pages/DetailMessage");
                        let { RootErrorBoundary } = await import(
                          "./pages/Error"
                        );

                        return {
                          loader: detailMessageLoader,
                          Component: DetailMessagePage,
                          ErrorBoundary: RootErrorBoundary,
                        };
                      },
                    },
                  ],
                },
              ],
            },
            {
              path: "*",
              async lazy() {
                let { UnderConstruction } = await import(
                  "./pages/UnderContruction"
                );
                return { Component: UnderConstruction };
              },
            },
          ],
        },
      ],
    },
    {
      path: "/logout",
      async lazy() {
        let {
          fakeAuthProvider: { signout },
        } = await import("./utils/auth");
        return {
          action: async () => {
            await signout();
            return redirect("/");
          },
        };
      },
    },
    {
      path: "/error",
      async lazy() {
        let { RootErrorBoundary } = await import("./pages/Error");
        return { Component: RootErrorBoundary };
      },
    },
    {
      path: "/loading",
      async lazy() {
        let { Loading } = await import("./pages/Loading");
        return { Component: Loading };
      },
    },
    {
      path: "*",
      async lazy() {
        let { RootErrorBoundary } = await import("./pages/Error");
        return { Component: RootErrorBoundary };
      },
    },
  ]);

  return <RouterProvider router={router} fallbackElement={Loading} />;
}

export default App;

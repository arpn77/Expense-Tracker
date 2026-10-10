import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useAuth } from "../../context/AuthContext";
import { loginSchema } from "../../utils/validationSchemas";
import PasswordField from "../../components/PasswordField";
import axios from "axios";

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting, setStatus }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem(
        "username",
        JSON.stringify(response?.data?.data?.username)
      );
      setUser({
        username: response.data.data.username,
      });

      if (response.data.success) {
        localStorage.setItem("userToken", response.data.data.accessToken);
        navigate("/");
      } else {
        setStatus(response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setStatus("An error occurred during login");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full p-6 bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 px-6 py-4">
            <h1 className="text-xl font-semibold text-white">Welcome Back</h1>
          </div>

          {/* Form */}
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
          >
            {({ errors, touched, status, isSubmitting }) => (
              <Form className="p-6 space-y-6">
                {status && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                    {status}
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.email && touched.email ? "border-red-500" : ""
                      }`}
                    />
                    {errors.email && touched.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <PasswordField
                    name="password"
                    label="Password"
                    error={errors.password}
                    touched={touched.password}
                  />
                </div>

                <div className="flex flex-col space-y-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isSubmitting ? "Signing in..." : "Sign In"}
                  </button>

                  <p className="text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Create Account
                    </Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;

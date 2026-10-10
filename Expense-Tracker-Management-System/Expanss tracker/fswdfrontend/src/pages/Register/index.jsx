import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { registerSchema } from "../../utils/validationSchemas";
import PasswordField from "../../components/PasswordField";
import axios from "axios"; // Import Axios
import { useAuth } from "../../context/AuthContext"; // Import AuthContext

const Register = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState("");

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const registerData = {
        ...values,
        profilePic,
      };
  
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        registerData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.data.success) {
        localStorage.setItem("userData", JSON.stringify(registerData));
  
        setUser({
          username: registerData.username,
        });
  
        navigate("/login");
      } else {
        setStatus(response.data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setStatus("Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen w-full p-6 bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 px-6 py-4">
            <h1 className="text-xl font-semibold text-white">Create Account</h1>
          </div>

          {/* Form */}
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={registerSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, status, isSubmitting }) => (
              <Form className="p-6 space-y-6">
                {status && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                    {status}
                  </div>
                )}

                {/* Profile Picture */}
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto relative">
                    {profilePic ? (
                      <img
                        src={profilePic}
                        alt="Profile Preview"
                        className="w-full h-full rounded-full object-cover border-4 border-gray-200"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-200">
                        <span className="text-gray-500 text-4xl">?</span>
                      </div>
                    )}
                    <label
                      htmlFor="profile-pic"
                      className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </label>
                    <input
                      type="file"
                      id="profile-pic"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Form Fields */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <Field
                      type="text"
                      name="username"
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.username && touched.username
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    {errors.username && touched.username && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.username}
                      </p>
                    )}
                  </div>

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

                  <PasswordField
                    name="confirmPassword"
                    label="Confirm Password"
                    error={errors.confirmPassword}
                    touched={touched.confirmPassword}
                  />
                </div>

                <div className="flex flex-col space-y-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isSubmitting ? "Creating Account..." : "Create Account"}
                  </button>

                  <p className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Sign In
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

export default Register;

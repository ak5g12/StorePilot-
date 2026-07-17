import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginSuccess } from "../redux/slices/authSlice";
import { loginUser } from "../services/authService";

import { FaChartLine } from "react-icons/fa";
import { MdInventory2 } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import { HiMiniUsers } from "react-icons/hi2";

function Login() {

    const { register, handleSubmit } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data) => {

        try {

            const response = await loginUser(data);

            dispatch(loginSuccess(response));

            toast.success("Welcome to StorePilot");

            navigate("/dashboard");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Invalid Email or Password"
            );

        }

    };

    return (

        <div className="landing-page">

            <div className="hero-section">

                <div className="hero-content">

                    <span className="badge">
                        Smart Business Management Platform
                    </span>

                    <h1>
                        StorePilot
                    </h1>

                    <h2>
                        Inventory • Orders • Customers • Reports
                    </h2>

                    <p>
                        StorePilot is a modern MERN Stack based Inventory &
                        Business Management System that helps businesses manage
                        products, customers, orders, invoices and reports from
                        one secure dashboard.
                    </p>

                    <div className="feature-grid">

                        <div className="feature-card">

                            <MdInventory2 size={42} />

                            <h3>
                                Inventory
                            </h3>

                            <p>
                                Manage products and stock in real time.
                            </p>

                        </div>

                        <div className="feature-card">

                            <HiMiniUsers size={42} />

                            <h3>
                                Customers
                            </h3>

                            <p>
                                Maintain complete customer records easily.
                            </p>

                        </div>

                        <div className="feature-card">

                            <RiSecurePaymentFill size={42} />

                            <h3>
                                Billing
                            </h3>

                            <p>
                                Generate invoices and manage payments.
                            </p>

                        </div>

                        <div className="feature-card">

                            <FaChartLine size={42} />

                            <h3>
                                Reports
                            </h3>

                            <p>
                                Monitor revenue, sales and business growth.
                            </p>

                        </div>

                    </div>

                </div>

                <div className="login-panel">

                    <form
                        className="login-box"
                        onSubmit={handleSubmit(onSubmit)}
                    >

                        <h2>
                            Admin Login
                        </h2>

                        <p>
                            Sign in to access StorePilot Dashboard
                        </p>

                        <input
                            type="email"
                            placeholder="Email Address"
                            {...register("email", {
                                required: true
                            })}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            {...register("password", {
                                required: true
                            })}
                        />

                        <button type="submit">
                            Login
                        </button>

                        <div className="login-footer">
                            © 2026 StorePilot ERP
                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default Login;
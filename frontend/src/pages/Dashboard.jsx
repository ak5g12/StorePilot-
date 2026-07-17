import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FaCog } from "react-icons/fa";
import {
    FaHome,
    FaUsers,
    FaBoxOpen,
    FaShoppingCart,
    FaFileInvoiceDollar,
    FaChartBar,
    FaWarehouse,
    FaSignOutAlt
} from "react-icons/fa";

import { logout } from "../redux/slices/authSlice";
import { getDashboardData } from "../services/dashboardService";

function Dashboard() {

    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState({
        totalCustomers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        lowStockProducts: 0
    });

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                const data = await getDashboardData();

                setDashboard(data.dashboard);

            } catch (error) {

                console.log(error);

            }

        };

        loadDashboard();

    }, []);

    const handleLogout = () => {

        dispatch(logout());

        navigate("/");

    };

    return (

        <div className="dashboard">

            <aside className="sidebar">

                <h2>
                    🏪 StorePilot
                </h2>

                <nav>

                    <Link to="/dashboard">
                        <FaHome />
                        <span>Dashboard</span>
                    </Link>

                    <Link to="/customers">
                        <FaUsers />
                        <span>Customers</span>
                    </Link>

                    <Link to="/products">
                        <FaBoxOpen />
                        <span>Products</span>
                    </Link>

                    <Link to="/orders">
                        <FaShoppingCart />
                        <span>Orders</span>
                    </Link>

                    <Link to="/invoices">
                        <FaFileInvoiceDollar />
                        <span>Invoices</span>
                    </Link>

                    <Link to="/reports">
                        <FaChartBar />
                        <span>Reports</span>
                    </Link>
                    <Link to="/settings">
                        <FaCog />
                        <span>Settings</span>
                    </Link>

                </nav>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    <FaSignOutAlt />
                    Logout
                </button>

            </aside>

            <main className="dashboard-content">

                <div className="topbar">

                    <div>

                        <h1>
                            Welcome, {user?.name || "Admin"} 👋
                        </h1>

                        <p>
                            Manage your business from one powerful dashboard.
                        </p>

                    </div>

                </div>

                <section className="cards">

                    <div className="card">

                        <h3>
                            <FaUsers />
                            &nbsp; Customers
                        </h3>

                        <h1>
                            {dashboard.totalCustomers}
                        </h1>

                    </div>

                    <div className="card">

                        <h3>
                            <FaBoxOpen />
                            &nbsp; Products
                        </h3>

                        <h1>
                            {dashboard.totalProducts}
                        </h1>

                    </div>
                    <div className="card">

                        <h3>
                            <FaShoppingCart />
                            &nbsp; Orders
                        </h3>

                        <h1>
                            {dashboard.totalOrders}
                        </h1>

                    </div>

                    <div className="card">

                        <h3>
                            <FaFileInvoiceDollar />
                            &nbsp; Revenue
                        </h3>

                        <h1>
                            ₹{dashboard.totalRevenue}
                        </h1>

                    </div>

                    <div className="card">

                        <h3>
                            <FaWarehouse />
                            &nbsp; Low Stock
                        </h3>

                        <h1>
                            {dashboard.lowStockProducts}
                        </h1>

                    </div>

                </section>

                <section
                    style={{
                        marginTop: "40px"
                    }}
                >

                    <h2
                        style={{
                            marginBottom: "20px"
                        }}
                    >
                        Quick Actions
                    </h2>

                    <div className="cards">

                        <Link
                            to="/customers"
                            className="card"
                        >
                            <h3>
                                👥 Add Customer
                            </h3>

                            <p
                                style={{
                                    fontSize: "15px",
                                    marginTop: "12px",
                                    color: "#64748b"
                                }}
                            >
                                Create and manage customer records.
                            </p>

                        </Link>

                        <Link
                            to="/products"
                            className="card"
                        >
                            <h3>
                                📦 Add Product
                            </h3>

                            <p
                                style={{
                                    fontSize: "15px",
                                    marginTop: "12px",
                                    color: "#64748b"
                                }}
                            >
                                Add new inventory items with stock.
                            </p>

                        </Link>

                        <Link
                            to="/orders"
                            className="card"
                        >
                            <h3>
                                🛒 Create Order
                            </h3>

                            <p
                                style={{
                                    fontSize: "15px",
                                    marginTop: "12px",
                                    color: "#64748b"
                                }}
                            >
                                Generate customer orders instantly.
                            </p>

                        </Link>

                        <Link
                            to="/reports"
                            className="card"
                        >
                            <h3>
                                📊 View Reports
                            </h3>

                            <p
                                style={{
                                    fontSize: "15px",
                                    marginTop: "12px",
                                    color: "#64748b"
                                }}
                            >
                                Monitor revenue, sales and performance.
                            </p>

                        </Link>
        
                            

                    </div>

                </section>

            </main>

        </div>

    );

}

export default Dashboard;
import { useSelector } from "react-redux";

function Settings() {

    const { user } = useSelector((state) => state.auth);

    return (

        <div className="page">

            <h1 style={{marginBottom:"25px"}}>
                ⚙️ System Settings
            </h1>

            <div className="customer-list">

                <div className="customer-card">

                    <h3>Admin Information</h3>

                    <hr />

                    <p><strong>Name :</strong> {user?.name || "Administrator"}</p>

                    <p><strong>Email :</strong> {user?.email}</p>

                    <p><strong>Role :</strong> Admin</p>

                </div>

                <div className="customer-card">

                    <h3>StorePilot ERP</h3>

                    <hr />

                    <p><strong>Version :</strong> 1.0</p>

                    <p><strong>Database :</strong> MongoDB Atlas</p>

                    <p><strong>Backend :</strong> Node.js + Express</p>

                    <p><strong>Frontend :</strong> React + Redux</p>

                </div>

                <div className="customer-card">

                    <h3>Application Status</h3>

                    <hr />

                    <p>✅ Authentication Working</p>

                    <p>✅ Customer Module Active</p>

                    <p>✅ Product Module Active</p>

                    <p>✅ Order Module Active</p>

                    <p>✅ Invoice Module Active</p>

                    <p>✅ Reports Module Active</p>

                </div>

            </div>

        </div>

    );

}

export default Settings;
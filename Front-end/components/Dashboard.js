import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dash-parent">
      <div className="dash-child-1">
        <h3 className="dash-head">Menu</h3>
        <p className="dash-font">Dashboard</p>
        <p className="dash-font">Analytics</p>
        <p className="dash-font">Settings</p>
      </div>

      <div className="dash-child-2">
        <div className="dash-nav">
          <h3 className="dash-title">My DashBoard</h3>
        </div>

        <div className="dash-data">
          <div className="dash-card-parent">
            <span className="dash-card" onClick={() => navigate("/Body")}>
              Employee Management
            </span>
            <span className="dash-card">
              Attendance history
              <label className="load">Comming Soon</label>
            </span>
            <span className="dash-card">
              Leader-Board
              <label className="load">Comming Soon</label>
            </span>
            <span className="dash-card">
              Tracker
              <label className="load">Comming Soon</label>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

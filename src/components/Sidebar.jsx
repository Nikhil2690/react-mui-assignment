import { Drawer, List, ListItem, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/"); 
  };

  return (
    <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
      <List sx={{ width: 240, padding: "20px" }}>
        
        <ListItem button component={Link} to="/students">
        <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate("/students")}
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              fontWeight: "bold",
              borderRadius: "8px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)", 
              textTransform: "none", 
              padding: "10px",
              "&:hover": {
                backgroundColor: "#1565c0", 
            },
          }}
          >
            Students Page
          </Button>
        </ListItem>

          
        <ListItem>
          <Button variant="contained" color="secondary" fullWidth onClick={handleLogout}>
            Logout
          </Button>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;

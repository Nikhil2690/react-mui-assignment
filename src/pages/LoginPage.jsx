import {useState} from "react";
import { signInWithEmailAndPassword } from "firebase/auth"; // Firebase auth method
import { auth } from "../firebaseConfig";
import {useNavigate} from "react-router-dom";
import { TextField, Button, Card, CardContent, Typography, Box } from "@mui/material";


const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try{
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/students");
    }
    catch{
      setError("Invalid email or password");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Card sx={{ width: 400, padding: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" gutterBottom>
            Login
          </Typography>

          {error && (
            <Typography color="error" textAlign="center">
              {error}
            </Typography>
          )}

          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};


export default LoginPage

import { useState } from "react";
import { Button, TextField, Card, Typography, Box, Grid } from "@mui/material";
import axios from "axios";

function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignin = async () => {
        try {
            const res = await axios.post("http://localhost:3000/admin/login", {
                username: email,
                password: password,
            }, {
                headers: { "Content-type": "application/json" }
            });
            localStorage.setItem("token", res.data.token);
            window.location = "/";
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: "100vh", backgroundColor: "#f4f4f4" }}>
            <Grid item xs={11} sm={8} md={5} lg={4}>
                <Card variant="outlined" sx={{ p: 4, boxShadow: 3, borderRadius: 2, backgroundColor: "#fff" }}>
                    <Typography variant="h5" textAlign="center" fontWeight="bold" mb={2}>
                        Welcome to RASA
                    </Typography>
                    <Typography variant="body1" textAlign="center" color="text.secondary" mb={3}>
                        Sign in below to continue
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField 
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField 
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button 
                            variant="contained" 
                            color="primary" 
                            size="large"
                            sx={{ mt: 2, textTransform: "none", fontWeight: "bold" }}
                            onClick={handleSignin}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Card>
            </Grid>
        </Grid>
    );
}

export default Signin;

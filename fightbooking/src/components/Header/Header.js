import React, { useState, useEffect } from "react";
import "./Header.css";
import {
  Avatar, Menu, MenuItem, Dialog, DialogTitle, DialogContent, TextField,
  Button, DialogActions, IconButton, InputAdornment, Divider
} from "@mui/material";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PaidIcon from '@mui/icons-material/Paid';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import logoWhite from "../../assets/images/traveloka-official-logo-resmi-white-new.webp";
import logoBlack from "../../assets/images/traveloka_logo.png";
import flag from "../../assets/images/Flag_of_Vietnam.svg.webp";
import chevron from "../../assets/icon/chevron-down.svg";
import chevronmore from "../../assets/icon/chevron-compact-down.svg";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [usersData, setUsersData] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch("/data/contactInfo.json") // Đường dẫn đúng trong thư mục public
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data); // Debug
        setUsersData(data);
      })
      .catch((error) => console.error("Error loading users data:", error));
  }, []);
  

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    
  }, []);
  



const handleLogin = () => {
  const { email, password } = usersData.contactInfo;

  if (email === loginData.email && password === loginData.password) {
    setUser({
      email,
      firstName: usersData.contactInfo.firstName,
      lastName: usersData.contactInfo.lastName,
      phone: usersData.contactInfo.phone,
      avatar: usersData.contactInfo.avatar,
      points: usersData.contactInfo.points,
    });
    setOpenLogin(false);
    setError(""); // Reset lỗi nếu đăng nhập thành công
  } else {
    setError("Sai email hoặc mật khẩu!");
  }
};

  
  

  const handleGoogleLogin = (credentialResponse) => {
    console.log("Google Login Success:", credentialResponse);
    setUser({
      email: "googleuser@example.com",
      firstName: "Google",
      lastName: "User",
      avatar: "https://mui.com/static/images/avatar/1.jpg",
      points: 100,
    });
    setOpenLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
    setAnchorEl(null);
  };
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
     <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-top">
        <div className="logo">
          <img src={isScrolled ? logoBlack : logoWhite} alt="Logo" />
        </div>

        <div className="header-right">
          <div className="user-actions">
            <div className="language-currency">
              <img src={flag} alt="VN Flag" />
              <span>VI | VND <img src={chevron} alt="chevron" className="chevron-icon" /></span>
            </div>
            <div className="event-badge">🎉 Birthday Sale</div>
            <div className="event-badge">Hỗ Trợ <img src={chevronmore} alt="chevronmore" className="chevronmore" /></div>
            <div className="event-badge">Hợp Tác Với Chúng Tôi</div>
            <div className="event-badge">Đặt chỗ của tôi</div>

            {user ? (
              <>
                <div className="user-profile" onClick={handleMenuClick}>
                  <Avatar alt={user.lastName} src={user.avatar} />
                  <span className="user-name">{user.firstName} {user.lastName}</span>
                  <p>|</p>
                  <PaidIcon style={{ color: "gold", fontSize: "18px" }} /> {user.points} Điểm
                </div>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                  PaperProps={{ style: { width: anchorEl ? anchorEl.getBoundingClientRect().width : "auto" } }}
                  disableScrollLock
                >
                  <MenuItem onClick={() => alert("Trang Thông Tin Khách")}><PermIdentityIcon style={{ paddingRight: "20px" }} />  Thông Tin Khách Hàng </MenuItem>
                  <MenuItem onClick={() => alert("Trang Lịch Sử Mua Vé")}><HistoryIcon style={{ paddingRight: "20px" }} />  Lịch Sử Mua Vé </MenuItem>
                  <MenuItem onClick={handleLogout}><LogoutIcon style={{ paddingRight: "20px" }}/>Đăng xuất</MenuItem>
                </Menu>
              </>
            ) : (
              <>
              <button className="login" onClick={() => setOpenLogin(true)}>Đăng Nhập</button>
              <button className="register" onClick={() => setOpenRegister(true)}>Đăng ký</button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="nav-container">
        <nav className="nav-links">
          <ul>
            <li><a href="/hotels">Khách sạn</a></li>
            <li><a href="/flights">Vé máy bay</a></li>
            <li><a href="/bus-tickets">Vé xe khách</a></li>
            <li><a href="/airport-transfer">Đưa đón sân bay</a></li>
            <li><a href="/car-rental">Cho thuê xe</a></li>
            <li><a href="/activities">Hoạt động & Vui chơi</a></li>
            <li><a href="/more">More <img src={chevronmore} alt="more" /></a></li>
          </ul>
        </nav>
      </div>

        {/* Hộp thoại Đăng Nhập */}
        <Dialog open={openLogin} onClose={() => setOpenLogin(false)} maxWidth="xs" fullWidth disableScrollLock>

          <DialogTitle>Đăng Nhập</DialogTitle>
          <DialogContent>
          <TextField
            label="Email"
            fullWidth
            margin="dense"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment> }}
            error={Boolean(error)}
          />

         <TextField
           label="Mật khẩu"
           type={showPassword ? "text" : "password"}
           fullWidth
           margin="dense"
           value={loginData.password}
           onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          InputProps={{
          startAdornment: <InputAdornment position="start"><LockIcon /></InputAdornment>,
          endAdornment: (
             <InputAdornment position="end">
             <IconButton onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
            </InputAdornment>
            ),
            }}
             error={Boolean(error)}
             helperText={error}
            />
            <Button fullWidth variant="contained" color="primary" onClick={handleLogin} sx={{ mt: 2 }}>
              Đăng Nhập
            </Button>
            <Divider sx={{ my: 2 }}>Hoặc</Divider>
            <GoogleLogin onSuccess={handleGoogleLogin} onError={() => console.log("Login Failed")} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenLogin(false)}>Hủy</Button>
          </DialogActions>
        </Dialog>

        {/* Hộp thoại Đăng Ký */}
        <Dialog open={openRegister} onClose={() => setOpenRegister(false)} maxWidth="xs" fullWidth disableScrollLock>
          <DialogTitle>Đăng Ký</DialogTitle>
          <DialogContent>
            <TextField label="Họ và Tên" fullWidth margin="dense" />
            <TextField label="Email" fullWidth margin="dense" />
            <TextField label="Mật khẩu" type="password" fullWidth margin="dense" />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenRegister(false)}>Hủy</Button>
            <Button variant="contained" color="primary">Đăng Ký</Button>
          </DialogActions>
        </Dialog>
      </header>
    </GoogleOAuthProvider>
  );
};

export default Header;

import React, { useState, useEffect } from "react";
import "./Header.css";
import { Avatar, Menu, MenuItem } from "@mui/material";
import PaidIcon from '@mui/icons-material/Paid';
import logoWhite from "../../assets/images/traveloka-official-logo-resmi-white-new.webp";
import logoBlack from "../../assets/images/traveloka_logo.png";
import flag from "../../assets/images/Flag_of_Vietnam.svg.webp";
import chevron from "../../assets/icon/chevron-down.svg";
import chevronmore from "../../assets/icon/chevron-compact-down.svg";
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null); // null: chưa đăng nhập, object: đã đăng nhập
  const [anchorEl, setAnchorEl] = useState(null);

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
    setUser({
      name: "Nguyễn Trần Phúc Thịnh",
      avatar: "https://mui.com/static/images/avatar/1.jpg",
      points: 100,
    });
  };

  const handleLogout = () => {
    setUser(null);
    setAnchorEl(null);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
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
                  <Avatar alt={user.name} src={user.avatar} />
                  <span className="user-name">{user.name}</span>
                  <p>|</p>
                  <PaidIcon style={{ color: "gold", fontSize: "18px" }} /> {user.points} Điểm
                </div>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                  PaperProps={{
                    style: {width: anchorEl ? anchorEl.getBoundingClientRect().width : "auto",},
                    }}
                >
                  <MenuItem onClick={() => alert("Trang Thông Tin Khách")}><PermIdentityIcon style={{ paddingRight: "20px" }} />  Thông Tin Khách Hàng </MenuItem>
                  <MenuItem onClick={() => alert("Trang Lịch Sử Mua Vé")}><HistoryIcon style={{ paddingRight: "20px" }} />  Lịch Sử Mua Vé </MenuItem>
                  <MenuItem onClick={handleLogout}><LogoutIcon style={{ paddingRight: "20px" }}/>Đăng xuất</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <button className="login" onClick={handleLogin}>Đăng Nhập</button>
                <button className="register">Đăng ký</button>
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
    </header>
  );
};

export default Header;

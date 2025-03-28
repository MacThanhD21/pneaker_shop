import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        {/* Company Info */}
        <CompanyInfo>
          <Logo>PSneaker</Logo>
          <Description>
            Hệ thống bán lẻ giày thể thao chính hãng, 
            phân phối các thương hiệu lớn tại PTIT
          </Description>

          <Contact>
            <h3>HỆ THỐNG CỬA HÀNG</h3>
            <p>
              <strong>Cơ sở 1:</strong> Km10, Đường Nguyễn Trãi, Q. Hà Đông, Hà Nội
            </p>
            <p>Hotline: 0786665444</p>

            <p>
              <strong>Cơ sở 2:</strong> 122 Hoàng Quốc Việt, Q. Cầu Giấy, Hà Nội
            </p>
            <p>Hotline: 02.3351.2252</p>

            <p>
              <strong>Email:</strong>{" "}
              <a href="tuyensinh@ptit.edu.vn">
                ptit@edu.vn
              </a>
            </p>
          </Contact>
        </CompanyInfo>

        {/* Footer Links */}
        <FooterLinks>
          <h3>Về chúng tôi</h3>
          <ul>
            <li>
              <Link to="/about">Giới Thiệu</Link>
            </li>
            <li>
              <Link to="/careers">Tuyển Dụng</Link>
            </li>
            <li>
              <Link to="/services">Dịch Vụ Spa, Sửa Giày</Link>
            </li>
            <li>
              <Link to="/news">Tin Tức - Sự Kiện</Link>
            </li>
          </ul>
        </FooterLinks>

        <CustomerSupport>
          <h3>Hỗ trợ khách hàng</h3>
          <ul>
            <li>
              <Link to="/help">Hướng dẫn mua hàng</Link>
            </li>
            <li>
              <Link to="/return-policy">Chính sách đổi trả và bảo hành</Link>
            </li>
            <li>
              <Link to="/payment-policy">Chính Sách Thanh Toán</Link>
            </li>
            <li>
              <Link to="/terms">Điều khoản trang web</Link>
            </li>
            <li>
              <Link to="/privacy-policy">
                Chính sách bảo vệ thông tin cá nhân
              </Link>
            </li>
            <li>
              <Link to="/shipping">Vận chuyển và giao hàng</Link>
            </li>
          </ul>
        </CustomerSupport>
      </FooterContent>

      {/* Footer Bottom */}
      <FooterBottom>
        <p>© Bản quyền thuộc về Psneaker Shop</p>
      </FooterBottom>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  background-color: rgb(255, 245, 245);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 10); /* Tạo hiệu ứng đổ bóng nhẹ */
  padding-top: 20px;
`;


const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 3rem;
  ${mobile({ flexDirection: "column", alignItems: "center", padding: "1rem" })}
`;

const CompanyInfo = styled.div`
  flex: 2;
  padding-right: 2rem;
  ${mobile({ flex: "1", textAlign: "center" })}
`;

const Logo = styled.h2`
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 16px;
  margin: 1rem 0;
`;

const Contact = styled.div`
  margin-top: 1rem;
  h3 {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
`;

const FooterLinks = styled.div`
  flex: 1;
  h3 {
    font-weight: bold;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul li {
    margin: 0.5rem 0;
  }
`;

const CustomerSupport = styled.div`
  flex: 1;
  h3 {
    font-weight: bold;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul li {
    margin: 0.5rem 0;
  }
`;

const SocialMedia = styled.div`
  flex: 1;
  text-align: center;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const Icon = styled.a`
  font-size: 24px;
  margin: 0 10px;
  color: #333;
  transition: color 0.3s;
  &:hover {
    color: #0073e6;
  }
`;

const FooterBottom = styled.div`
  background-color: #222;
  color: white;
  text-align: center;
  padding: 1rem 0;
  font-size: 14px;
  a {
    color: white;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

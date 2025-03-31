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
  background: #f8f9fa;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  padding-top: 3rem;
  color: #2c3e50;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  gap: 4rem;
  padding: 0 3rem 3rem;
  
  ${mobile({ 
    flexDirection: "column", 
    alignItems: "flex-start", 
    padding: "1rem",
    gap: "2rem"
  })}
`;

const CompanyInfo = styled.div`
  flex: 1;
  max-width: 400px;
  
  ${mobile({ 
    maxWidth: "100%",
    marginBottom: "2rem" 
  })}
`;

const Logo = styled.h2`
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

const Description = styled.p`
  font-size: 1rem;
  margin: 1rem 0;
  color: #34495e;
  line-height: 1.6;
`;

const Contact = styled.div`
  margin-top: 2rem;
  
  h3 {
    font-weight: 600;
    margin-bottom: 1rem;
    color: #2c3e50;
    font-size: 1.2rem;
  }
  
  p {
    margin: 0.5rem 0;
    color: #34495e;
  }
  
  a {
    color: #3498db;
    text-decoration: none;
    transition: all 0.3s ease;
    &:hover {
      color: #2980b9;
      text-decoration: underline;
    }
  }
`;

const FooterLinks = styled.div`
  flex: 1;
  
  h3 {
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  ul li {
    margin: 0.8rem 0;
    
    a {
      color: #34495e;
      text-decoration: none;
      transition: all 0.3s ease;
      font-size: 1rem;
      
      &:hover {
        color: #3498db;
        text-decoration: underline;
      }
    }
  }
`;

const CustomerSupport = styled(FooterLinks)`
  flex: 1;
`;

const FooterBottom = styled.div`
  background: #2c3e50;
  color: #fff;
  text-align: center;
  padding: 1.5rem 0;
  font-size: 0.9rem;
  
  a {
    color: #fff;
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
      color: #3498db;
      text-decoration: underline;
    }
  }
`;

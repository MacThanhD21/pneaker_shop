
import styled from "styled-components";

import { Pagination } from '@mui/material';
// Styled Components
export const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f3f4f6;
`;

export const Sidebar = styled.div`
  display: ${props => props.open ? "block" : "none"};
  flex-direction: column;
  width: 16rem;
  background-color: #1f2937;
  color: white;

  @media (min-width: 768px) {
    display: ${props => props.open ? "block" : "none"};
  }
`;

export const SidebarHeader = styled.div`
  padding: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
  border-bottom: 1px solid #374151;
`;

export const SidebarNav = styled.nav`
  flex: 1;  
  padding-top: 1rem;
`;

export const NavButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1.5rem;
  text-align: left;
  background-color: ${props => props.active ? "#374151" : "transparent"};
  border: none;
  &:hover {
    background-color: #374151;
  }
`;

export const NavIconWrapper = styled.span`
  margin-right: 0.75rem;
  color: white;
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

export const Header = styled.header`
  background-color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

export const MenuButton = styled.button`
  color: #4b5563;
  &:hover {
    color: #111827;
  }
`;

export const MobileTitle = styled.div`
  flex: 1;
  text-align: center;
  font-weight: bold;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const NotificationButton = styled.button`
  color: #4b5563;
  position: relative;
  
  &:hover {
    color: #111827;
  }
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  width: 0.5rem;
  height: 0.5rem;
  background-color: #ef4444;
  border-radius: 9999px;
`;

export const UserProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

export const UserAvatar = styled.div`
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  background-color: #3b82f6;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

export const UserName = styled.span`
  display: none;
  color: #374151;
  
  @media (min-width: 768px) {
    display: block;
  }
`;

export const ChevronIcon = styled.span`
  display: none;
  color: #6b7280;
  
  @media (min-width: 768px) {
    display: block;
  }
`;

export const MobileMenu = styled.div`
  display: ${props => props.open ? "block" : "none"};
  background-color: #1f2937;
  color: white;
  
  @media (min-width: 768px) {
    display: none;
  }
`;

export const MainContentArea = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
`;

export const WelcomeContainer = styled.div`
  text-align: center;
  padding: 3rem 0;
`;

export const WelcomeTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  color: #1f2937;
`;

export const WelcomeText = styled.p`
  margin-top: 0.5rem;
  color: #4b5563;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const SectionTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const ActionButton = styled.button`
  background-color: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  
  &:hover {
    background-color: #1d4ed8;
  }
`;

export const TableContainer = styled.div`
  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
`;

export const TableHead = styled.thead`
  background-color: #f9fafb;
`;

export const TableHeaderCell = styled.th`
  padding: 0.75rem 1.5rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const TableBody = styled.tbody`
  background-color: white;
  
  & > tr {
    border-top: 1px solid #e5e7eb;
    
    &:hover {
      background-color: #f9fafb;
    }
  }
`;

export const TableCell = styled.td`
  padding: 1rem 1.5rem;
  white-space: nowrap;
  font-size: 0.875rem;
  color: ${props => props.highlight ? "#111827" : "#6b7280"};
  font-weight: ${props => props.highlight ? "500" : "normal"};
`;

export const StatusBadge = styled.span`
  display: inline-flex;
  padding: 0 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.25rem;
  border-radius: 9999px;
  background-color: ${props => 
    props.status === "Completed" ? "#d1fae5" : 
    props.status === "Pending" ? "#fef3c7" : 
    "#dbeafe"};
  color: ${props => 
    props.status === "Completed" ? "#065f46" : 
    props.status === "Pending" ? "#92400e" : 
    "#1e40af"};
`;

export const ActionLink = styled.button`
  color: ${props => props.color || "#2563eb"};
  
  &:hover {
    color: ${props => props.hoverColor || "#1e40af"};
  }
  
  & + & {
    margin-left: 0.5rem;
  }
`;
export const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
`;

export const Dialog = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
  width: 90%;
  max-width: 800px; // Increased from default
  max-height: 85vh; // Limit height to 85% of viewport height
  margin: 2rem;
  display: flex;
  flex-direction: column;
  overflow: hidden; // Prevent content from spilling
`;

export const DialogContent = styled.div`
  padding: 1.5rem;
  overflow-y: auto; // Makes content scrollable if too long
  flex: 1;
  min-height: 0; // Important for flex child
`;

export const DialogTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

export const DialogActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  background: white; // Ensure buttons stay visible
`;

export const PaginationMUI = ({ numOfPages, page, onChange }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <Pagination
        count={numOfPages}
        page={page}
        onChange={(_, value) => onChange(value)}
        color="primary"
        shape="rounded"
      />
    </div>
  );
};
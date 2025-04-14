import { useState } from "react";
import { User, Package, ShoppingCart, ChevronDown, Bell, Menu, X } from "lucide-react";
import EditUserPage from "./EditUsersPage";
import { AppContainer, Sidebar, SidebarHeader, SidebarNav, NavButton, NavIconWrapperl,
    Header, HeaderContainer, MenuButton, MobileTitle, HeaderActions, NotificationButton,
    NotificationBadge, UserProfileContainer, UserAvatar, UserName, ChevronIcon, MobileMenu,
    MainContent, MainContentArea, WelcomeContainer, WelcomeTitle, WelcomeText, SectionHeader,
    SectionTitle, ActionButton, TableContainer, Table, TableHead, TableBody, TableRow,
    TableCell, TableHeaderCell, StatusBadge, ActionLink, NavIconWrapper,
 } from "./Components";
import EditProductPage from "./EditProductsPage";
import OrderDetailPage from "./EditOrderPage";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navItems = [
    { id: "users", icon: <User size={20} />, label: "Users" },
    { id: "products", icon: <Package size={20} />, label: "Products" },
    { id: "orders", icon: <ShoppingCart size={20} />, label: "Order History" }
  ];
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  return (
    <AppContainer>
      {/* Sidebar - Desktop */}
      <Sidebar open = {sidebarCollapsed}>
        <SidebarHeader >
          Admin Panel
        </SidebarHeader>
        <SidebarNav>
          {navItems.map((item) => (
            <NavButton
              key={item.id}
              active={activeSection === item.id}
              onClick={() => setActiveSection(item.id)}
            >
              <NavIconWrapper>{item.icon}</NavIconWrapper>
              <span>{item.label}</span>
            </NavButton>
          ))}
        </SidebarNav>
      </Sidebar>
      
      {/* Main Content */}
      <MainContent>
        {/* Top Navigation Bar */}
        <Header>
          <HeaderContainer>
            <div className="flex items-center gap-4">
              <MenuButton onClick={() => window.innerWidth >= 768 ? toggleSidebar() : toggleMobileMenu()}>
                {sidebarCollapsed ? <X size={24} /> : <Menu size={24} />}
              </MenuButton>
            </div>
            
            <MobileTitle>
              Admin Panel
            </MobileTitle>
            
            <HeaderActions>
              
              <UserProfileContainer>
                <UserAvatar>
                  A
                </UserAvatar>
                <UserName>Admin</UserName>
                <ChevronIcon>
                  <ChevronDown size={16} />
                </ChevronIcon>
              </UserProfileContainer>
            </HeaderActions>
          </HeaderContainer>
        </Header>
        
        {/* Mobile Navigation Menu */}
        <MobileMenu open={mobileMenuOpen}>
          {navItems.map((item) => (
            <NavButton
              key={item.id}
              active={activeSection === item.id}
              onClick={() => {
                setActiveSection(item.id);
                setMobileMenuOpen(false);
              }}
            >
              <NavIconWrapper>{item.icon}</NavIconWrapper>
              <span>{item.label}</span>
            </NavButton>
          ))}
        </MobileMenu>
        
        {/* Main Content Area */}
        <MainContentArea>
          {activeSection === "dashboard" && (
            <WelcomeContainer>
              <WelcomeTitle>Welcome to Admin Dashboard</WelcomeTitle>
              <WelcomeText>Select an option from the sidebar to manage your data</WelcomeText>
            </WelcomeContainer>
          )}
          
          {activeSection === "users" && (
            <EditUserPage></EditUserPage>
          )}
          
          {activeSection === "products" && (
            <EditProductPage></EditProductPage>
          )}
          
          {activeSection === "orders" && (
            <OrderDetailPage></OrderDetailPage>
          )}
        </MainContentArea>
      </MainContent>
    </AppContainer>
  );
}
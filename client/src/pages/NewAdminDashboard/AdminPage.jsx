import { useState } from "react";
import { 
  User, Package, ShoppingCart, ChevronDown, Bell, Menu, X,
  Home, Tag, FileText, Image, BarChart2, Settings, LogOut, ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import EditUserPage from "./EditUsersPage";
import EditProductPage from "./EditProductsPage";
import OrderDetailPage from "./EditOrderPage";
import { 
  AppContainer, Sidebar, SidebarHeader, SidebarNav, NavButton, 
  Header, HeaderContainer, MenuButton, MobileTitle, HeaderActions, 
  NotificationButton, NotificationBadge, UserProfileContainer, 
  UserAvatar, UserName, ChevronIcon, MobileMenu, MainContent, 
  MainContentArea, WelcomeContainer, WelcomeTitle, WelcomeText, 
  SectionHeader, SectionTitle, ActionButton, TableContainer, 
  Table, TableHead, TableBody, TableRow, TableCell, 
  TableHeaderCell, StatusBadge, ActionLink, NavIconWrapper,
  StatsContainer, StatCard, StatIcon, StatValue, StatLabel,
  ChartContainer, RecentActivity, ActivityItem
} from "./Components";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navItems = [
    { id: "dashboard", icon: <Home size={20} />, label: "Dashboard" },
    { id: "products", icon: <Package size={20} />, label: "Sản phẩm" },
    { id: "orders", icon: <ShoppingCart size={20} />, label: "Đơn hàng" },
    { id: "users", icon: <User size={20} />, label: "Người dùng" },
    { id: "promotions", icon: <Tag size={20} />, label: "Khuyến mãi" },
    { id: "blog", icon: <FileText size={20} />, label: "Bài viết" },
    { id: "theme", icon: <Image size={20} />, label: "Giao diện" },
    { id: "reports", icon: <BarChart2 size={20} />, label: "Báo cáo" },
    { id: "settings", icon: <Settings size={20} />, label: "Cài đặt" }
  ];
  
  const stats = [
    { value: "25.000.000đ", label: "Doanh thu", icon: <Home size={24} />, color: "bg-green-100 text-green-600" },
    { value: "156", label: "Đơn hàng", icon: <ShoppingCart size={24} />, color: "bg-blue-100 text-blue-600" },
    { value: "1.234", label: "Người dùng", icon: <User size={24} />, color: "bg-purple-100 text-purple-600" },
    { value: "3.2%", label: "Tỷ lệ chuyển đổi", icon: <BarChart2 size={24} />, color: "bg-orange-100 text-orange-600" }
  ];

  const recentActivities = [
    { id: 1, type: "order", title: "Đơn hàng mới #1234", user: "Nguyễn Văn A", amount: "2.500.000đ", time: "2 giờ trước" },
    { id: 2, type: "user", title: "Người dùng mới", user: "Trần Thị B", time: "3 giờ trước" },
    { id: 3, type: "product", title: "Sản phẩm mới", name: "Nike Air Max 270", time: "5 giờ trước" }
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
      <Sidebar open={sidebarCollapsed}>
        <SidebarHeader>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">Pneaker Shop</span>
            <button onClick={toggleSidebar} className="p-2 hover:bg-gray-100 rounded-lg">
              {sidebarCollapsed ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </SidebarHeader>
        <SidebarNav>
          {navItems.map((item) => (
            <NavButton
              key={item.id}
              active={activeSection === item.id}
              onClick={() => setActiveSection(item.id)}
            >
              <NavIconWrapper>{item.icon}</NavIconWrapper>
              {!sidebarCollapsed && <span>{item.label}</span>}
            </NavButton>
          ))}
          
          {/* Add Return to User Page Button */}
          <NavButton
            onClick={() => navigate("/")}
            className="mt-auto"
          >
            <NavIconWrapper>
              <ArrowLeft size={20} />
            </NavIconWrapper>
            {!sidebarCollapsed && <span>Quay về trang chủ </span>}
          </NavButton>
        </SidebarNav>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-100">
            <UserAvatar>A</UserAvatar>
            {!sidebarCollapsed && (
              <div>
                <UserName>Admin</UserName>
                <p className="text-sm text-gray-500">Super Admin</p>
              </div>
            )}
          </div>
        </div>
      </Sidebar>
      
      {/* Main Content */}
      <MainContent sidebarOpen={sidebarCollapsed}>
        {/* Top Navigation Bar */}
        <Header>
          <HeaderContainer>
            <div className="flex items-center gap-4">
              <MenuButton onClick={toggleMobileMenu}>
                <Menu size={24} />
              </MenuButton>
              <MobileTitle>Pneaker Shop</MobileTitle>
            </div>
            
            <HeaderActions>
              <NotificationButton>
                <Bell size={20} />
                <NotificationBadge>3</NotificationBadge>
              </NotificationButton>
              
              <UserProfileContainer>
                <UserAvatar>A</UserAvatar>
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
            <div className="space-y-6">
              <WelcomeContainer>
                <WelcomeTitle>Chào mừng đến với Admin Dashboard</WelcomeTitle>
                <WelcomeText>Quản lý và theo dõi hoạt động của cửa hàng</WelcomeText>
              </WelcomeContainer>

              <StatsContainer>
                {stats.map((stat, index) => (
                  <StatCard key={index}>
                    <StatIcon className={stat.color}>
                      {stat.icon}
                    </StatIcon>
                    <div>
                      <StatValue>{stat.value}</StatValue>
                      <StatLabel>{stat.label}</StatLabel>
                    </div>
                  </StatCard>
                ))}
              </StatsContainer>

              <ChartContainer>
                {/* Add your chart component here */}
              </ChartContainer>

              <RecentActivity>
                <SectionHeader>
                  <SectionTitle>Hoạt động gần đây</SectionTitle>
                </SectionHeader>
                {recentActivities.map((activity) => (
                  <ActivityItem key={activity.id}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full"></div>
                      <div>
                        <p className="font-medium text-gray-800">{activity.title}</p>
                        <p className="text-sm text-gray-500">
                          {activity.user && `Người dùng: ${activity.user}`}
                          {activity.amount && ` - Tổng: ${activity.amount}`}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </ActivityItem>
                ))}
              </RecentActivity>
            </div>
          )}
          
          {activeSection === "users" && <EditUserPage />}
          {activeSection === "products" && <EditProductPage />}
          {activeSection === "orders" && <OrderDetailPage />}
          {/* Add other sections here */}
        </MainContentArea>
      </MainContent>
    </AppContainer>
  );
}
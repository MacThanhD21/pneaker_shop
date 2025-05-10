import { useState } from "react";
import { 
  User, Package, ShoppingCart, ChevronDown, Bell, Menu, X,
  Home, Tag, FileText, Image, BarChart2, Settings, LogOut, ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../../graphql/Queries/userQueries';
import { GET_ALL_ORDERS } from '../../graphql/Queries/orderQueries';
import EditUserPage from "./EditUsersPage";
import EditProductPage from "./EditProductsPage";
import OrderDetailPage from "./EditOrderPage";
import Loading from '../../assets/mui/Loading';
import MuiError from '../../assets/mui/Alert';
import { formatVNDPrice } from '../../utils/formatPrice';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
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
import EditBannerPage from "./EditBannerPage";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const { loading: usersLoading, error: usersError, data: usersData } = useQuery(GET_ALL_USERS);
  const { loading: ordersLoading, error: ordersError, data: ordersData } = useQuery(GET_ALL_ORDERS);

  const navItems = [
    { id: "dashboard", icon: <Home size={20} />, label: "Dashboard" },
    { id: "products", icon: <Package size={20} />, label: "Sản phẩm" },
    { id: "orders", icon: <ShoppingCart size={20} />, label: "Đơn hàng" },
    { id: "users", icon: <User size={20} />, label: "Người dùng" },
    { id: "promotions", icon: <Tag size={20} />, label: "Banner quảng cáo" },
  ];
  
  // Calculate total revenue from orders
  const totalRevenue = ordersData?.getAllOrders?.reduce((total, order) => {
    const orderTotal = order.orderProducts.reduce((sum, product) => sum + product.productPrice, 0);
    return total + orderTotal;
  }, 0) || 0;

  const stats = [
    { value: formatVNDPrice(totalRevenue), label: "Doanh thu", icon: <Home size={24} />, color: "bg-green-100 text-green-600" },
    { value: ordersData?.getAllOrders?.length || 0, label: "Đơn hàng", icon: <ShoppingCart size={24} />, color: "bg-blue-100 text-blue-600" },
    { value: usersData?.getAllUsers?.length || 0, label: "Người dùng", icon: <User size={24} />, color: "bg-purple-100 text-purple-600" },
    { value: "87%", label: "Tỷ lệ chuyển đổi", icon: <BarChart2 size={24} />, color: "bg-orange-100 text-orange-600" }
  ];

  const recentActivities = ordersData?.getAllOrders?.slice(0, 3).map(order => ({
    id: order.id,
    type: "order",
    title: `Đơn hàng mới #${order.id}`,
    user: order.purchasedBy,
    amount: formatVNDPrice(order.orderProducts.reduce((sum, product) => sum + product.productPrice, 0)),
    time: new Date(order.datePurchased).toLocaleDateString()
  })) || [];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Process data for charts
  const processRevenueData = () => {
    if (!ordersData?.getAllOrders) return null;

    const ordersByDate = ordersData.getAllOrders.reduce((acc, order) => {
      const date = new Date(order.datePurchased).toLocaleDateString();
      const total = order.orderProducts.reduce((sum, product) => sum + product.productPrice, 0);
      
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += total;
      return acc;
    }, {});

    const dates = Object.keys(ordersByDate).sort();
    const revenues = dates.map(date => ordersByDate[date]);

    return {
      labels: dates,
      datasets: [
        {
          label: 'Doanh thu',
          data: revenues,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          fill: true,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    };
  };

  const processOrderStatusData = () => {
    if (!ordersData?.getAllOrders) return null;

    const statusCount = ordersData.getAllOrders.reduce((acc, order) => {
      const status = order.status || 'pending';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(statusCount),
      datasets: [
        {
          data: Object.values(statusCount),
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
          ],
        },
      ],
    };
  };

  const processUserGrowthData = () => {
    if (!usersData?.getAllUsers) return null;

    const usersByDate = usersData.getAllUsers.reduce((acc, user) => {
      const date = new Date(user.createdAt).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date]++;
      return acc;
    }, {});

    const dates = Object.keys(usersByDate).sort();
    const userCounts = dates.map(date => usersByDate[date]);

    return {
      labels: dates,
      datasets: [
        {
          label: 'Người dùng mới',
          data: userCounts,
          backgroundColor: 'rgba(153, 102, 255, 0.8)',
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  if (usersLoading || ordersLoading) return <Loading />;
  if (usersError || ordersError) return <MuiError type='error' value={'Please try again later..'} />;

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
              <UserProfileContainer>
                <UserAvatar>A</UserAvatar>
                <UserName>Admin</UserName>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4">Doanh thu theo thời gian</h3>
                  {processRevenueData() && (
                    <Line data={processRevenueData()} options={chartOptions} />
                  )}
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4">Phân bố đơn hàng</h3>
                  {processOrderStatusData() && (
                    <Pie data={processOrderStatusData()} options={chartOptions} />
                  )}
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
                  <h3 className="text-lg font-semibold mb-4">Tăng trưởng người dùng</h3>
                  {processUserGrowthData() && (
                    <Bar data={processUserGrowthData()} options={chartOptions} />
                  )}
                </div>
              </div>

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
          {activeSection === "promotions" && <EditBannerPage />}
        </MainContentArea>
      </MainContent>
    </AppContainer>
  );
}
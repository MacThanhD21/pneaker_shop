import {
  AppContainer, Sidebar, SidebarHeader, SidebarNav, NavButton, NavIconWrapperl,
  Header, HeaderContainer, MenuButton, MobileTitle, HeaderActions, NotificationButton,
  NotificationBadge, UserProfileContainer, UserAvatar, UserName, ChevronIcon, MobileMenu,
  MainContent, MainContentArea, WelcomeContainer, WelcomeTitle, WelcomeText, SectionHeader,
  SectionTitle, ActionButton, TableContainer, Table, TableHead, TableBody, TableRow,
  TableCell, TableHeaderCell, StatusBadge, ActionLink, NavIconWrapper
} from "./Components";
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_ORDERS } from '../../graphql/Queries/orderQueries';
import { GET_ALL_USERS } from '../../graphql/Queries/userQueries';
import Loading from '../../assets/mui/Loading';
import MuiError from '../../assets/mui/Alert';
import { useState, useMemo } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';
import { formatVNDPrice } from '../../utils/formatPrice';
import * as XLSX from 'xlsx';

export default function EditOrderPage() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedStatus, setEditedStatus] = useState('');

  const { loading: ordersLoading, error: ordersError, data: ordersData, refetch } = useQuery(GET_ALL_ORDERS);
  const { loading: usersLoading, error: usersError, data: usersData } = useQuery(GET_ALL_USERS);

  const getUserName = useMemo(() => {
    if (!usersData?.getAllUsers || !ordersData?.getAllOrders) return {};
    
    const userMap = {};
    usersData.getAllUsers.forEach(user => {
      userMap[user.id] = `${user.firstName} ${user.lastName}`;
    });
    
    return userMap;
  }, [usersData, ordersData]);

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setEditedStatus(order.status);
    setIsEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedOrder(null);
    setEditedStatus('');
  };

  const handleSaveChanges = async () => {
    try {
      // Here you would implement the mutation to update the order status
      // await updateOrderStatus({ variables: { orderId: selectedOrder.id, status: editedStatus } });
      await refetch(); // Refresh the orders list
      handleCloseDialog();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleExportData = () => {
    const exportData = sortedOrders.map(order => ({
      'Order ID': `#${order.id.slice(0, 6)}`,
      'Customer': getUserName[order.purchasedBy] || order.purchasedBy,
      'Date': new Date(order.datePurchased).toLocaleDateString(),
      'Status': order.status,
      'Total': formatVNDPrice(order.orderProducts.reduce((total, product) => total + product.productPrice, 0))
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orders");
    
    // Generate Excel file
    const fileName = `orders_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  if (ordersLoading) return <Loading />;
  if (ordersError) return <MuiError type='error' value={'Please try again later..'} />;

  const orders = ordersData?.getAllOrders || [];
  const sortedOrders = [...orders].sort((a, b) => 
    new Date(b.datePurchased) - new Date(a.datePurchased)
  );

  return (
    <div>
      <SectionHeader>
        <SectionTitle>Order Management</SectionTitle>
        <ActionButton onClick={handleExportData}>Export Data</ActionButton>
      </SectionHeader>
      <TableContainer>
        <Table>
          <TableHead>
            <tr>
              <TableHeaderCell>Order ID</TableHeaderCell>
              <TableHeaderCell>Customer</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Total</TableHeaderCell>
            </tr>
          </TableHead>
          <TableBody>
            {sortedOrders.map((order) => (
              <tr key={order.id}>
                <TableCell>#{order.id.slice(0, 6)}</TableCell>
                <TableCell highlight>{getUserName[order.purchasedBy] || order.purchasedBy}</TableCell>
                <TableCell>{new Date(order.datePurchased).toLocaleDateString()}</TableCell>
                <TableCell>
                  <StatusBadge status={order.status}>
                    Completed
                  </StatusBadge>
                </TableCell>
                <TableCell>
                  {formatVNDPrice(order.orderProducts.reduce((total, product) => total + product.productPrice, 0))}
                </TableCell>
              </tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Order Dialog */}
      <Dialog open={isEditDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Edit Order Status</DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            label="Order Status"
            value={editedStatus}
            onChange={(e) => setEditedStatus(e.target.value)}
            margin="normal"
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Processing">Processing</MenuItem>
            <MenuItem value="Shipped">Shipped</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveChanges} variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
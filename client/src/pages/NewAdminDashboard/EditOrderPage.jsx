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
import Loading from '../../assets/mui/Loading';
import MuiError from '../../assets/mui/Alert';
import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';
import { formatVNDPrice } from '../../utils/formatPrice';
export default function EditOrderPage() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedStatus, setEditedStatus] = useState('');

  const { loading, error, data, refetch } = useQuery(GET_ALL_ORDERS);

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

  if (loading) return <Loading />;
  if (error) return <MuiError type='error' value={'Please try again later..'} />;

  const orders = data?.getAllOrders || [];

  return (
    <div>
      <SectionHeader>
        <SectionTitle>Order Management</SectionTitle>
        <ActionButton>Export Data</ActionButton>
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
            {orders.map((order) => (
              <tr key={order.id}>
                <TableCell>#{order.id}</TableCell>
                <TableCell highlight>{order.purchasedBy}</TableCell>
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
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
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, IconButton, Tooltip } from '@mui/material';
import { formatVNDPrice } from '../../utils/formatPrice';
import * as XLSX from 'xlsx';
import { FiDownload, FiEdit2, FiEye } from 'react-icons/fi';
import styled from 'styled-components';

const StyledTableContainer = styled(TableContainer)`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: 24px;
  overflow: hidden;
`;

const StyledTable = styled(Table)`
  border-collapse: separate;
  border-spacing: 0;
`;

const StyledTableRow = styled(TableRow)`
  transition: all 0.2s ease;
  &:hover {
    background-color: #f8f9fa;
    cursor: pointer;
  }
`;

const StyledTableCell = styled(TableCell)`
  padding: 16px;
  border-bottom: 1px solid #eee;
`;

const StyledTableHeaderCell = styled(TableHeaderCell)`
  background-color: #f8f9fa;
  font-weight: 600;
  color: #495057;
  padding: 16px;
  border-bottom: 2px solid #dee2e6;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const StyledStatusBadge = styled(StatusBadge)`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: #d1e7dd;
  color: #0f5132;
`;

const StyledSectionHeader = styled(SectionHeader)`
  margin-bottom: 24px;
`;

const StyledActionButton = styled(ActionButton)`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #28a745;
  color: white;
  &:hover {
    background-color: #218838;
  }
`;

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
      <StyledSectionHeader>
        <SectionTitle>Order Management</SectionTitle>
        <StyledActionButton onClick={handleExportData}>
          <FiDownload /> Export Data
        </StyledActionButton>
      </StyledSectionHeader>
      
      <StyledTableContainer>
        <StyledTable>
          <TableHead>
            <tr>
              <StyledTableHeaderCell>Order ID</StyledTableHeaderCell>
              <StyledTableHeaderCell>Customer</StyledTableHeaderCell>
              <StyledTableHeaderCell>Date</StyledTableHeaderCell>
              <StyledTableHeaderCell>Status</StyledTableHeaderCell>
              <StyledTableHeaderCell>Total</StyledTableHeaderCell>
              <StyledTableHeaderCell>Actions</StyledTableHeaderCell>
            </tr>
          </TableHead>
          <TableBody>
            {sortedOrders.map((order) => (
              <StyledTableRow key={order.id} onClick={() => handleEditClick(order)}>
                <StyledTableCell>#{order.id.slice(0, 6)}</StyledTableCell>
                <StyledTableCell highlight>{getUserName[order.purchasedBy] || order.purchasedBy}</StyledTableCell>
                <StyledTableCell>{new Date(order.datePurchased).toLocaleDateString()}</StyledTableCell>
                <StyledTableCell>
                  <StyledStatusBadge status={order.status}>
                    Completed
                  </StyledStatusBadge>
                </StyledTableCell>
                <StyledTableCell>
                  {formatVNDPrice(order.orderProducts.reduce((total, product) => total + product.productPrice, 0))}
                </StyledTableCell>
                <StyledTableCell>
                  <ActionButtons>
                    <Tooltip title="View Details">
                      <IconButton size="small">
                        <FiEye />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Order">
                      <IconButton size="small">
                        <FiEdit2 />
                      </IconButton>
                    </Tooltip>
                  </ActionButtons>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>

      {/* Edit Order Dialog */}
      <Dialog 
        open={isEditDialogOpen} 
        onClose={handleCloseDialog}
        PaperProps={{
          style: {
            borderRadius: '12px',
            padding: '16px'
          }
        }}
      >
        <DialogTitle style={{ fontSize: '1.25rem', fontWeight: 600 }}>
          Edit Order Status
        </DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            label="Order Status"
            value={editedStatus}
            onChange={(e) => setEditedStatus(e.target.value)}
            margin="normal"
            variant="outlined"
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Processing">Processing</MenuItem>
            <MenuItem value="Shipped">Shipped</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseDialog}
            style={{ color: '#6c757d' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveChanges} 
            variant="contained" 
            color="primary"
            style={{ 
              backgroundColor: '#007bff',
              '&:hover': {
                backgroundColor: '#0056b3'
              }
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../../graphql/Queries/userQueries";
import {
  AppContainer, Sidebar, SidebarHeader, SidebarNav, NavButton, NavIconWrapperl,
  Header, HeaderContainer, MenuButton, MobileTitle, HeaderActions, NotificationButton,
  NotificationBadge, UserProfileContainer, UserAvatar, UserName, ChevronIcon, MobileMenu,
  MainContent, MainContentArea, WelcomeContainer, WelcomeTitle, WelcomeText, SectionHeader,
  SectionTitle, ActionButton, TableContainer, Table, TableHead, TableBody, TableRow,
  TableCell, TableHeaderCell, StatusBadge, ActionLink, NavIconWrapper,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  DialogOverlay
} from "./Components";
import { useState } from "react";
import { DELETE_USER, UPDATE_ROLE, UPDATE_USER } from "../../graphql/Mutations/userMutations";
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import styled from 'styled-components';
import { IconButton, Tooltip, Button } from '@mui/material';

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

const StyledTableRow = styled.tr`
  transition: all 0.2s ease;
  &:hover {
    background-color: #f8f9fa;
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

const RoleBadge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: ${props => props.isAdmin ? '#d1e7dd' : '#e2e3e5'};
  color: ${props => props.isAdmin ? '#0f5132' : '#383d41'};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const StyledSectionHeader = styled(SectionHeader)`
  margin-bottom: 24px;
`;

const StyledFormInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

export default function EditUserPage() {

  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const { data, loading, error } = useQuery(GET_ALL_USERS);

  const [updateUser] = useMutation(UPDATE_ROLE, {
    refetchQueries: [{ query: GET_ALL_USERS }]
  });

  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_ALL_USERS }]
  });

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleDelete = (user) => {
    setDeletingUser(user);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      await updateUser({
        variables: {
          userId: editingUser.id,
          isAdmin: formData.get('role') === 'admin'
        }
      });
      setEditingUser(null);
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteUser({
        variables: { userId: deletingUser.id }
      });
      setDeletingUser(null);
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };
  const listUser = data?.getAllUsers

  return (
    loading ? <div>Loading...</div> :
      <div>
        <StyledSectionHeader>
          <SectionTitle>Users Management</SectionTitle>
        </StyledSectionHeader>
        <StyledTableContainer>
          <StyledTable>
            <TableHead>
              <tr>
                <StyledTableHeaderCell>ID</StyledTableHeaderCell>
                <StyledTableHeaderCell>Name</StyledTableHeaderCell>
                <StyledTableHeaderCell>Email</StyledTableHeaderCell>
                <StyledTableHeaderCell>Role</StyledTableHeaderCell>
                <StyledTableHeaderCell>Actions</StyledTableHeaderCell>
              </tr>
            </TableHead>
            <TableBody>
              {listUser.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell>#{item.id.slice(0, 6)}</StyledTableCell>
                  <StyledTableCell highlight>{item.username}</StyledTableCell>
                  <StyledTableCell>{item.email}</StyledTableCell>
                  <StyledTableCell>
                    <RoleBadge isAdmin={item.isAdmin}>
                      {item.isAdmin ? "Admin" : "Customer"}
                    </RoleBadge>
                  </StyledTableCell>
                  <StyledTableCell>
                    <ActionButtons>
                      <Tooltip title="Edit User">
                        <IconButton 
                          size="small"
                          onClick={() => handleEdit(item)}
                          style={{ color: '#007bff' }}
                        >
                          <FiEdit2 />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete User">
                        <IconButton 
                          size="small"
                          onClick={() => handleDelete(item)}
                          style={{ color: '#dc3545' }}
                        >
                          <FiTrash2 />
                        </IconButton>
                      </Tooltip>
                    </ActionButtons>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </StyledTable>
        </StyledTableContainer>

        {editingUser && (
          <DialogOverlay>
            <Dialog 
              open={!!editingUser} 
              onClose={() => setEditingUser(null)}
              PaperProps={{
                style: {
                  borderRadius: '12px',
                  padding: '16px'
                }
              }}
            >
              <DialogTitle style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                Edit User
              </DialogTitle>
              <form onSubmit={handleUpdateUser}>
                <DialogContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                      </label>
                      <StyledFormInput
                        type="text"
                        name="username"
                        defaultValue={editingUser.username}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <StyledFormInput
                        type="email"
                        name="email"
                        defaultValue={editingUser.email}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Role
                      </label>
                      <StyledSelect
                        name="role"
                        defaultValue={editingUser.isAdmin ? 'admin' : 'customer'}
                      >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                      </StyledSelect>
                    </div>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button 
                    onClick={() => setEditingUser(null)}
                    style={{ color: '#6c757d' }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    variant="contained"
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
              </form>
            </Dialog>
          </DialogOverlay>
        )}

        {deletingUser && (
          <DialogOverlay>
            <Dialog 
              open={!!deletingUser} 
              onClose={() => setDeletingUser(null)}
              PaperProps={{
                style: {
                  borderRadius: '12px',
                  padding: '16px'
                }
              }}
            >
              <DialogTitle style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                Confirm Delete
              </DialogTitle>
              <DialogContent>
                Are you sure you want to delete user "{deletingUser.username}"?
                This action cannot be undone.
              </DialogContent>
              <DialogActions>
                <Button 
                  onClick={() => setDeletingUser(null)}
                  style={{ color: '#6c757d' }}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleConfirmDelete}
                  variant="contained"
                  style={{ 
                    backgroundColor: '#dc3545',
                    '&:hover': {
                      backgroundColor: '#c82333'
                    }
                  }}
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </DialogOverlay>
        )}
      </div>
  )
}
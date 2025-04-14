

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
        <SectionHeader>
          <SectionTitle>Users Management</SectionTitle>
        </SectionHeader>
        <TableContainer>
          <Table>
            <TableHead>
              <tr>
                <TableHeaderCell>ID</TableHeaderCell>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
                <TableHeaderCell>Role</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </tr>
            </TableHead>
            <TableBody>
              {listUser.map((item) => (
                <tr key={item}>
                  <TableCell>#{item.id}</TableCell>
                  <TableCell highlight>User {item.username}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.isAdmin ? "Admin" : "Customer"}</TableCell>
                  <TableCell>
                    <ActionLink onClick={() => handleEdit(item)}>Edit</ActionLink>
                    <ActionLink
                      color="#dc2626"
                      hoverColor="#b91c1c"
                      onClick={() => handleDelete(item)}
                    >
                      Delete
                    </ActionLink>
                  </TableCell>
                </tr>
              ))}
            </TableBody>
            {editingUser && (
              <DialogOverlay>
                <Dialog open={!!editingUser} onClose={() => setEditingUser(null)}>
                  <DialogTitle>Edit User</DialogTitle>
                  <form onSubmit={handleUpdateUser}>
                    <DialogContent>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Username
                          </label>
                          <input
                            type="text"
                            name="username"
                            defaultValue={editingUser.username}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            defaultValue={editingUser.email}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Role
                          </label>
                          <select
                            name="role"
                            defaultValue={editingUser.isAdmin ? 'admin' : 'customer'}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                          >
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                          </select>
                        </div>
                      </div>
                    </DialogContent>
                    <DialogActions>
                      <button
                        type="button"
                        onClick={() => setEditingUser(null)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                      >
                        Save Changes
                      </button>
                    </DialogActions>
                  </form>
                </Dialog>
              </DialogOverlay>
            )}

            {deletingUser && (
              <DialogOverlay>
                <Dialog open={!!deletingUser} onClose={() => setDeletingUser(null)}>
                  <DialogTitle>Confirm Delete</DialogTitle>
                  <DialogContent>
                    Are you sure you want to delete user "{deletingUser.username}"?
                    This action cannot be undone.
                  </DialogContent>
                  <DialogActions>
                    <button
                      onClick={() => setDeletingUser(null)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmDelete}
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
                    >
                      Delete
                    </button>
                  </DialogActions>
                </Dialog>
              </DialogOverlay>
            )}
          </Table>
        </TableContainer>
      </div>
  )
}
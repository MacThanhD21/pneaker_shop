import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PRODUCTS_PAGINATION } from '../../graphql/Queries/productQueries';
import {
    SectionHeader,
    SectionTitle, ActionButton, TableContainer, Table, TableHead, TableBody,
    TableCell, TableHeaderCell, ActionLink,
    PaginationMUI, DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    DialogOverlay
} from "./Components";
import { CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from '../../graphql/Mutations/productMutation';
import { AdminLayout, EditItem, NewItem } from '../AdminDashboard';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
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

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const SizeInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.875rem;
  color: #6c757d;
`;

const SizeItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  background-color: #f8f9fa;
  border-radius: 4px;
  &:hover {
    background-color: #e9ecef;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
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

const EditProductPag = () => {

    const [page, setPage] = useState(1);
    const [numberPage, setNumberPage] = useState(0);
    const [deleteProduct, setDeleteProduct] = useState(null);
    const [listSize, setListSize] = useState([]);
    const { data, loading, error , refetch} = useQuery(GET_PRODUCTS_PAGINATION, {
        onCompleted: ({ getProductsPagination }) => {
            setNumberPage(getProductsPagination.numOfPages);
        },
        variables: {
            page: page,
            productsFiltersInput: {
                size: null,
                color: null,
                brand: null,
                price: [],
                sort: null,
            },
        },
        fetchPolicy: 'network-only',
    });

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        title: '',
        brand: '',
        model: '',
        price: '',
        image: '',
        color: '',
        size: []
    });

    const [isEditItemOpen, setIsEditItemOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const [addProduct] = useMutation(CREATE_PRODUCT, {
        refetchQueries: [{ query: GET_PRODUCTS_PAGINATION }]
    });

    const [updateProduct] = useMutation(UPDATE_PRODUCT, {
        refetchQueries: [{ query: GET_PRODUCTS_PAGINATION }]
    });

    const handleAddProduct = async (e) => {
        try {
            console.log('Product data received:', e);
            await addProduct({
                variables: {
                    title: e.title,
                    brand: e.brand,
                    model: e.model,
                    price: e.price,
                    image: e.image,
                    color: e.color,
                    size: e.size.map(sizeItem => ({
                        size: parseFloat(sizeItem.size),
                        quantity: parseInt(sizeItem.quantity)
                    }))
                }
            });
            setIsAddModalOpen(false);
            setNewProduct({
                title: '',
                brand: '',
                model: '',
                price: '',
                image: '',
                color: '',
                size: []
            });
            setListSize([]);
        } catch (err) {
            console.error('Error adding product:', err);
        }
    };
    const [deleteProd] = useMutation(DELETE_PRODUCT, {
        refetchQueries: [{ query: GET_PRODUCTS_PAGINATION }]
      });
    const handleDelete = (product) => {
        setDeleteProduct(product);
      };
    const handleConfirmDelete = async () => {
        try {
          await deleteProd({
            variables: { productId: deleteProduct.id }
          });
          setDeleteProduct(null);
          try {
            await refetch({
                page: page,
                productsFiltersInput: {
                    size: null,
                    color: null,
                    brand: null,
                    price: [],
                    sort: null,
                }
            });
        } catch (error) {
            console.error('Error fetching new page:', error);
        }
        } catch (err) {
          console.error('Error deleting product:', err);
        }
      };
    const handlePageChange = async (newPage) =>  {
        setPage(newPage);
        try {
            await refetch({
                page: newPage,
                productsFiltersInput: {
                    size: null,
                    color: null,
                    brand: null,
                    price: [],
                    sort: null,
                }
            });
        } catch (error) {
            console.error('Error fetching new page:', error);
        }
    };
    
    const products = data?.getProductsPagination?.products;

    const handleEditClick = (product) => {
        setEditingProduct(product);
        setIsEditItemOpen(true);
    };

    const handleUpdateProduct = async (e) => {
        try {
            await updateProduct({
                variables: {
                    productId: editingProduct.id,
                    title: e.title,
                    brand: e.brand,
                    model: e.model,
                    price: e.price,
                    image: e.image,
                    color: e.color,
                    size: e.size.map(sizeItem => ({
                        size: parseFloat(sizeItem.size),
                        quantity: parseInt(sizeItem.quantity)
                    }))
                }
            });
            setIsEditItemOpen(false);
            setEditingProduct(null);
            await refetch();
        } catch (err) {
            console.error('Error updating product:', err);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) {
        console.error('Error fetching products:', error);
        return <div>Error loading products</div>;
    }
    if (!products?.length) return (
        <div className="text-gray-500 p-4">
            No products found.
        </div>
    );
    return (
        <div>
            <StyledSectionHeader>
                <SectionTitle>Products Management</SectionTitle>
                <StyledActionButton onClick={() => setIsAddModalOpen(true)}>
                    <FiPlus /> Add New Product
                </StyledActionButton>
            </StyledSectionHeader>
            
            <StyledTableContainer>
                <StyledTable>
                    <TableHead>
                        <tr>
                            <StyledTableHeaderCell>ID</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Product</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Image</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Price</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Size & Quantity</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Rates</StyledTableHeaderCell>
                            <StyledTableHeaderCell>Actions</StyledTableHeaderCell>
                        </tr>
                    </TableHead>
                    <TableBody>
                        {products.map((item) => (
                            <StyledTableRow key={item.id}>
                                <StyledTableCell>#{item.id.slice(0, 6)}</StyledTableCell>
                                <StyledTableCell highlight>{item.title}</StyledTableCell>
                                <StyledTableCell>
                                    <ProductImage src={item.image} alt={item.title} />
                                </StyledTableCell>
                                <StyledTableCell>{(item.price)}₫</StyledTableCell>
                                <StyledTableCell>
                                    <SizeInfo>
                                        {item.size.map(size => (
                                            <SizeItem key={size.id}>
                                                Size: {size.size} - Quantity: {size.quantity} left
                                            </SizeItem>
                                        ))}
                                    </SizeInfo>
                                </StyledTableCell>
                                <StyledTableCell>{item.rates}</StyledTableCell>
                                <StyledTableCell>
                                    <ActionButtons>
                                        <Tooltip title="Edit Product">
                                            <IconButton 
                                                size="small"
                                                onClick={() => handleEditClick(item)}
                                                style={{ color: '#007bff' }}
                                            >
                                                <FiEdit2 />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete Product">
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
                    <tfoot>
                        <tr>
                            <td colSpan={7}>
                                <PaginationMUI 
                                    numOfPages={numberPage}
                                    page={page}
                                    onChange={(page) => handlePageChange(page)}
                                />
                            </td>
                        </tr>
                    </tfoot>
                </StyledTable>
            </StyledTableContainer>

            {deleteProduct && (
                <DialogOverlay>
                    <Dialog 
                        open={!!deleteProduct} 
                        onClose={() => setDeleteProduct(null)}
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
                            Are you sure you want to delete product "{deleteProduct.title}"?
                            This action cannot be undone.
                        </DialogContent>
                        <DialogActions>
                            <Button 
                                onClick={() => setDeleteProduct(null)}
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

            {isAddModalOpen && (
                <DialogOverlay>
                    <Dialog 
                        open={isAddModalOpen} 
                        onClose={() => setIsAddModalOpen(false)}
                        PaperProps={{
                            style: {
                                borderRadius: '12px',
                                padding: '16px'
                            }
                        }}
                    >
                        <DialogTitle style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                            Add New Product
                        </DialogTitle>
                        <DialogContent>
                            <NewItem 
                                onCancel={() => setIsAddModalOpen(false)} 
                                onSubmit={handleAddProduct} 
                            />
                        </DialogContent>
                    </Dialog>
                </DialogOverlay>
            )}

            {isEditItemOpen && (
                <DialogOverlay>
                    <Dialog 
                        open={isEditItemOpen} 
                        onClose={() => {
                            setIsEditItemOpen(false);
                            setEditingProduct(null);
                        }}
                        PaperProps={{
                            style: {
                                borderRadius: '12px',
                                padding: '16px'
                            }
                        }}
                    >
                        <DialogTitle style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                            Edit Product
                        </DialogTitle>
                        <DialogContent>
                            <NewItem 
                                onCancel={() => {
                                    setIsEditItemOpen(false);
                                    setEditingProduct(null);
                                }}
                                onSubmit={handleUpdateProduct}
                                initialData={editingProduct}
                            />
                        </DialogContent>
                    </Dialog>
                </DialogOverlay>
            )}
        </div>
    );
};

export default EditProductPag;
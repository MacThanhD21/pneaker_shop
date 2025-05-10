import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { GET_PRODUCTS_PAGINATION } from '../../graphql/Queries/productQueries';
import {
    SectionHeader,
    SectionTitle, ActionButton, TableContainer, Table, TableHead, TableBody,
    TableCell, TableHeaderCell, ActionLink,
    PaginationMUI,DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    DialogOverlay
} from "./Components";
import { CREATE_PRODUCT, DELETE_PRODUCT } from '../../graphql/Mutations/productMutation';

import { AdminLayout, EditItem, NewItem } from '../AdminDashboard';

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

    const [addProduct] = useMutation(CREATE_PRODUCT, {
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
            <SectionHeader>
                <SectionTitle>Products Management</SectionTitle>
                <ActionButton onClick={() => setIsAddModalOpen(true)}>Add New Product</ActionButton>
            </SectionHeader>
            <TableContainer>
                <Table>
                    <TableHead>
                        <tr>
                            <TableHeaderCell>ID</TableHeaderCell>
                            <TableHeaderCell>Product</TableHeaderCell>
                            <TableHeaderCell>Image</TableHeaderCell>
                            <TableHeaderCell>Price</TableHeaderCell>
                            <TableHeaderCell>Stock</TableHeaderCell>
                            <TableHeaderCell>Rates</TableHeaderCell>
                            
                            <TableHeaderCell>Actions</TableHeaderCell>
                        </tr>
                    </TableHead>
                    <TableBody>
                        {products.map((item) => (
                            <tr key={item}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell highlight>{item.title}</TableCell>
                                <TableCell>
                                    <img src={item.image} alt={item.title} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                </TableCell>
                                <TableCell> {(item.price)}₫</TableCell>
                                <TableCell>42</TableCell>
                                <TableCell>{item.rates}</TableCell>
                                <TableCell>
                                    <ActionLink onClick={() => {setIsEditItemOpen(true)}}>Edit</ActionLink>
                                    <ActionLink color="#dc2626" hoverColor="#b91c1c" onClick={() => {handleDelete(item)}}>Delete</ActionLink>
                                </TableCell>
                            </tr>
                        ))}
                    </TableBody>
                    <tfoot>
                        <tr>
                            <td colSpan={6}>
                                <PaginationMUI 
                                    numOfPages={numberPage}
                                    page={page}
                                    onChange={(page) => handlePageChange(page)}
                                />
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </TableContainer>

            {deleteProduct && (
                          <DialogOverlay>
                            <Dialog open={!!deleteProduct} onClose={() => setDeleteProduct(null)}>
                              <DialogTitle>Confirm Delete</DialogTitle>
                              <DialogContent>
                                Are you sure you want to delete product "{deleteProduct.title}"?
                                This action cannot be undone.
                              </DialogContent>
                              <DialogActions>
                                <button
                                  onClick={() => setDeleteProduct(null)}
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

{isAddModalOpen && (
    <DialogOverlay>
    <Dialog open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
            <NewItem onCancel={() => setIsAddModalOpen(false) } onSubmit={handleAddProduct} />
        </DialogContent>
    </Dialog>
</DialogOverlay>
)}

{isEditItemOpen && (
    <DialogOverlay>
    <Dialog open={isEditItemOpen} onClose={() => setIsEditItemOpen(false)}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
        <NewItem onCancel={() => setIsEditItemOpen(false) } onSubmit={handleAddProduct} />
        </DialogContent>
        </Dialog>
    </DialogOverlay>

)}

        </div>
    )
}

export default EditProductPag;
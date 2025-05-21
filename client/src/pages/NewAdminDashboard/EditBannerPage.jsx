import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { 
  SectionHeader, SectionTitle, ActionButton,
  TableContainer, Table, TableHead, TableBody, TableRow,
  TableCell, TableHeaderCell
} from "./Components";
import { Plus, Trash2, Image as ImageIcon, Save, Edit2 } from 'lucide-react';
import { GET_ALL_BANNERS } from '../../graphql/Queries/bannerQueries';
import { CREATE_BANNER, UPDATE_BANNER, DELETE_BANNER } from '../../graphql/Mutations/bannerMutations';
import Loading from '../../assets/mui/Loading';
import MuiError from '../../assets/mui/Alert';
import styled from 'styled-components';
import { IconButton, Tooltip, Button } from '@mui/material';

const StyledTableContainer = styled(TableContainer)`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: 24px;
  overflow: hidden;
  max-width: 100%;
`;

const StyledTable = styled(Table)`
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
  table-layout: fixed;
`;

const StyledTableRow = styled.tr`
  transition: all 0.2s ease;
  &:hover {
    background-color: #f8f9fa;
  }
`;

const StyledTableCell = styled(TableCell)`
  padding: 12px;
  border-bottom: 1px solid #eee;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 0;
`;

const StyledTableHeaderCell = styled(TableHeaderCell)`
  background-color: #f8f9fa;
  font-weight: 600;
  color: #495057;
  padding: 12px;
  border-bottom: 2px solid #dee2e6;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 0;
`;

const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: ${props => props.isActive ? '#d1e7dd' : '#f8d7da'};
  color: ${props => props.isActive ? '#0f5132' : '#842029'};
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

const BannerImageContainer = styled.div`
  width: 100px;
  height: 50px;
  position: relative;
  background-color: #f8f9fa;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const NewBannerForm = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #212529;
    margin-bottom: 16px;
  }
`;

const EditBannerPage = () => {
  const [banners, setBanners] = useState([]);
  const [editingBanner, setEditingBanner] = useState(null);
  const [newBanner, setNewBanner] = useState({
    image: '',
    title: '',
    description: '',
    link: '',
    order: 0
  });

  const { loading, error, data, refetch } = useQuery(GET_ALL_BANNERS);
  const [createBanner] = useMutation(CREATE_BANNER);
  const [updateBanner] = useMutation(UPDATE_BANNER);
  const [deleteBanner] = useMutation(DELETE_BANNER);

  useEffect(() => {
    if (data?.getAllBanners) {
      setBanners(data.getAllBanners);
    }
  }, [data]);

  const handleInputChange = (field, value) => {
    if (editingBanner) {
      setEditingBanner({ ...editingBanner, [field]: value });
    } else {
      setNewBanner({ ...newBanner, [field]: value });
    }
  };

  const handleCreateBanner = async () => {
    try {
      await createBanner({
        variables: {
          input: newBanner
        }
      });
      setNewBanner({
        image: '',
        title: '',
        description: '',
        link: '',
        order: 0
      });
      refetch();
    } catch (error) {
      console.error('Error creating banner:', error);
    }
  };

  const handleUpdateBanner = async () => {
    try {
      await updateBanner({
        variables: {
          id: editingBanner.id,
          input: {
            image: editingBanner.image,
            title: editingBanner.title,
            description: editingBanner.description,
            link: editingBanner.link,
            order: editingBanner.order,
            isActive: editingBanner.isActive
          }
        }
      });
      setEditingBanner(null);
      refetch();
    } catch (error) {
      console.error('Error updating banner:', error);
    }
  };

  const handleDeleteBanner = async (id) => {
    try {
      await deleteBanner({
        variables: { id }
      });
      refetch();
    } catch (error) {
      console.error('Error deleting banner:', error);
    }
  };

  if (loading) return <Loading />;
  if (error) return <MuiError message={error.message} />;

  return (
    <div className="space-y-6">
      <StyledSectionHeader>
        <SectionTitle>Quản lý Banner</SectionTitle>
        <div className="flex gap-4">
          <ActionButton onClick={handleCreateBanner}>
            <Plus size={20} className="mr-2" />
            Thêm Banner
          </ActionButton>
        </div>
      </StyledSectionHeader>

      <NewBannerForm>
        <h3>Thêm Banner Mới</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hình ảnh</label>
            <StyledFormInput
              type="text"
              value={newBanner.image}
              onChange={(e) => handleInputChange('image', e.target.value)}
              placeholder="URL hình ảnh"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
            <StyledFormInput
              type="text"
              value={newBanner.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Tiêu đề banner"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
            <StyledFormInput
              type="text"
              value={newBanner.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Mô tả banner"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
            <StyledFormInput
              type="text"
              value={newBanner.link}
              onChange={(e) => handleInputChange('link', e.target.value)}
              placeholder="Link banner"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Thứ tự</label>
            <StyledFormInput
              type="number"
              value={newBanner.order}
              onChange={(e) => handleInputChange('order', parseInt(e.target.value))}
              placeholder="Thứ tự hiển thị"
            />
          </div>
        </div>
      </NewBannerForm>

      <StyledTableContainer>
        <StyledTable>
          <TableHead>
            <tr>
              <StyledTableHeaderCell style={{ width: '12%' }}>Hình ảnh</StyledTableHeaderCell>
              <StyledTableHeaderCell style={{ width: '18%' }}>Tiêu đề</StyledTableHeaderCell>
              <StyledTableHeaderCell style={{ width: '20%' }}>Mô tả</StyledTableHeaderCell>
              <StyledTableHeaderCell style={{ width: '20%' }}>Link</StyledTableHeaderCell>
              <StyledTableHeaderCell style={{ width: '8%' }}>Thứ tự</StyledTableHeaderCell>
              <StyledTableHeaderCell style={{ width: '10%' }}>Trạng thái</StyledTableHeaderCell>
              <StyledTableHeaderCell style={{ width: '12%' }}>Thao tác</StyledTableHeaderCell>
            </tr>
          </TableHead>
          <TableBody>
            {banners.map((banner) => (
              <StyledTableRow key={banner.id}>
                <StyledTableCell>
                  <BannerImageContainer>
                    {banner.image ? (
                      <img
                        src={banner.image}
                        alt={banner.title}
                        onError={(e) => {
                          e.target.src = '';
                          e.target.parentElement.innerHTML = '<ImageIcon size={20} className="text-gray-400" />';
                        }}
                      />
                    ) : (
                      <ImageIcon size={20} className="text-gray-400" />
                    )}
                  </BannerImageContainer>
                </StyledTableCell>
                <StyledTableCell title={banner.title}>
                  {editingBanner?.id === banner.id ? (
                    <StyledFormInput
                      type="text"
                      value={editingBanner.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                    />
                  ) : (
                    banner.title
                  )}
                </StyledTableCell>
                <StyledTableCell title={banner.description}>
                  {editingBanner?.id === banner.id ? (
                    <StyledFormInput
                      type="text"
                      value={editingBanner.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                  ) : (
                    banner.description
                  )}
                </StyledTableCell>
                <StyledTableCell title={banner.link}>
                  {editingBanner?.id === banner.id ? (
                    <StyledFormInput
                      type="text"
                      value={editingBanner.link}
                      onChange={(e) => handleInputChange('link', e.target.value)}
                    />
                  ) : (
                    banner.link
                  )}
                </StyledTableCell>
                <StyledTableCell>
                  {editingBanner?.id === banner.id ? (
                    <StyledFormInput
                      type="number"
                      value={editingBanner.order}
                      onChange={(e) => handleInputChange('order', parseInt(e.target.value))}
                    />
                  ) : (
                    banner.order
                  )}
                </StyledTableCell>
                <StyledTableCell>
                  {editingBanner?.id === banner.id ? (
                    <StyledSelect
                      value={editingBanner.isActive}
                      onChange={(e) => handleInputChange('isActive', e.target.value === 'true')}
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </StyledSelect>
                  ) : (
                    <StatusBadge isActive={banner.isActive}>
                      {banner.isActive ? 'Active' : 'Inactive'}
                    </StatusBadge>
                  )}
                </StyledTableCell>
                <StyledTableCell>
                  <ActionButtons>
                    {editingBanner?.id === banner.id ? (
                      <Tooltip title="Lưu thay đổi">
                        <IconButton 
                          size="small"
                          onClick={handleUpdateBanner}
                          style={{ color: '#28a745' }}
                        >
                          <Save size={18} />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Chỉnh sửa">
                        <IconButton 
                          size="small"
                          onClick={() => setEditingBanner(banner)}
                          style={{ color: '#007bff' }}
                        >
                          <Edit2 size={18} />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title="Xóa banner">
                      <IconButton 
                        size="small"
                        onClick={() => handleDeleteBanner(banner.id)}
                        style={{ color: '#dc3545' }}
                      >
                        <Trash2 size={18} />
                      </IconButton>
                    </Tooltip>
                  </ActionButtons>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
    </div>
  );
};

export default EditBannerPage;

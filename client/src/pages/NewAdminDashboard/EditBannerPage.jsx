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
      <SectionHeader>
        <SectionTitle>Quản lý Banner</SectionTitle>
        <div className="flex gap-4">
          <ActionButton onClick={handleCreateBanner}>
            <Plus size={20} className="mr-2" />
            Thêm Banner
          </ActionButton>
        </div>
      </SectionHeader>

      {/* New Banner Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Thêm Banner Mới</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hình ảnh</label>
            <input
              type="text"
              value={newBanner.image}
              onChange={(e) => handleInputChange('image', e.target.value)}
              placeholder="URL hình ảnh"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
            <input
              type="text"
              value={newBanner.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Tiêu đề banner"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
            <input
              type="text"
              value={newBanner.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Mô tả banner"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
            <input
              type="text"
              value={newBanner.link}
              onChange={(e) => handleInputChange('link', e.target.value)}
              placeholder="Link banner"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Thứ tự</label>
            <input
              type="number"
              value={newBanner.order}
              onChange={(e) => handleInputChange('order', parseInt(e.target.value))}
              placeholder="Thứ tự hiển thị"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Hình ảnh</TableHeaderCell>
              <TableHeaderCell>Tiêu đề</TableHeaderCell>
              <TableHeaderCell>Mô tả</TableHeaderCell>
              <TableHeaderCell>Link</TableHeaderCell>
              <TableHeaderCell>Thứ tự</TableHeaderCell>
              <TableHeaderCell>Trạng thái</TableHeaderCell>
              <TableHeaderCell>Thao tác</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {banners.map((banner) => (
              <TableRow key={banner.id}>
                <TableCell>
                  <div className="w-32 h-20 relative bg-gray-100 rounded-lg overflow-hidden">
                    {banner.image ? (
                      <img
                        src={banner.image}
                        alt={banner.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '';
                          e.target.parentElement.classList.add('flex', 'items-center', 'justify-center');
                          e.target.parentElement.innerHTML = '<ImageIcon size={24} className="text-gray-400" />';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon size={24} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {editingBanner?.id === banner.id ? (
                    <input
                      type="text"
                      value={editingBanner.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                    />
                  ) : (
                    banner.title
                  )}
                </TableCell>
                <TableCell>
                  {editingBanner?.id === banner.id ? (
                    <input
                      type="text"
                      value={editingBanner.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                    />
                  ) : (
                    banner.description
                  )}
                </TableCell>
                <TableCell>
                  {editingBanner?.id === banner.id ? (
                    <input
                      type="text"
                      value={editingBanner.link}
                      onChange={(e) => handleInputChange('link', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                    />
                  ) : (
                    banner.link
                  )}
                </TableCell>
                <TableCell>
                  {editingBanner?.id === banner.id ? (
                    <input
                      type="number"
                      value={editingBanner.order}
                      onChange={(e) => handleInputChange('order', parseInt(e.target.value))}
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                    />
                  ) : (
                    banner.order
                  )}
                </TableCell>
                <TableCell>
                  {editingBanner?.id === banner.id ? (
                    <select
                      value={editingBanner.isActive}
                      onChange={(e) => handleInputChange('isActive', e.target.value === 'true')}
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  ) : (
                    <span className={`px-2 py-1 rounded-full text-sm ${banner.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {banner.isActive ? 'Active' : 'Inactive'}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {editingBanner?.id === banner.id ? (
                      <button
                        onClick={handleUpdateBanner}
                        className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        <Save size={20} />
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditingBanner(banner)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={20} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteBanner(banner.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EditBannerPage;

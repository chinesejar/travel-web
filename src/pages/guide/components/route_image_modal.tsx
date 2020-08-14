import React, { useState } from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import config from '@/config';
import store from 'store';
import { useSelector } from 'umi';

const { serverUrl } = config;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const RouteImageModal = () => {
  const route = useSelector(state => state.guide.route);
  if (!route) return null;
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState(
    route.images
      ? route.images.map(image => ({
          uid: `${-Math.random() * 1000}`,
          name: image.name,
          status: 'done',
          url: `${config.mediaUrl}/route-image/${image.name}`,
        }))
      : [],
  );

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    );
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">上传</div>
    </div>
  );
  return (
    <div className="clearfix">
      <Upload
        action={`${serverUrl}/v1/route-img`}
        listType="picture-card"
        fileList={fileList}
        headers={{
          authorization: `Bearer ${store.get('token')}`,
        }}
        data={{
          route_id: route.id,
        }}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default RouteImageModal;

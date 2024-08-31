import React from 'react';
import { Label } from '../../../components/label';
import { Button } from '../../../components/button';
import { supabase } from '../../../utils/Supabase';
import { UserAuth } from '../../../hooks/AuthContext';
import { showToast } from '../../../components/Toasts';
import { EditorLayout } from '../../../hooks/EditorContext';
import { RiUser4Line, RiUpload2Line } from '@remixicon/react';
import { EditorInput } from '../../../components/editor-input';
import { EditorTextarea } from '../../../components/editor-textarea';

const ImagesContent = () => {
  const { session } = UserAuth();
  const avatarUploadFileRef = React.useRef(null);
  const SUPABASE_STORAGE_URL = import.meta.env.VITE_SUPABASE_STORAGE_URL;
  const { selectedWidget, updateCardTitle, profolyoEditorLayout, updateCardCoverImage } = EditorLayout();

  const [layoutMode, setLayoutMode] = React.useState('md');
  const [avatarFile, setAvatarFile] = React.useState(null);

  const handleInputFileRef = () => {
    avatarUploadFileRef.current.click();
  };

  const getWidgetTitle = (widget) => {
    const component = profolyoEditorLayout[layoutMode].filter((item) => item.i === widget.i);
    return component[0]?.data?.title;
  };

  const getWidgetCoverImage = (widget) => {
    const component = profolyoEditorLayout[layoutMode].filter((item) => item.i === widget.i);
    return component[0]?.data?.coverImage;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      showToast('No file selected.', 'error');
      return;
    } else if (!selectedFile.type.startsWith('image/')) {
      showToast('Selected file is not an image.', 'error');
      return;
    } else if (selectedFile.size > 5 * 1024 * 1024) {
      showToast('File size must be less than 5MB.', 'error');
      return;
    } else {
      setAvatarFile(selectedFile);
      uploadImage(selectedFile);
    }
  };

  const uploadImage = async (selectedFile) => {
    if (!selectedFile) return;
    showToast('Uploading Cover Image.', 'info');

    try {
      const fileName = `${session?.user_metadata?.name}-${Date.now()}-${selectedFile.name}`;
      //upload file to storage
      const { data, error } = await supabase.storage.from('images').upload(fileName, selectedFile, {
        cacheControl: '3600',
        upsert: false,
      });
      if (error) throw error;
      updateCardCoverImage(selectedWidget.i, `${SUPABASE_STORAGE_URL}images/${fileName}`);
      showToast('Cover Image Uploaded Successfully!', 'success');
    } catch (error) {
      console.error('Error uploading file:', error.message);
      showToast(`Error uploading file: ${error.message}`, 'error');
    }
  };

  React.useEffect(() => {
    const editorLayoutSize = () => {
      if (window.innerWidth >= 1024) {
        setLayoutMode('md');
      } else if (window.innerWidth < 1024 && window.innerWidth >= 767) {
        setLayoutMode('sm');
      } else {
        setLayoutMode('xs');
      }
    };

    editorLayoutSize();

    window.addEventListener('resize', editorLayoutSize);
    return () => window.removeEventListener('resize', editorLayoutSize);
  }, []);

  return (
    <>
      <div className="w-full flex flex-col gap-2 ">
        <div className="pl-1 pr-1">
          <Label htmlFor="title">Title</Label>
          <EditorInput type="text" id="title" placeholder="Profolyo" maxLength="25" value={getWidgetTitle(selectedWidget)} onChange={() => updateCardTitle(selectedWidget.i, event.target.value)} />
        </div>

        <Label htmlFor="image" className="mt-8">
          Cover Image
        </Label>
        <div className="relative cursor-pointer hover:opacity-80" onClick={handleInputFileRef}>
          <img src={getWidgetCoverImage(selectedWidget)} alt="cover" className="w-64 h-64 object-fit rounded-lg" />
          <Button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" variant="profolyoOutline">
            <RiUpload2Line className="h-4 w-4 text-black mr-2" />
            Upload Image
          </Button>
          <input type="file" onChange={handleFileChange} className="hidden" ref={avatarUploadFileRef} />
        </div>
      </div>
    </>
  );
};

export default ImagesContent;

import React, { useEffect, useState } from "react";
import ImageUploadBlock from "@admin/components/ImageUploadBlock.jsx";
import {
  getAllRoomsCategory,
  uploadCategoryImages,
} from "@api/roomsCategoryApi.js";
import { resolveMediaUrl } from "@utils/mediaUrl.js";

function CategoryImagesBlock({ roomsObj, setSuccessMessage, setRooms }) {
  const [bannerFile, setBannerFile] = useState(null);
  const [roomFiles, setRoomFiles] = useState([]);
  const [bannerPreview, setBannerPreview] = useState("");
  const [roomPreviews, setRoomPreviews] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setBannerFile(null);
    setRoomFiles([]);
    setBannerPreview(resolveMediaUrl(roomsObj?.bannerImg));
    setRoomPreviews(
      (roomsObj?.roomImages || []).map((img) => resolveMediaUrl(img)),
    );
  }, [roomsObj]);

  useEffect(() => {
    if (!bannerFile) {
      setBannerPreview(resolveMediaUrl(roomsObj?.bannerImg));
      return;
    }

    const objectUrl = URL.createObjectURL(bannerFile);
    setBannerPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [bannerFile, roomsObj?.bannerImg]);

  useEffect(() => {
    if (roomFiles.length === 0) {
      setRoomPreviews(
        (roomsObj?.roomImages || []).map((img) => resolveMediaUrl(img)),
      );
      return;
    }

    const objectUrls = roomFiles.map((file) => URL.createObjectURL(file));
    setRoomPreviews(objectUrls);
    return () => objectUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [roomFiles, roomsObj?.roomImages]);

  async function handleUpload() {
    if (!bannerFile && roomFiles.length === 0) {
      setSuccessMessage("Select at least one image to upload");
      setTimeout(() => setSuccessMessage(null), 2000);
      return;
    }

    const formData = new FormData();
    formData.append("_id", roomsObj._id);

    if (bannerFile) {
      formData.append("bannerImg", bannerFile);
    }

    roomFiles.forEach((file) => {
      formData.append("roomImages", file);
    });

    setIsUploading(true);
    try {
      const result = await uploadCategoryImages(roomsObj._id, formData);
      if (!result.success) {
        throw new Error(result.message);
      }

      const roomsData = await getAllRoomsCategory();
      if (roomsData.success) {
        setRooms(roomsData.data);
      }

      setBannerFile(null);
      setRoomFiles([]);
      setSuccessMessage(result.message);
      setTimeout(() => setSuccessMessage(null), 2000);
    } catch (error) {
      setSuccessMessage(error.message || "Image upload failed");
      setTimeout(() => setSuccessMessage(null), 2000);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="info-block category-images-block">
      <div className="room-block-header">
        <h3 className="info-block-title">Room Images</h3>
        <button
          type="button"
          className="info-block-btn"
          onClick={handleUpload}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload Images"}
        </button>
      </div>

      <div className="category-images-preview-grid">
        <div className="category-image-preview-item">
          <p className="category-image-preview-label">Banner Image</p>
          {bannerPreview ? (
            <img src={bannerPreview} alt={`${roomsObj.name} banner`} />
          ) : (
            <div className="category-image-placeholder">No banner image</div>
          )}
        </div>

        <div className="category-image-preview-item category-image-gallery">
          <p className="category-image-preview-label">Gallery Images</p>
          <div className="category-image-gallery-grid">
            {roomPreviews.length > 0 ? (
              roomPreviews.map((preview, index) => (
                <img
                  key={`${preview}-${index}`}
                  src={preview}
                  alt={`${roomsObj.name} gallery ${index + 1}`}
                />
              ))
            ) : (
              <div className="category-image-placeholder">No gallery images</div>
            )}
          </div>
        </div>
      </div>

      <div className="category-images-upload-fields">
        <ImageUploadBlock
          label="Replace banner image"
          onChange={(file) => setBannerFile(file)}
        />
        <ImageUploadBlock
          label="Replace gallery images (up to 4)"
          multiple
          onChange={(files) => setRoomFiles(files.slice(0, 4))}
        />
      </div>
    </div>
  );
}

export default CategoryImagesBlock;

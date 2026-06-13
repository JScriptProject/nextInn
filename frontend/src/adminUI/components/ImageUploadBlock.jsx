import React, { useId } from "react";

function ImageUploadBlock({ label, multiple = false, onChange, accept = "image/*" }) {
  const inputId = useId();

  return (
    <div className="category-image-upload-field">
      <label htmlFor={inputId} className="category-image-upload-label">
        {label}
      </label>
      <input
        id={inputId}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(event) => {
          const files = multiple
            ? Array.from(event.target.files || [])
            : event.target.files?.[0] || null;
          onChange(files);
        }}
      />
    </div>
  );
}

export default ImageUploadBlock;

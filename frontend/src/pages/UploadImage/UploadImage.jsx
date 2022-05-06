import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { uploadImage } from "../../features/images/imageSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function UploadImage() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [imageLocation, setImageLocation] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setImage(e.target.files[0]);

    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  const cancel = () => {
    setImage(null);
    setSelectedFile(null);
    setCaption("");
    setImageLocation("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (image === null) {
      toast.error("Please upload an image");
      return;
    } else {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("caption", caption);
      formData.append("imageLocation", imageLocation);

      dispatch(uploadImage(formData));

      window.location.reload(navigate("/upload-image"));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} data-testid="form">
        <div>
          <input type="file" onChange={handleChange} data-testid="image-upload-input" />
        </div>
        <div>
          <input
            type="text"
            placeholder="caption"
            required
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            data-testid="caption-input"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="imageLocation"
            required
            value={imageLocation}
            onChange={(e) => setImageLocation(e.target.value)}
            data-testid="image-location-input"
          />
        </div>
        {selectedFile && <img src={preview} alt="Preview" />}
        <div>
          <button onClick={cancel}>Cancel</button>
          <button type="submit" data-testid="upload-button">
            Upload
          </button>
        </div>
      </form>
    </div>
  );
}

export default UploadImage;

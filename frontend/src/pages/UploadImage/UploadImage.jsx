import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, reset } from "../../features/images/imageSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function UploadImage() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [imageLocation, setImageLocation] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setImage(e.target.files[0]);
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
      <form onSubmit={handleSubmit}>
        <div>
          <input type="file" onChange={handleChange} />
        </div>
        <div>
          <input
            type="text"
            placeholder="caption"
            required
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="imageLocation"
            required
            value={imageLocation}
            onChange={(e) => setImageLocation(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Upload</button>
        </div>
      </form>
    </div>
  );
}

export default UploadImage;

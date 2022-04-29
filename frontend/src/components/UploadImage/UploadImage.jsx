import { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadImage } from "../../features/images/imageSlice";

function UploadImage() {
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", image);
    dispatch(uploadImage(formData));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UploadImage;

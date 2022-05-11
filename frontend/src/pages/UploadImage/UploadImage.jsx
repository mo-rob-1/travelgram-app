import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { uploadImage } from "../../features/images/imageSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Section,
  Canvas,
  PreviewImage,
  Form,
  InputWrapper,
  Input,
  ButtonWrapper,
  Button,
  Wrapper,
  Title,
  ColOne,
  ColTwo,
  UploadInput,
} from "./UploadImage.styled";

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

      navigate("/");
    }
  };

  return (
    <Section>
      <Title>Upload Image</Title>
      <Form onSubmit={handleSubmit} data-testid="form">
        <ColOne>
          <div>
            <UploadInput
              type="file"
              onChange={handleChange}
              data-testid="image-upload-input"
              style={{ marginBottom: "1rem" }}
            />
          </div>

          <Wrapper>
            <InputWrapper>
              <label htmlFor="caption">Caption:</label>
              <br></br>
              <Input
                type="text"
                required
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                data-testid="caption-input"
              />
            </InputWrapper>
            <InputWrapper>
              <label htmlFor="image-location">Image Location:</label>
              <br></br>
              <Input
                type="text"
                required
                value={imageLocation}
                onChange={(e) => setImageLocation(e.target.value)}
                data-testid="image-location-input"
              />
            </InputWrapper>
          </Wrapper>
        </ColOne>

        <ColTwo>
          {!selectedFile ? <Canvas /> : <PreviewImage src={preview} alt="preview" data-testid="preview" />}

          <ButtonWrapper>
            <Button onClick={cancel}>Cancel</Button>
            <Button type="submit" data-testid="upload-button">
              Upload
            </Button>
          </ButtonWrapper>
        </ColTwo>
      </Form>
    </Section>
  );
}

export default UploadImage;

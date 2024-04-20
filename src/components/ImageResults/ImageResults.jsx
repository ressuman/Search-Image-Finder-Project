import PropTypes from "prop-types";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const ImageResults = ({ images }) => {
  const [open, setOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState("");

  const handleOpen = (img) => {
    setCurrentImg(img);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const imageListContent = images ? (
    <ImageList cols={4}>
      {images.map((img) => (
        <ImageListItem key={img.id}>
          <img
            srcSet={`${img.largeImageURL}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${img.largeImageURL}?w=164&h=164&fit=crop&auto=format`}
            alt={img.user}
            loading="lazy"
          />
          <ImageListItemBar
            title={img.tags}
            key={img.id}
            subtitle={
              <span>
                by &nbsp;<strong>{img.user}</strong>
              </span>
            }
            actionIcon={
              <IconButton
                sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                aria-label={`info about ${img.title}`}
                onClick={() => handleOpen(img.largeImageURL)}
              >
                <ZoomInIcon sx={{ color: "rgba(255, 255, 255, 0.54)" }} />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  ) : null;

  return (
    <>
      {imageListContent}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle align="center">Zoomed Image</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <img src={currentImg} alt="" style={{ width: "100%" }} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

ImageResults.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};

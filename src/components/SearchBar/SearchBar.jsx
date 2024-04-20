import axios from "axios";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { ImageResults } from "../ImageResults/ImageResults";

export const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [amount, setAmount] = useState(30);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.REACT_APP_PIXABAY_API_URL;
  const apiKey = process.env.REACT_APP_PIXABAY_API_KEY;

  useEffect(() => {
    setLoading(true);
    if (searchText === "") {
      setImages([]);
      setLoading(false);
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${apiUrl}/?key=${apiKey}&q=${searchText}&image_type=photo&per_page=${amount}&safesearch=true`
          );
          setImages(response.data.hits);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching images:", error);
          setError("Error fetching data. Please try again later.");
          setLoading(false);
        } finally {
          console.log("API request completed.");
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [searchText, amount]);

  const handleTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <div>
      {loading && (
        <div
          style={{ textAlign: "center", marginTop: "40px", fontSize: "2.2rem" }}
        >
          Loading...
        </div>
      )}
      {error && (
        <div
          style={{
            textAlign: "center",
            marginTop: "40px",
            color: "red",
            fontSize: "2.2rem",
          }}
        >
          {error}
        </div>
      )}
      <TextField
        variant="standard"
        label="Search For Images"
        onChange={handleTextChange}
        value={searchText}
        margin="normal"
        fullWidth
        sx={{
          "& input": {
            outline: "none",
            fontSize: "1rem",
            padding: "12px",
            transition: "all 0.3s ease",
            boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.4)",
            "&:focus": {
              outline: "auto",
              fontSize: "1rem",
              padding: "13px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.6)",
            },
          },
          margin: "0 auto",
          maxWidth: "100%",
        }}
      />
      <br />
      <FormControl
        variant="standard"
        sx={{
          mt: 4,
          mb: 6,
          "& .MuiInputLabel-root": {
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <InputLabel id="label-amount">Amount</InputLabel>
        <Select
          value={amount}
          id="label-amount"
          labelId="label-amount"
          label="Amount"
          onChange={handleAmountChange}
          sx={{
            minWidth: 300,
            alignSelf: "center",
            textAlign: "center",
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={200}>200</MenuItem>
        </Select>
      </FormControl>
      <br />
      {images.length > 0 && <ImageResults images={images} />}
    </div>
  );
};

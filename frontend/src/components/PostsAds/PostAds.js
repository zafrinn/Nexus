import React, { useState, useEffect, useRef } from "react";
import { Dropdown } from "react-bootstrap";
import arrow1 from "../../assets/PostAds/arrow1.png";
import arrow2 from "../../assets/PostAds/arrow2.png";
import arrow3 from "../../assets/PostAds/arrow3.png";
import uploadIcon from "../../assets/PostAds/upload_icon.png";
import { createAdvertisement } from "../../apiHelpers";

const PostAdsPage = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [dropdownOpenType, setDropdownOpenType] = useState(false);
  const [dropdownOpenLocation, setDropdownOpenLocation] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const dropdownRefType = useRef(null);
  const dropdownRefLocation = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRefType.current &&
        !dropdownRefType.current.contains(event.target)
      ) {
        setDropdownOpenType(false);
      }
      if (
        dropdownRefLocation.current &&
        !dropdownRefLocation.current.contains(event.target)
      ) {
        setDropdownOpenLocation(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSelectType = (type) => {
    setSelectedType(type);
    setDropdownOpenType(false);
  };

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    setDropdownOpenLocation(false);
  };

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    const selectedFilesArray = [...files];
    setSelectedFiles(selectedFilesArray);
    setImageFile(files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    const bodyData = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      price: parseFloat(document.getElementById("price").value),
      location: selectedLocation,
      categoryId: selectedType === "Items Wanted" ? 1 : 2,
      enabled: true,
    };
    const json = JSON.stringify(bodyData);
    const blob = new Blob([json], {
      type: "application/json",
    });

    formData.append("images", imageFile);
    formData.append("body", blob);

    if (
      !bodyData.title ||
      !bodyData.description ||
      isNaN(bodyData.price) ||
      !bodyData.location ||
      !imageFile
    ) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    if (bodyData.price < 0) {
      alert("Price cannot be negative.");
      return;
    }

    try {
      await createAdvertisement(formData);
    } catch (error) {
      console.error("Error creating advertisement:", error);
    }

    setSelectedType(null);
    setSelectedLocation(null);
    setSelectedFiles([]);
    setImageFile(null);
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 text-center">
          <div style={{ position: "relative", width: "100%" }}>
            <img
              src={arrow1}
              className="img-fluid smaller-arrow"
              alt="First Arrow"
            />
            <Dropdown
              show={dropdownOpenType}
              style={{
                position: "absolute",
                top: "100%",
                left: "15%",
                width: "70%",
                zIndex: 1000,
              }}
              ref={dropdownRefType}
            >
              <Dropdown.Toggle
                variant="success"
                id="dropdown-type"
                onClick={() => setDropdownOpenType(!dropdownOpenType)}
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  color: "black",
                  borderColor: "white",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.5)",
                }}
              >
                {selectedType ? selectedType : "Select Type"}
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: "100%" }}>
                <Dropdown.Item
                  onClick={() => handleSelectType("Items Wanted")}
                  value="1"
                  style={{ textAlign: "center" }}
                >
                  Items Wanted
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleSelectType("Items for Sale")}
                  value="2"
                  style={{ textAlign: "center" }}
                >
                  Items for Sale
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="col-md-4 text-center">
          <img
            src={arrow2}
            className="img-fluid smaller-arrow"
            alt="Second Arrow"
          />
          <div
            style={{
              marginTop: "-20px",
              width: "70%",
              marginLeft: "15%",
              backgroundColor: "white",
              color: "black",
              borderColor: "white",
              borderRadius: "10px",
              boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.5)",
              padding: "20px",
              height: "400px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h4 style={{ marginBottom: "166px", marginTop: "0" }}>Upload</h4>
            <img
              src={uploadIcon}
              alt="Upload"
              style={{
                width: "75px",
                height: "65px",
                marginBottom: "80px",
                marginTop: "-150px",
              }}
              onClick={handleFileUpload}
            />
            <span
              style={{
                color: "#003FA7",
                cursor: "pointer",
                textDecoration: "underline",
                marginBottom: "20px",
                marginTop: "-60px",
              }}
              onClick={handleFileUpload}
            >
              Browse Files
            </span>{" "}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileInputChange}
            />
            <div
              style={{
                fontSize: "12px",
                color: "#676767",
                marginTop: "-10px",
                marginBottom: "10px",
              }}
            >
              Supported formats: JPEG, PNG, GIF, JPG
            </div>
            <div>
              <h6>Selected File:</h6>
              <ul>
                {selectedFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4 text-center">
          <img
            src={arrow3}
            className="img-fluid smaller-arrow"
            alt="Third Arrow"
          />
          <div
            style={{
              marginTop: "-22.5px",
              width: "70%",
              marginLeft: "15%",
              backgroundColor: "white",
              color: "black",
              borderColor: "white",
              borderRadius: "10px",
              boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.5)",
              padding: "20px",
              height: "450px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h4 style={{ marginBottom: "20px", marginTop: "0" }}>
              Description
            </h4>
            <input
              id="title"
              type="text"
              placeholder="Title"
              style={{
                marginBottom: "10px",
                width: "100%",
                height: "15%",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />

            <input
              id="price"
              type="number" // Change type to "number"
              placeholder="Price"
              style={{
                marginBottom: "10px",
                width: "100%",
                height: "15%",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
              step="0.01"
              min="0"
            />

            <Dropdown
              show={dropdownOpenLocation}
              style={{ width: "100%", marginBottom: "10px" }}
              ref={dropdownRefLocation}
            >
              <Dropdown.Toggle
                variant="success"
                onClick={() => setDropdownOpenLocation(!dropdownOpenLocation)}
                style={{
                  borderRadius: "10px",
                  height: "70%",
                  width: "100%",
                  backgroundColor: "white",
                  color: "black",
                  borderColor: "white",
                  borderRadius: "5px",
                  padding: "8px",
                  border: "1px solid #ccc",
                }}
              >
                {selectedLocation ? selectedLocation : "Location"}
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ width: "100%", minWidth: "auto" }}>
                <Dropdown.Item
                  onClick={() => handleSelectLocation("Toronto")}
                  value="Toronto"
                  style={{ textAlign: "center" }}
                >
                  Toronto
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleSelectLocation("Mississauga")}
                  value="Mississauga"
                  style={{ textAlign: "center" }}
                >
                  Mississauga
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleSelectLocation("Brampton")}
                  value="Brampton"
                  style={{ textAlign: "center" }}
                >
                  Brampton
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleSelectLocation("Markham")}
                  value="Markham"
                  style={{ textAlign: "center" }}
                >
                  Markham
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleSelectLocation("Vaughan")}
                  value="Vaughan"
                  style={{ textAlign: "center" }}
                >
                  Vaughan
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleSelectLocation("Oakville")}
                  value="Oakville"
                  style={{ textAlign: "center" }}
                >
                  Oakville
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleSelectLocation("Richmond Hill")}
                  value="Richmond Hill"
                  style={{ textAlign: "center" }}
                >
                  Richmond Hill
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleSelectLocation("Scarborough")}
                  value="Scarborough"
                  style={{ textAlign: "center" }}
                >
                  Scarborough
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleSelectLocation("Etobicoke")}
                  value="Etobicoke"
                  style={{ textAlign: "center" }}
                >
                  Etobicoke
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleSelectLocation("North York")}
                  value="North York"
                  style={{ textAlign: "center" }}
                >
                  North York
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleSelectLocation("Ajax")}
                  value="Ajax"
                  style={{ textAlign: "center" }}
                >
                  Ajax
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleSelectLocation("Pickering")}
                  value="Pickering"
                  style={{ textAlign: "center" }}
                >
                  Pickering
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <textarea
              id="description"
              rows="4"
              placeholder="Description"
              style={{
                marginBottom: "10px",
                width: "100%",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <button
              className="btn btn-primary mt-4"
              style={{ backgroundColor: "rgb(134, 158, 207)", border: "none" }}
              onClick={handleSubmit}
              disabled={
                !selectedType || // Disable if selectedType is null
                !imageFile || // Disable if imageFile is null
                !document.getElementById("title").value || // Disable if title is not entered
                !document.getElementById("description").value || // Disable if description is not entered
                !document.getElementById("price").value || // Disable if price is not entered
                isNaN(parseFloat(document.getElementById("price").value)) || // Disable if price is not a number
                parseFloat(document.getElementById("price").value) < 0 || // Disable if price is less than or equal to 0
                !selectedLocation // Disable if selectedLocation is null
              }
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostAdsPage;

import React, { useState, useEffect, useRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import arrow1 from './arrow1.png';
import arrow2 from './arrow2.png';
import arrow3 from './arrow3.png';
import uploadIcon from './upload_icon.png'; 

const PostAdsPage = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null); // Changed from selectedCategory
  const [dropdownOpenType, setDropdownOpenType] = useState(false);
  const [dropdownOpenLocation, setDropdownOpenLocation] = useState(false); // Changed from dropdownOpenCategory
  const [selectedFiles, setSelectedFiles] = useState([]);
  const dropdownRefType = useRef(null);
  const dropdownRefLocation = useRef(null); // Changed from dropdownRefCategory
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRefType.current && !dropdownRefType.current.contains(event.target)) {
        setDropdownOpenType(false);
      }
      if (dropdownRefLocation.current && !dropdownRefLocation.current.contains(event.target)) { // Changed from dropdownRefCategory
        setDropdownOpenLocation(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSelectType = (type) => {
    setSelectedType(type);
    setDropdownOpenType(false); // Close the dropdown after selection
  };

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    setDropdownOpenLocation(false); // Close the dropdown after selection
  };
  

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    const selectedFilesArray = [...files];
    setSelectedFiles(selectedFilesArray);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 text-center">
          <div style={{ position: 'relative', width: '100%' }}>
            <img src={arrow1} className="img-fluid smaller-arrow" alt="First Arrow" />
            <Dropdown
              show={dropdownOpenType}
              style={{
                position: 'absolute',
                top: '100%',
                left: '15%',
                width: '70%', 
                zIndex: 1000
              }}
              ref={dropdownRefType}
            >
              <Dropdown.Toggle
                variant="success"
                id="dropdown-type"
                onClick={() => setDropdownOpenType(!dropdownOpenType)}
                style={{
                  width: '100%',
                  backgroundColor: 'white',
                  color: 'black',
                  borderColor: 'white',
                  borderRadius: '10px', 
                  boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.5)' 
                }}
              >
                {selectedType ? selectedType : 'Select Type'}
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: '100%' }}> 
                <Dropdown.Item onClick={() => handleSelectType("Items Wanted")} value="1" style={{ textAlign: 'center' }}>Items Wanted</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSelectType("Items for Sale")} value="2" style={{ textAlign: 'center' }}>Items for Sale</Dropdown.Item>
              </Dropdown.Menu>

            </Dropdown>
          </div>
        </div>
        <div className="col-md-4 text-center"> 
          <img src={arrow2} className="img-fluid smaller-arrow" alt="Second Arrow" />
          <div style={{ marginTop: '-20px', width: '70%', marginLeft:'15%',  backgroundColor: 'white', color: 'black', borderColor: 'white', borderRadius: '10px', boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.5)', padding: '20px', height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}> 
            <h4 style={{ marginBottom: '166px', marginTop: '0' }}>Upload</h4>
            <img src={uploadIcon} alt="Upload" style={{ width: '75px', height: '65px', marginBottom: '80px', marginTop: '-150px' }} onClick={handleFileUpload} />
            <span style={{ color: '#003FA7', cursor: 'pointer', textDecoration: 'underline', marginBottom: '20px', marginTop: '-60px'}} onClick={handleFileUpload}>Browse Files</span> <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileInputChange} />
            <div style={{ fontSize: '12px', color: '#676767', marginTop: '-10px', marginBottom: '10px' }}>Supported formats: JPEG, PNG, GIF, JPG</div>
            <div>
              <h6>Selected File:</h6>
              <ul>
                {selectedFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
            <button className="btn btn-primary mt-4"  style={{ backgroundColor: 'rgb(134, 158, 207)', border: 'none' }}>Upload Image</button>
          </div>
        </div>
        <div className="col-md-4 text-center"> 
          <img src={arrow3} className="img-fluid smaller-arrow" alt="Third Arrow" />
          <div style={{ marginTop: '-22.5px', width: '70%', marginLeft:'15%', backgroundColor: 'white', color: 'black', borderColor: 'white', borderRadius: '10px', boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.5)', padding: '20px', height: '450px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}> 
            <h4 style={{ marginBottom: '20px', marginTop: '0' }}>Description</h4>
            <input type="text" placeholder="Title" style={{ marginBottom: '10px', width: '100%', height: '15%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
            <input type="text" placeholder="Price" style={{ marginBottom: '10px', width: '100%',height: '15%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />

            <Dropdown
              show={dropdownOpenLocation} 
              style={{ width: '100%', marginBottom: '10px' }}
              ref={dropdownRefLocation} 
            >
              <Dropdown.Toggle variant="success" onClick={() => setDropdownOpenLocation(!dropdownOpenLocation)} style={{ borderRadius: '10px', height: '70%', width: '100%', backgroundColor: 'white', color: 'black', borderColor: 'white', borderRadius: '5px', padding: '8px', border: '1px solid #ccc' }}>
                {selectedLocation ? selectedLocation : 'Location'}
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ width: '100%', minWidth: 'auto' }}> 
                <Dropdown.Item onClick={() => handleSelectLocation("Toronto")} value="Toronto" style={{ textAlign: 'center' }}>Toronto</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSelectLocation("Mississauga")} value="Mississauga" style={{ textAlign: 'center' }}>Mississauga</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSelectLocation("Brampton")} value="Brampton" style={{ textAlign: 'center' }}>Brampton</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSelectLocation("Markham")} value="Markham" style={{ textAlign: 'center' }}>Markham</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSelectLocation("Vaughan")} value="Vaughan" style={{ textAlign: 'center' }}>Vaughan</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSelectLocation("Oakville")} value="Oakville" style={{ textAlign: 'center' }}>Oakville</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSelectLocation("Richmond Hill")} value="Richmond Hill" style={{ textAlign: 'center' }}>Richmond Hill</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSelectLocation("Scarborough")} value="Scarborough" style={{ textAlign: 'center' }}>Scarborough</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSelectLocation("Etobicoke")} value="Etobicoke" style={{ textAlign: 'center' }}>Etobicoke</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSelectLocation("North York")} value="North York" style={{ textAlign: 'center' }}>North York</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSelectLocation("Ajax")} value="Ajax" style={{ textAlign: 'center' }}>Ajax</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSelectLocation("Pickering")} value="Pickering" style={{ textAlign: 'center' }}>Pickering</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>


            <textarea placeholder="Description" style={{ marginBottom: '10px', width: '100%', height: '40%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
            <button className="btn btn-primary mt-4" style={{ backgroundColor: 'rgb(134, 158, 207)', border: 'none' }}>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostAdsPage;

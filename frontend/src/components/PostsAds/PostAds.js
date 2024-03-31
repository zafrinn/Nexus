import React, { useState, useEffect, useRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import arrow1 from './arrow1.png';
import arrow2 from './arrow2.png';
import arrow3 from './arrow3.png';
import uploadIcon from './upload_icon.png'; 

const PostAdsPage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSelectOption = (option) => {
    console.log('Selected option:', option);
    setDropdownOpen(false);
  };

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log('Selected file:', selectedFile);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 text-center">
          <div style={{ position: 'relative', width: '100%' }}>
            <img src={arrow1} className="img-fluid smaller-arrow" alt="First Arrow" />
            <Dropdown
              show={dropdownOpen}
              style={{
                position: 'absolute',
                top: '100%',
                left: '15%',
                width: '70%', 
                zIndex: 1000
              }}
              onSelect={handleSelectOption}
              ref={dropdownRef}
            >
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  width: '100%',
                  backgroundColor: 'white',
                  color: 'black',
                  borderColor: 'white',
                  borderRadius: '10px', 
                  boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.5)' 
                }}
              >
                Select Type
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: '100%' }}> 
                <Dropdown.Item eventKey="Items Wanted" style={{ textAlign: 'center' }}>Items Wanted</Dropdown.Item>
                <Dropdown.Item eventKey="Items for Sale" style={{ textAlign: 'center' }}>Items for Sale</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="col-md-4 text-center"> 
          <img src={arrow2} className="img-fluid smaller-arrow" alt="Second Arrow" />
          <div style={{ marginTop: '-20px', width: '70%', marginLeft:'15%',  backgroundColor: 'white', color: 'black', borderColor: 'white', borderRadius: '10px', boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.5)', padding: '20px', height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}> 
            <h4 style={{ marginBottom: '166px', marginTop: '0' }}>Upload</h4>
            <img src={uploadIcon} alt="Upload" style={{ width: '75px', height: '65px', marginBottom: '100px', marginTop: '-90px' }} onClick={handleFileUpload} />
            <span style={{ color: '#003FA7', cursor: 'pointer', textDecoration: 'underline', marginBottom: '20px', marginTop: '-60px'}} onClick={handleFileUpload}>Browse Files</span> <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileInputChange} />
            <div style={{ fontSize: '12px', color: '#676767', marginTop: '-10px', marginBottom: '10px' }}>Supported formats: JPEG, PNG, GIF, JPG</div>
            <button className="btn btn-primary mt-4"  style={{ backgroundColor: 'rgb(134, 158, 207)', border: 'none' }}>Upload Image</button>
          </div>
        </div>
        <div className="col-md-4 text-center"> 
          <img src={arrow3} className="img-fluid smaller-arrow" alt="Third Arrow" />
          <div style={{ marginTop: '-22.5px', width: '70%', marginLeft:'15%', backgroundColor: 'white', color: 'black', borderColor: 'white', borderRadius: '10px', boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.5)', padding: '20px', height: '450px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}> 
            <h4 style={{ marginBottom: '20px', marginTop: '0' }}>Description</h4>
            <input type="text" placeholder="Title" style={{ marginBottom: '10px', width: '100%', height: '15%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
            <input type="text" placeholder="Price" style={{ marginBottom: '10px', width: '100%',height: '15%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
            <input type="text" placeholder="Location" style={{  marginBottom: '10px', width: '100%', height: '15%',padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
            <Dropdown style={{ width: '100%', marginBottom: '10px' }}>
              <Dropdown.Toggle variant="success" style={{ borderRadius: '10px', height: '70%', width: '100%', backgroundColor: 'white', color: 'black', borderColor: 'white', borderRadius: '5px', padding: '8px', border: '1px solid #ccc' }}>
                Category
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ width: '100%', minWidth: 'auto' }}> 
                <Dropdown.Item style={{ textAlign: 'center' }}>Category 1</Dropdown.Item>
                <Dropdown.Item style={{ textAlign: 'center' }}>Category 2</Dropdown.Item>
                <Dropdown.Item style={{ textAlign: 'center' }}>Category 3</Dropdown.Item>
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

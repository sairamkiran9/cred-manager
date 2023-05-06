import { useParams } from 'react-router-dom';
import React from 'react';

function Url() {
  const { url } = useParams(); // parses userId parameter from route
  // Do something with the userId, e.g. fetch user data from API
  
  return (
    <div>
      <h2>User Details</h2>
      <p>UserID: {url}</p>
      {/* Other user details */}
    </div>
  );
}

export default Url;
// import React, { useState } from "react";
// import axios from "axios";
// import { Form, Button, Row, Col } from "react-bootstrap";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import { Contactformvalidation } from "./Contactformvalidation";

// interface ContactProps {
//   active: boolean;
// }

// const Contact: React.FC<ContactProps> = ({ active }) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [contact1, setContact1] = useState("");

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:8000/contact", {
//         name,
//         email,
//         contact1,
//         message,
//       });

//       console.log("Message sent successfully!");

//       setName("");
//       setEmail("");
//       setContact1("");
//       setMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   const mapContainerStyle = {
//     width: "100%",
//     height: "450px",
//     border: "1px solid #ccc",
//     borderRadius: "5px",
//     padding: "10px",
//     paddingLeft: "5px", // Added padding to the left side
//     marginBottom: "20px", // Added margin at the bottom
//   };

//   const contactContainerStyle = {
//     width: "100%",
//     height: "450px",
//     border: "1px solid #ccc",
//     borderRadius: "5px",
//     padding: "10px",
//     paddingLeft: "10px", // Added padding to the right side
//     marginBottom: "20px", // Added margin at the bottom
//   };

//   const center = {
//     lat: 40.7128,
//     lng: -74.006,
//   };

//   return (
//     <div id="contact" className={`contacts-page ${active ? "active" : ""}`}>
//       <Row>
//         <Col md={6} lg={6} xl={6}>
//           <h1 className="text-center">Google Map</h1>
//           <div style={mapContainerStyle}>
//             <LoadScript googleMapsApiKey="YOUR_API_KEY">
//               <GoogleMap
//                 mapContainerStyle={{ height: "100%" }}
//                 center={center}
//                 zoom={10}
//               >
//                 <Marker position={center} />
//               </GoogleMap>
//             </LoadScript>
//           </div>
//         </Col>
//         <Col md={6} lg={6} xl={6}>
//           <h1 className="text-center">Contact Us</h1>
//           <Form
//             onSubmit={handleSubmit}
//             className="form-border"
//             style={contactContainerStyle}
//           >
//             <Form.Group controlId="formName">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter your name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </Form.Group>

//             <Form.Group controlId="formEmail">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </Form.Group>

//             <Form.Group controlId="formContact">
//               <Form.Label>Contact No.</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter your contact number"
//                 value={contact1}
//                 onChange={(e) => setContact1(e.target.value)}
//               />
//             </Form.Group>

//             <Form.Group controlId="formMessage">
//               <Form.Label>Message</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={5}
//                 placeholder="Enter your message"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//               />
//             </Form.Group>

//             <Button variant="primary" type="submit">
//               Submit
//             </Button>
//           </Form>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default Contact;


import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Row, Col } from "react-bootstrap";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface ContactProps {
  active: boolean;
}

const Contact: React.FC<ContactProps> = ({ active }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [contact1, setContact1] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    contact1: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await axios.post("http://localhost:8000/contact", {
          name,
          email,
          contact1,
          message,
        });

        console.log("Message sent successfully!");

        setName("");
        setEmail("");
        setContact1("");
        setMessage("");
        setErrors({
          name: "",
          email: "",
          contact1: "",
          message: "",
        });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
  
    const newErrors = { ...errors };
  
    if (!name) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      newErrors.name = "Name should only contain letters and spaces";
      isValid = false;
    } else {
      newErrors.name = "";
    }
  
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    } else {
      newErrors.email = "";
    }
  
    if (!contact1) {
      newErrors.contact1 = "Contact number is required";
      isValid = false;
    } else if (!/^\d{8}$/.test(contact1) && !/^\d{10}$/.test(contact1)) {
      newErrors.contact1 = "Contact number should be 8 or 10 digits";
      isValid = false;
    } else {
      newErrors.contact1 = "";
    }
  
    if (!message) {
      newErrors.message = "Message is required";
      isValid = false;
    } else {
      newErrors.message = "";
    }
  
    setErrors(newErrors);
  
    return isValid;
  };
  

  const mapContainerStyle = {
    width: "100%",
    height: "450px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    paddingLeft: "5px",
    marginBottom: "20px",
  };

  const contactContainerStyle = {
    width: "100%",
    height: "450px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    paddingLeft: "10px",
    marginBottom: "20px",
  };

  const center = {
    lat: 40.7128,
    lng: -74.006,
  };

  return (
    <div id="contact" className={`contacts-page ${active ? "active" : ""}`}>
      <Row>
        <Col md={6} lg={6} xl={6}>
          <h1 className="text-center">Google Map</h1>
          <div style={mapContainerStyle}>
            <LoadScript googleMapsApiKey="YOUR_API_KEY">
              <GoogleMap
                mapContainerStyle={{ height: "100%" }}
                center={center}
                zoom={10}
              >
                <Marker position={center} />
              </GoogleMap>
            </LoadScript>
          </div>
        </Col>
        <Col md={6} lg={6} xl={6}>
          <h1 className="text-center">Contact Us</h1>
          <Form
            onSubmit={handleSubmit}
            className="form-border"
            style={contactContainerStyle}
          >
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formContact">
              <Form.Label>Contact No.</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your contact number"
                value={contact1}
                onChange={(e) => setContact1(e.target.value)}
                isInvalid={!!errors.contact1}
              />
              <Form.Control.Feedback type="invalid">
                {errors.contact1}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                isInvalid={!!errors.message}
              />
              <Form.Control.Feedback type="invalid">
                {errors.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Contact;

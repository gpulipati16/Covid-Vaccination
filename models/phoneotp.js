import React, {useState} from 'react';
import { Alert ,Button,Form, FormControl} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input';
//import { useUserAuth } from '../context/UserAuthContext';
import { useUserAuth } from '../UserAuthContext';
import {toast} from 'react-toastify';
//import './NavbarPages \
import { database } from '../firebase';
import { doc,getDoc } from 'firebase/firestore';

const PhoneSignUp = () => {

    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [otp,setOtp] = useState("");
    const [flag, setFlag] = useState(false);
    const [confirmObj,setConfirmObj] = useState("");
    const {setUpRecaptcha} = useUserAuth();
    const navigate = useNavigate();

    const getOtp = async (e) => {
        e.preventDefault();
        setError("");
        if(number === "" || number === undefined)
            return setError("Please Enter a valid Mobile Number!");
        
        try {
            const response = await setUpRecaptcha(number);
            setConfirmObj(response);
            setFlag(true);

            var arr=email.split('@');
            var userId = arr[0];

          const docRef = doc(database, "rollno", userId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            var rl=docSnap.data().rollno;
            var name=docSnap.data().name;
            console.log("rool no = ",rl);
            localStorage.setItem("email",email);
            localStorage.setItem("name",name);
            localStorage.setItem("rollno",rl);
            localStorage.setItem("id",userId);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }

        } catch (err) {
            setError(err.message);
        }
        
        
    }     

    const verifyOtp = async (e) => {
        e.preventDefault();
    
        if(otp === "" || otp === null)
        {
            return;
        }

        try {
            setError("");
           await confirmObj.confirm(otp);
           navigate("/home");
           toast.success("Signup Successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            }); 

            
        } catch (err) {
            setError(err.message);
            toast.error("Wrong Email or passowrd!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }

    }

  return (
    <div className='q'>
      <div className="p-4 box">
            
            <h2 className="mb-3">Firebase Phone Auth Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>

            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Email address" onChange={(e) => setEmail(e.target.value)}/>
          </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                <PhoneInput  defaultCountry='IN' value={number} onChange={setNumber} placeholder = "Enter Phone Number"/>
                <div id='recaptcha-container'/>
            </Form.Group>
          
            <div className='button-left'>
                {/* <Link to='/'> <Button variant='secondary'>Cancel</Button>   </Link> */}
                <Link to='/login'> <Button variant='secondary'>Cancel</Button>   </Link>
                <Button variant='primary' type='submit'>Send OTP</Button>
            </div>
            </Form>

            <Form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }}>
            <Form.Group className="mb-3 mt-3" controlId="formBasicotp">
              <FormControl type='otp' placeholder='Enter OTP' onChange={(e) => setOtp(e.target.value)} />
            </Form.Group>
          
            <div className='button-right'>
                {/* <Link to='/'> <Button variant='secondary'>Cancel</Button>   </Link> */}
                <Link to='/login'> <Button variant='secondary'>Cancel</Button>   </Link>
                <Button variant='primary' type='submit'>Verify OTP</Button>
            </div>
            </Form>
       </div>   
    </div>    

    
  )
}

export default PhoneSignUp;

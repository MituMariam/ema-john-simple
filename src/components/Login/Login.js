
import React, { useContext, useState} from "react";
import { useHistory, useLocation } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { UserContext } from "../../App";

firebase.initializeApp(firebaseConfig);
// if( firebase.apps.length === 0 ){
//   firebase.initializeApp(DB_CONFIG);
// }

function Login() {
  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password:"",
    photo: ""
    // error:'',
    // success:false
  });
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignin = () => {
    console.log("click");
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { displayName, photoURL, email } = result.user;
        const signedInuser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(signedInuser);
        console.log(displayName, photoURL, email);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
        // // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // // The email of the user's account used.
        // var email = error.email;
        // // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // ...
      });
  };

  const handleSignOut = () => {
    console.log("sign out");
    firebase
      .auth()
      .signOut()
      .then((res) => {
        // Sign-out successful.
        const signedOutUser = {
          isSignedIn: false,
          name: "",
          email: "",
          photo: "",
        };
        setUser(signedOutUser);
      })
      .catch((error) => {
        // An error happened.
      });
  };


  const handleBlur = (e) =>{
    // debugger;
    let isFormValid = true;
    console.log(e.target.name, e.target.value);
    if(e.target.name === 'email'){
     isFormValid = /\S+@\S+\.\S+/.test(e.target.value); 
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passHasNum = /\d{1}/.test(e.target.value);
      isFormValid = isPasswordValid && passHasNum;

    }
    if(isFormValid){
      // [...cart,newItem]
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo)
    }
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
if(newUser && user.email && user.password){
  firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
  .then(res =>{
    const newUserInfo = {...user};
    newUserInfo.error= "";
    newUserInfo.success= true;
    setUser(newUserInfo);
    updateUserName(user.name)
  })
  .catch((error) => {
   //error handle
   const newUserInfo = {...user};
   newUserInfo.error= error.message;
   newUserInfo.success= false;
   setUser(newUserInfo);
   console.log();
  });
  if(!newUser && user.email && user.password){
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
  .then(res=> {
    const newUserInfo = {...user};
    newUserInfo.error= "";
    newUserInfo.success= true;
    setUser(newUserInfo);
    setLoggedInUser(newUserInfo);
    history.replace(from);
    
    console.log('sign in user info', res.user);

  })
  .catch((error) => {
       //error handle
   const newUserInfo = {...user};
   newUserInfo.error= error.message;
   newUserInfo.success= false;
   setUser(newUserInfo);
  });
  }
}
  }
  const updateUserName = name =>{

    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name,
    }).then(function() {
      // Update successful.
      console.log('user name updated successfully');
    }).catch(function(error) {
      // An error happened.
    });
  }
  return (
    <div className="App">
      {user.isSignedIn ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <button onClick={handleSignin}>Sign in</button>
      )}
      {user.isSignedIn && (
        <div>
          <p>welcome, {user.name}</p>
          <p> {user.email}</p>
          <p>{user.photo}</p>
          <img src={user.photo} alt="" />
        </div>
      )}


      <div>
        <h1>Our own Authentication</h1>
        <input name="newUser" id="" type="checkbox" onChange={() => setNewUser(!newUser)}/>
        <label htmlFor="newUser">New User Sign up</label>
        {/* <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Password:{user.password}</p> */}
        <form onSubmit={handleSubmit}>
        {newUser &&  <input onChange={handleBlur} name="name" type="text" placeholder="Name"/>}<br/>
          <input onChange={handleBlur} name="email" type="text" placeholder="Email"/><br/>
          <input onChange={handleBlur} name="password" type="password" placeholder="Password"/><br/>
          <input type="submit" value={newUser ? "Sign Up":"Login"}/>
        </form>
        <p style={{color:'red'}}> {user.error}</p>
        {user.success &&<p style={{color:'green'}}> User {newUser ? 'created':'LoggedIn'} successfully</p>}
      </div>
    </div>
  );
}

export default Login;

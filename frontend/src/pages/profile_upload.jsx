import React from 'react'
// import hero from "../images/hero.webp"; 
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../../store/auth"
import { useState } from "react";
import axios from "axios"

export const Profile = () => {


    const defaultContactFormData = {
        username: "",
        email: "",
        fullname: "",
        gender: "",
        phonenumber: "",
        avater: ""
      };

      const { user } = useAuth()  

      const [contact, setContact] = useState(defaultContactFormData)
      const [userData, setUserData] = useState(true)


      if(userData && user){
        setContact({
            username: user.userName,
            email: user.email,
            fullname: user.fullName,
            phonenumber: user.phoneNumber,
            gender: user.gender,
            avater: user.avater
        })
        setUserData(false)
      }
      

      const [uploadImg, setUploadImg] = useState("")
      const [img, setImg] = useState("")
   
      const handleImage = (e) => {
          const image = e.target.files[0]
          setUploadImg(URL.createObjectURL(image))
          setImg(image)
      }

      // upload Image

      const uploadMyImage = async () => {

        const formdata = new FormData()
        formdata.append("avater", img)


        try {
          const res = await axios.post("http://localhost:5000/api/auth/upload", formdata)
          return (res.data)
        } catch (error) {
          console.log(error);
        }
      }

      const changeProfile = async (e) => {
        e.preventDefault()

        const myImage = await uploadMyImage()
        try {
          const res = await axios.put(`http://localhost:5000/api/auth/update/${user._id}`, {
            avater: myImage
          })
          console.log(res.data);
        } catch (error) {
          console.log("Error in change profile Picture",error);
        }

      }





  return (
    <>
    <section className="section about-section gray-bg" id="about">
            <div className="container">
                <div className="row align-items-center flex-row-reverse">
                    <div className ="col-lg-6">
                        <div className="about-text go-to">
                            <h3 className="dark-color">User profile</h3>
                            <h6 className="theme-color lead">A Lead UX &amp; UI designer based in Canada</h6>
                            <div className="row about-list">
                                <div className="row-md-8">
                                    <div className="media">
                                        <label>FullName</label>
                                        <p>{contact.fullname}</p>
                                    </div>
                                    <div className="media">
                                        <label>Username</label>
                                        <p>{contact.username}</p>
                                    </div>
                                    <div className="media">
                                        <label>Gender</label>
                                        <p>{contact.gender}</p>
                                    </div>
                                    
                                </div>
                                <div className="col-md-6">
                                    <div className="media">
                                        <label>E-mail</label>
                                        <p>{contact.email}</p>
                                    </div>
                                    <div className="media">
                                        <label>Phone</label>
                                        <p>{contact.phonenumber}</p>
                                    </div>
                                    
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="col-lg-6" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                <p>Want to upload new Image Click on the icon</p>
                        <div className="about-avatar" style={{ position: 'relative' }}>
                        
                            {
                              (contact.avater === "") ? (

                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" title="" alt="" /> 
                              ) :
                              (
                            <img  className = "pic1" src= {uploadImg? uploadImg: `/uploads/${contact.avater}`} title="" alt="profile" />

                              )
                            }

                           

                            
                        
                            
                            {/* <img style={{"maxWidth": "20%", "maxHeight": "20%"}} src="/images/icon.png" alt="icon Pic" srcset=""   />  */}
                            <label htmlFor="fileInput">
                            <img style={{ maxWidth: 70, maxHeight: 70, cursor: "pointer" }} src="/images/icon.png" alt="icon Pic"  />
                        </label>
                        <input id="fileInput" type="file" style={{ display: "none" }} name = "avater" onChange={handleImage} />
                        <button style={{"padding": 15, marginTop: 10, }} type="submit" onClick = {changeProfile} >Upload</button>
                        </div>
                        

                        

                        
                    </div>  
                    
                
            </div>
        </section>
    </>
  )
}


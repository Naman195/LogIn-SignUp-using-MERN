import { useAuth } from "../../store/auth"
import { useState } from "react";
// import  avater from "../../public/images/login.png"
import axios from "axios"

export const User = () => {


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
      // console.log(user._id);
      



      // Change uploaded image
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

    <div>
    <h1>Profile Upload</h1>
            <br />
                
                <input type = "file" name = "avater"
                    onChange={handleImage}

                 />
                
                 <button 
                 style={{'margin': '5px', 'backgroundColor':'lightblue'}}
                 type = "submit"
                 onClick = {changeProfile} 
                 

                 >Upload</button>

                 <br />
    </div>
    <div className="container">
        {/* <img src= {uploadImg? uploadImg:  `frontend/src/assets/uploads/${contact.avater}`} alt="ProfileImage"  /> */}
        <img src= {uploadImg? uploadImg: `/uploads/${contact.avater}`} alt="ProfileImage"  />
    </div>
    <div className="container">
      <h1 className="">User Profile</h1>
      <br />
      
      <div>

      <h2>FullName: <h3>{contact.fullname}</h3> </h2>
    
      </div>
      <br />
      
      <div >

      <h2>UserName: <h3>{contact.username}</h3> </h2>
      
      </div>
      <div>
      <h2>Email: <h3>{contact.email}</h3> </h2>
      

      </div>
      <div>
      <h2>PhoneNumber: <h3>{contact.phonenumber}</h3> </h2>
      

      </div>
      <div>

      <h2>Gender: <h3>{contact.gender}</h3> </h2>
      </div>
     


    </div>
       


     </>
   


)
}



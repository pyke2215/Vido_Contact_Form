import { useState } from "react";
import Selector from "../../components/Selector";
import crm from "../../config/axios";
import getFirstLastName from "../../utils/ApartName";
import moment from 'moment';
const RequestToCrm = async (props) => {
    const {fullname, phone, email, birthday, career, message} = props;
    const flName = fullname.split(" ");
    const body = {
      data: {
        'firstname': flName.slice(-1)[0],
        'lastname': flName.slice(0, -1).join(" "),
        'mobile': phone,
        'email': email,
        'birthday': moment(birthday).format("DD/MM/YYYY"),
        'training_industry_1': career,
        'consulting_content': message,
        'date_added': moment(new Date()).format("YYYY/MM/DD"),
        'cptarget_source': "website",
        'assigned_user_id': "Users:52"
      }
    }
    await crm.get("auth", {
        params: {
            "username": "giaotran",
            "access_key_md5": "969677b1d7f282346b93c81b26e421f1"
        }
    }).then(async (res) => {
        await crm.post("create?module=CPTarget", body, {
            headers: {
                "Access-Token": res.data?.access_token
            }
        }).then((res)=> {   
            console.log(res.data); 
            if(res.data.success === "1"){
                alert("Đăng kí thàn công, Cao Đẳng Viển Đông xin chân thành cảm ơn")
            }
        }).catch((error) => console.log("Post CRM: ", error));
    }).catch((error) => console.log("Get CRM: ", error));
}

const ContactForm = () =>{
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        birthday: '',
        phone: '',
        career: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name);
        console.log(value);
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { fullname, email, birthday, phone, career, message } = formData;
        console.log(career);
        RequestToCrm({
            fullname,
            phone,
            email,
            birthday,
            career,
            message
        });
    };
    return (
        <>
        <div class="content">
            <div class="container">
            <div class="row align-items-stretch no-gutters contact-wrap">
                <div class="col-md-6">
                <div class="form h-100">
                    <h3>Send us a message</h3>
                    <form class="mb-5" method="post" id="contactForm" name="contactForm" onSubmit={handleSubmit}>
                    <div class="row">
                        <div class="col-md-6 form-group mb-5">
                        <label for="" class="col-form-label">Họ Và Tên *</label>
                        <input type="text" class="form-control" name="fullname" id="fullname" placeholder="Họ và tên" onChange={handleChange}/>
                        </div>
                        <div class="col-md-6 form-group mb-5">
                        <label for="" class="col-form-label">Email *</label>
                        <input type="text" class="form-control" name="email" id="email"  placeholder="Your email" onChange={handleChange}/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 form-group mb-5">
                        <label for="" class="col-form-label">Ngày Sinh *</label>
                        <input type="date" class="form-control" name="birthday" id="birthday" placeholder="Ngày sinh" onChange={handleChange}/>
                        </div>
                        <div class="col-md-6 form-group mb-5">
                        <label for="" class="col-form-label">Số Điện Thoại</label>
                        <input type="text" class="form-control" name="phone" id="phone"  placeholder="số điện thoại #" onChange={handleChange}/>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12 form-group mb-5">
                        <label for="career" class="col-form-label">Career</label>
                        <Selector onChange={handleChange}/>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12 form-group mb-5">
                        <label for="message" class="col-form-label">Message *</label>
                        <textarea class="form-control" name="message" id="message" cols="30" rows="4"  placeholder="Write your message" onChange={handleChange}></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 form-group">
                        <input type="submit" value="Send Message" class="btn btn-primary rounded-0 py-2 px-4"/>
                        <span class="submitting"></span>
                        </div>
                    </div>
                    </form>

                    <div id="form-message-warning mt-4"></div> 
                    <div id="form-message-success">
                    Your message was sent, thank you!
                    </div>

                </div>
                </div>
                <div class="col-md-6">
                <div class="contact-info h-100">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4695635807325!2d106.62562117390917!3d10.851845557800393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752a2769eec849%3A0xc623b505cddae0bf!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIFZp4buFbiDEkMO0bmc!5e0!3m2!1svi!2s!4v1714961306545!5m2!1svi!2s" width="500" height="450" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
                </div>
            </div>
            </div>

        </div>
        </>
    );
};

export default ContactForm;
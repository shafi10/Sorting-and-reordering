import React,{ useState} from 'react'

export const UpdateData = () => {

    const [formData, setFormData ] = useState({
        name:'',
        message:'',
        created_at:'',
    });

    const {name , message , created_at } = formData
   const onChange = e => setFormData({...formData, [e.target.name]:e.target.value});
   const onSubmit = async e => {
       e.preventDefault();
   }

    return (
        <div className="hero">
            <form className="box" onSubmit = {e => onSubmit(e)}>
              <h1>Update Data</h1>
              <input type="text" name="name" value = {name}
                  onChange = {e => onChange(e)}
                  required  />
              <input type="text" name="message"  
              value = {message}
              onChange = {e => onChange(e)}
              required 
              />
              <input type="text" name="created_at"  value = {created_at}
                 onChange = {e => onChange(e)}
                   required />
              <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

import React, {useState, FormEvent} from 'react';
import {useHistory} from 'react-router-dom'
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg'
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';

import './styles.css'
export default function TeacherForm(){
    const history=useHistory()
    const [name, setName]=useState('')
    const [avatar, setAvatar]=useState('')
    const [whatsapp, setWhatsapp]=useState('')
    const [bio, setBio]=useState('')
    const [subject, setSubject]=useState('')
    const [price, setPrice]=useState('')


    const [scheduleItems, setscheduleItems]=useState([
        {
            week_day:0,
            from:'',
            to:''
        }
    ]);
    function addNewScheduleItem(){
        setscheduleItems([
            ...scheduleItems,
            {
                week_day:0,
                from:'',
                to:''
            }
        ])
    }
    function setscheduleItemValue(scheduleItemPosition:number, field:string, value:string){
        const updatedScheduleItems =scheduleItems.map((scheduleItem, index)=>{
            if(index === scheduleItemPosition){
                return {...scheduleItem, [field]:value};
            }
            return scheduleItem;

        });
        setscheduleItems(updatedScheduleItems)
    }
    function createClasses(e: FormEvent){
        e.preventDefault()
        api.post('/classes',{
            name,
            avatar,
            whatsapp,
            bio,
            subject, 
            price:Number(price),
            schedule: scheduleItems 
        }).then(()=>{
            alert('Registered successfuly!');
            history.push('/')
        }).catch(()=>{
            alert('Error in Register!')
        })
        
    }
    return (
        <div id="page-teacher-form" className="container">
           <PageHeader 
           title="That is great that you want to teach."
           description="The first step is to fill up this fields"
           />
           <main>
               <form onSubmit={createClasses}>
               <fieldset>
                    <legend>Your datas</legend>
                    <Input 
                    name="name" 
                    label="Full Name" 
                    value={name} 
                    onChange={(e)=>{setName(e.target.value)}}
                    />
                    <Input 
                    name="avatar" 
                    label="Avatar"
                    value={avatar} 
                    onChange={(e)=>{setAvatar(e.target.value)}}
                    />
                    <Input 
                    name="whatsaap" 
                    label="Whatsapp"
                    value={whatsapp} 
                    onChange={(e)=>{setWhatsapp(e.target.value)}}

                    />
                    <Textarea 
                    name="bio" 
                    label="Biography"
                    value={bio} 
                    onChange={(e)=>{setBio(e.target.value)}}
                    />

               </fieldset>
               <fieldset>
                    <legend>About your lessons</legend>
                    <Select 
                    name="subject" 
                    label="Subject"
                    value={subject} 
                    onChange={(e)=>{setSubject(e.target.value)}}
                    options={[
                        {value: 'MySQL', label:'Mysql'},
                        {value: 'MongoDB', label:'Mongodb'},
                        {value: 'Javascript', label:'Javascript'},
                        {value: 'ReactJs', label:'ReactJS'},
                        {value: 'Git', label:'Git'},
                        {value: 'NodeJS', label:'NodeJS'},

                    ]}
                    />
                    <Input 
                    name="price" 
                    label="Price/Hour"
                    value={price} 
                    onChange={(e)=>{setPrice(e.target.value)}}
                    />

               </fieldset>
               <fieldset>
                   <legend>Time Table Avalueble
                   <button type="button" onClick={addNewScheduleItem}>+ New time table</button>
                   </legend>
                  {scheduleItems.map((scheduleItem, index)=>{
                      return(
                        <div key={scheduleItem.week_day} className="schedule-item">
                   
                        <Select
                            name="week-day" 
                            label="Days of the week"
                            value={scheduleItem.week_day}
                            onChange={e=>setscheduleItemValue(index,'week_day', e.target.value)}
                            options={[
                                {value: '0', label:'Sunday'},
                                {value: '1', label:'Monday'},
                                {value: '2', label:'Tuesday'},
                                {value: '3', label:'Wednesday'},
                                {value: '4', label:'Thursday'},
                                {value: '5', label:'Friday'},
                                {value: '6', label:'Saturday'},
        
                            ]}
                            />
                            <Input 
                            name="from" 
                            label="From" 
                            type="time"
                            value={scheduleItem.from}
                            onChange={e=>setscheduleItemValue(index,'from', e.target.value)}
                            
                            />
                            <Input 
                            name="to" 
                            label="To" 
                            type="time"
                            value={scheduleItem.to}
                            onChange={e=>setscheduleItemValue(index,'to', e.target.value)}
                            
                            />
        
                           </div>
                           
                      )
                  })}
               </fieldset>

               <footer>
                   <p>
                     <img src={warningIcon} alt="Important warning"/> Important!<br/> Fill all the fields please
                   </p>
                   <button type="submit">Save the data</button>
               </footer>
               </form>
           </main>
        </div>
    )
}
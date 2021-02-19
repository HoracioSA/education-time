import React, { useState, FormEvent } from 'react';
import './styles.css'
import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

export default function TeacherList(){
    const [teachers, setTeachers]=useState([])
    const [subject, setSubject ]=useState('')
    const [week_day, setWeek_day ]=useState('')
    const [time, setTime ]=useState('')
   async function searchTeachers (e:FormEvent){
        e.preventDefault()
    const response= await api.get('classes',{
          params:{
              subject,
              week_day,
              time
          }
      });
      setTeachers(response.data)
    }

    return (
        <div id="page-teacher-list" className="container">
           <PageHeader title="Here is the avalueble teachers.">
            
            <form id="search-teachers" onSubmit={searchTeachers}>
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
                <Select
                    name="week-day" 
                    label="Days of the week"
                    value={week_day} 
                    onChange={(e)=>{setWeek_day(e.target.value)}}
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
                type="time" 
                name="time"
                label="Hour"
                value={time} 
                    onChange={(e)=>{setTime(e.target.value)}}
                />
               <button type="submit">Search</button>
                
            </form>
            </PageHeader>
            <main> 
               
                     <TeacherItem />
                     <TeacherItem />
                      <TeacherItem />
                      <TeacherItem />
                      <TeacherItem />
        
                
            </main>
             
        </div>
    )
}
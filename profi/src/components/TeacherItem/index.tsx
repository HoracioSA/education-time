import React from 'react'
import './styles.css'
import whatsappIcon from '../../assets/images/icons/whatsapp.svg'


function TeacherItem (){
    return(
<article className="teacher-item">
                    <header>
                        <img src="https://avatars.githubusercontent.com/u/57060861?s=400&u=058cdc74a39fcc00aa6e9cc1afa8381e67121212&v=4" alt="Avatar"/>
                        <div>
                            <strong>Horacio Sa</strong>
                            <span>Matematica</span>
                        </div>
                    </header>
                            <p>Master in eating some Macdolnalds food and anjoy with frinds</p>
                    <footer>
                        <p>
                            Price per hour: <strong>
                                KZ 8900
                            </strong>
                        </p>
                        <a href="https://wa.me/9009998888.whatsapp" type="button">
                            <img src={whatsappIcon} alt=""/>
                        Contact teacher
                        </a>
                    </footer>
                    
                </article>
    )
}
export default TeacherItem;
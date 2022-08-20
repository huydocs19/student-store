import happy_person from "../../assets/happy_person.svg"
import { Twitter, Instagram, Facebook, Linkedin} from "components"
import "./Contact.css"

export default function Contact() {
  return (
    <div id="Contact" className="contact">
        <div className="content">
            <h3>Contact Us</h3>
            <div className="summary">
                <ul className="info">
                    <li><span className="label">Email:</span><span>code@path.org</span></li>
                    <li><span className="label">Phone:</span><span>1-800-CODEPATH</span></li>
                    <li><span className="label">Address:</span><span>123 Fake Street, San Francisco, CA</span></li>
                    <li>
                        <span>Socials: </span>
                        <span className="socials">
                            <Facebook fill="var(--pure-white)" />
                            <Instagram fill="var(--pure-white)" />
                            <Linkedin fill="var(--pure-white)" />
                            <Twitter fill="var(--pure-white)" />
                        </span>
                    </li>
                </ul>
                <div className="media">
                    <img src={happy_person} alt="codepath large"/>
                </div>
            </div>
        </div>
    </div>
  )
}

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import footer from '../../assets/images/footer.png';
import { AuthContext } from '../../Contexts/AuthContext/AuthProvider';

const Footer = () => {
    const { user } = useContext(AuthContext);
    return (
        <footer className="p-10 bg-neutral text-dark" style={
            {
                background: `url(${footer})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }
        }>
            <div className='footer'>
                <div>
                    <span className="footer-title">Services</span>
                    <Link className="link link-hover">Branding</Link>
                    <Link className="link link-hover">Design</Link>
                    <Link className="link link-hover">Marketing</Link>
                    <Link className="link link-hover">Advertisement</Link>
                </div>
                <div>
                    <span className="footer-title">Company</span>
                    <Link className="link link-hover">About us</Link>
                    <Link className="link link-hover">Contact</Link>
                    <Link className="link link-hover">Jobs</Link>
                    <Link className="link link-hover">Press kit</Link>
                </div>
                <div>
                    <span className="footer-title">Legal</span>
                    <Link className="link link-hover">Terms of use</Link>
                    <Link className="link link-hover">Privacy policy</Link>
                    <Link className="link link-hover">Cookie policy</Link>
                    <Link className="link link-hover">{user?.email}</Link>
                </div>
            </div>
            <div>
                <p className='text-center pt-10'>Copyright © 2022 - All right reserved by Kaiser Tanveer</p>
            </div>
        </footer>
    );
};

export default Footer;
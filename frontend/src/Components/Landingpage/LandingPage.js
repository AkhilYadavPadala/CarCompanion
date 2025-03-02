import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const LandingPage = () => {
    const carBannerUrl = 'https://empiremotorworld.com.my/wp-content/uploads/2017/10/car-banner1.jpg';
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({ duration: 1000 }); // Initialize AOS with a duration of 1000ms
    }, []);

    const handleGetStarted = () => {
        navigate('/signup');
    };

    const styles = {
        body: {
            margin: 0,
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#000',
            color: '#fff'
        },
        header: {
            textAlign: 'center',
            padding: '100px 20px',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: '#fff',
            position: 'relative',
            backgroundImage: `url(${carBannerUrl})`
        },
        headerBefore: {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
            zIndex: 1
        },
        headerText: {
            position: 'relative',
            zIndex: 2,
            margin: 0,
            fontSize: '4em'
        },
        headerH1: {
            fontSize: '4.5em',
            textShadow: '3px 3px 6px rgba(0, 0, 0, 0.8)'
        },
        headerP: {
            fontSize: '2em',
            margin: '20px 0',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
        },
        button: {
            backgroundColor: '#f00',
            color: '#fff',
            padding: '15px 30px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1em',
            margin: '20px 0',
            position: 'relative',
            zIndex: 2,
            borderRadius: '10px'
        },
        buttonHover: {
            backgroundColor: '#c00'
        },
        section: {
            padding: '50px 20px',
            textAlign: 'center'
        },
        h2: {
            fontSize: '2.5em',
            marginBottom: '20px'
        },
        featureCards: {
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap'
        },
        card: {
            background: '#222',
            padding: '20px',
            borderRadius: '10px',
            width: '300px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
        },
        cardH3: {
            fontSize: '1.5em',
            marginBottom: '10px'
        },
        cardP: {
            fontSize: '1em',
            lineHeight: '1.6'
        },
        testimonialsCardP: {
            fontSize: '1.2em',
            fontStyle: 'italic'
        },
        testimonialsCardH4: {
            fontSize: '1em',
            marginTop: '10px',
            color: '#f00'
        },
        footer: {
            background: '#111',
            padding: '20px',
            textAlign: 'center'
        },
        footerP: {
            margin: 0,
            fontSize: '0.9em'
        }
    };

    return (
        <div style={styles.body}>
            <header style={styles.header}>
                <div style={styles.headerBefore}></div>
                <h1 style={{ ...styles.headerText, ...styles.headerH1 }} data-aos="fade-down">Car Companion</h1>
                <p style={{ ...styles.headerText, ...styles.headerP }} data-aos="fade-up">Transforming Car Manual Interactions with AI</p>
                <button
                    style={styles.button}
                    data-aos="zoom-in"
                    onClick={handleGetStarted}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                >
                    Get Started
                </button>
            </header>

            <section style={styles.section} data-aos="fade-up">
                <h2 style={styles.h2}>Features</h2>
                <div style={styles.featureCards}>
                    <div style={styles.card} data-aos="fade-up" data-aos-delay="100">
                        <h3 style={styles.cardH3}>AI-Driven Assistance</h3>
                        <p style={styles.cardP}>Get detailed information and guidance about your car using our AI-driven assistant.</p>
                    </div>
                    <div style={styles.card} data-aos="fade-up" data-aos-delay="200">
                        <h3 style={styles.cardH3}>Image and Text Extraction</h3>
                        <p style={styles.cardP}>Extract and interpret images, tables, and text from car manuals for quick answers.</p>
                    </div>
                    <div style={styles.card} data-aos="fade-up" data-aos-delay="300">
                        <h3 style={styles.cardH3}>Intelligent Query Handling</h3>
                        <p style={styles.cardP}>Ask any question and receive the most relevant information instantly.</p>
                    </div>
                </div>
            </section>

            <section style={styles.section} data-aos="fade-up">
                <h2 style={styles.h2}>About Us</h2>
                <p>
                    CarCompanion is your ultimate assistant for all car-related queries. Our AI-driven virtual assistant provides you with detailed information about your car, including user manuals, maintenance schedules, and more. Whether you're a new car owner or a seasoned driver, CarCompanion is here to help you every step of the way.
                </p>
            </section>

            <footer style={styles.footer}>
                <p style={styles.footerP}>&copy; 2024 Car Companion. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;

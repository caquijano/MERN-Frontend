import React from 'react'

const Footer = () => {
    return (
        <footer className="container">
            <p className="float-right"><a href="https://www.facebook.com/">Subir</a></p>
            <p>&copy; {(new Date().getFullYear())} Mi Proyecto, Inc. &middot; <a href="https://www.facebook.com/">Política de Privacidad</a> &middot; <a href="https://www.facebook.com/">Términos</a></p>
        </footer>
    )
}

export default Footer

import React from "react"

const Footer = () =>
    <footer>
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            margin: `0 auto`,
            padding: `0.5rem 1.0875rem 0.5rem`}}>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
            }}>
                <div>
                    © {new Date().getFullYear()} Santosh Dahal
                </div>
                <div>
                    Built with{` `}
                    <a href="https://www.gatsbyjs.org">Gatsby</a>
                </div>
            </div>

            <div>
                <a href="https://github.com/santoshdahal12/howsthere.com">GitHub</a>
                <span> / </span>
                <a href="https://www.linkedin.com/in/santosh-dahal/">LinkedIn</a>
            </div>
        </div>
    </footer>

export default Footer;
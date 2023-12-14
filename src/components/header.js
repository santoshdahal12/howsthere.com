import { Link, useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { GatsbyImage } from "gatsby-plugin-image";

const Header = ({ siteTitle }) => {
  const data = useStaticQuery(graphql`{
  placeholderImage: file(relativePath: {eq: "howsthere-icon.png"}) {
    childImageSharp {
      gatsbyImageData(width: 200, layout: CONSTRAINED)
    }
  }
}`);
  return (
    <header
      style={{
        background: `transparent`,
        marginBottom: `1rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          backgroundColor:`white`,
          padding: `0.5rem 1.0875rem 0.5rem`,
          display: 'flex',
          flexDirection: 'row',
          alignItems:'center'
        }}
      >
        <div style={{
          width:50,
          height:50,
        }}>
          <GatsbyImage image={data.placeholderImage.childImageSharp.gatsbyImageData} />
        </div>
        <div style={{paddingLeft:`0.5em`}}>
          <h2 style={{ margin: 0 }}>
            <Link
              to="/"
              style={{
                color: `#000`,
                textDecoration: `none`,
                fontStyle: 'italic'
              }}
            >
              {siteTitle}
            </Link>
          </h2>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

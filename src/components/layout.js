/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from './footer';

import "./layout.css"

const layoutType= {
  BLOG_POST:"BLOG_POST",
  MAIN_PAGE:"MAIN_PAGE"
};

const Layout = ({ children, type }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: type===layoutType.BLOG_POST? 960: 700,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        
      </div>
      <Footer/>
    </>
  )
}



Layout.Type = layoutType;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string
}

Layout.defaultProps = {
  children: PropTypes.node.isRequired,
  type: layoutType.BLOG_POST
}

export default Layout

import React, { Fragment } from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import './index.css'

const IndexPage = ({ data }) => {
  const { edges } = data.allMarkdownRemark;
  return (
    <Layout type={Layout.Type.MAIN_PAGE}>
      <SEO title="Home" />
      <div style={{
        // maxWidth: `100`,
        marginBottom: `2rem`, display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        // width:"20%"
      }}>
        {/* <ProfileImage /> */}
        Welcome to the how'sthere blog. This blog is open for any suggestion. I will use this blog to post whatever I learn in my daily life. The post can be related to technologies. However, in near future I am going to restructure and rewrite this blog so that anyone can post their stories here. 
      </div>
      {
        edges.map(
          edge => {
            const { frontmatter, timeToRead } = edge.node;
            const { featuredImgAlt, featuredImage, featuredImgSrc, excerpt } = frontmatter;
            const featuredImgFluid = featuredImage.childImageSharp.fluid;
            return (
              <div
                key={frontmatter.path} className="card">
                <Fragment>
                  <Link to={frontmatter.path} className="subnav_link">
                    <h2 style={{ marginBottom: 0 }}>{frontmatter.title}</h2>
                  </Link>
                  <div className="blog-runner">
                    <small>{frontmatter.date}&nbsp;.&nbsp;{timeToRead} min read</small>
                  </div>
                  <Img fluid={featuredImgFluid} alt={featuredImgAlt} />
                  <p className="featured-image-runner" dangerouslySetInnerHTML={{ __html: featuredImgSrc }} />
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <div>
                      {excerpt}
                    </div>
                    <div>
                      <Link to={frontmatter.path} >
                        Readmore...
                      </Link>
                    </div>

                  </div>

                </Fragment>
              </div>
            )
          }
        )
      }
    </Layout >
  );
}

export const query = graphql`
query MyQuery {
  allMarkdownRemark(sort:{order:DESC,fields:[frontmatter___date]}) {
    edges {
      node {
        timeToRead
        frontmatter {
          excerpt
          title
          path
          date(formatString: "MMMM Do, YYYY")
          tags
          featuredImage {
            childImageSharp {
              fluid(maxWidth: 400) {
                ...GatsbyImageSharpFluid
              }
            }
        }
        featuredImgAlt
        featuredImgSrc
        }
      }
    }
  }
}
`

export default IndexPage

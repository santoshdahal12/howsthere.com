import React from 'react';
import { graphql } from 'gatsby';
import Img from "gatsby-image"
import Layout from '../components/layout';

const Template = ({ data }) => {
    const { markdownRemark } = data
    const { frontmatter } = markdownRemark;
    const { title, date, featuredImgAlt, featuredImage, featuredImgSrc } = frontmatter;
    const readingTimeText = markdownRemark.fields.readingTime.text;
    const featuredImgFluid = featuredImage.childImageSharp.fluid;

    return (
        <Layout>
            <div>
                <h1 style={{ marginBottom: 0 }}>{title}</h1>
                <div className="blog-runner">
                    <small>{date}&nbsp;.&nbsp;{readingTimeText}</small>
                </div>
                <Img fluid={featuredImgFluid} alt={featuredImgAlt} />
                <p className="featured-image-runner" dangerouslySetInnerHTML={{ __html: featuredImgSrc }} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
        </Layout>
    )
}


export const query = graphql`
    query ($pathSlug:String!){
            markdownRemark(frontmatter: {path: {eq: $pathSlug }}){
                html
                excerpt(pruneLength: 200)
                frontmatter {
                    title
                    date(formatString: "MMMM Do, YYYY")
                    featuredImage {
                        childImageSharp {
                          fluid(maxWidth: 800) {
                            ...GatsbyImageSharpFluid
                          }
                        }
                    }
                    featuredImgAlt
                    featuredImgSrc
                }
            fields {
                readingTime {
                text
                }
            }
        }
    }
    `
export default Template
import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import Layout from '../components/layout';
import SEO from "../components/seo"
import { DiscussionEmbed } from "disqus-react"



const Template = ({ data }) => {
    const { markdownRemark } = data
    const { frontmatter, excerpt } = markdownRemark;
    const { title, date, featuredImgAlt, featuredImage, featuredImgSrc, keyWords } = frontmatter;
    const featuredImgFluid = featuredImage.childImageSharp.gatsbyImageData;

    const disqusConfig = {
        shortname: process.env.GATSBY_DISQUS_NAME,
        config: { identifier: frontmatter.path, title },
      }
    return (
        <Layout>
            <SEO 
            title={title}
            description={frontmatter.description || excerpt }
            image={featuredImgFluid}
            keyWords={keyWords}
            // to-do: link rel="canonical"
            // reference: https://www.gatsbyjs.org/tutorial/seo-and-social-sharing-cards-tutorial/
            // pathname={this.props.location.pathname}
            />
            <div>
                <h1 style={{ marginBottom: 0 }}>{title}</h1>
            <GatsbyImage image={featuredImgFluid} alt={featuredImgAlt} />
            <p className="featured-image-runner" dangerouslySetInnerHTML={{ __html: featuredImgSrc }} />
            </div>
        <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
        <DiscussionEmbed {...disqusConfig} />
        </Layout >
    );
}


export const query = graphql`query ($pathSlug: String!) {
  markdownRemark(frontmatter: {path: {eq: $pathSlug}}) {
    html
    excerpt(pruneLength: 200)
    frontmatter {
      path
      title
      date(formatString: "MMMM Do, YYYY")
      featuredImage {
        childImageSharp {
          gatsbyImageData(width: 800, layout: CONSTRAINED)
        }
      }
      featuredImgAlt
      featuredImgSrc
      keyWords
    }
  }
}`
export default Template
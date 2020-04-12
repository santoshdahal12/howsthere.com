const path = require('path')

exports.createPages = (({graphql, actions})=>{
    const {createPage} = actions;
    return new Promise((res, rej)=>{
        const blogTemplate = path.resolve('src/templates/blogPost.js')
        res(
            graphql(`
            query MyQuery {
                allMarkdownRemark {
                  edges {
                    node {
                      frontmatter {
                        path
                      }
                    }
                  }
                }
              }
            `).then(result=>{
                result.data.allMarkdownRemark
                .edges.forEach(({node}) => {
                    const {path} = node.frontmatter
                    createPage({
                        path,
                        component:blogTemplate,
                        context:{
                            pathSlug:path
                        }
                    })
                    res()
                });
            })
        )
    })
});

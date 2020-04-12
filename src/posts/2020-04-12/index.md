---
path: "/first-post"
date: "2020-04-13"
title: "How did I built this website?"
featuredImage: children.jpg
featuredImgAlt: Children playing in river with joy
featuredImgSrc: |
    Image by <a href="https://pixabay.com/users/sasint-3639875/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1822704">Sasin Tipchai</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1822704">Pixabay</a>
tags: ['Software']
keyWords: ['Gatsby', 'GraphQL', 'Netlify', 'Static Website', 'Blog', 'Blogging']
excerpt: "Gatsby, GarphQL and NetliFy makes building a static website easy and fun."
---

Sometimes we feel like to build our own blogs. There are many fancy blogging platforms already available. Choosing one of them might be a great and easy idea for someone who is not in software development field. But, hey, being a developer, don't we always feel great building our own things, play with it, customize it, deploy it in our ease. If u feel the same, lets start doing it.

#### What tools/services I used to build this webiste?
- **[GoDaddy](https://www.godaddy.com/)** : Its a popular domain registration platform. *www.howsthere.com* is registered there.
- **[Gatsby](https://www.gatsbyjs.org/)** : I built and deploy this website with $0 cost other than the domain name purchase. I built this website using Gatsby. It is a free and open source framework based on [React](https://reactjs.org/) that helps developers like us to build websites amazingly fast. It has many plugin availables that lets you build sites with the data you want — from one or many sources: Pull data from headless CMSs, SaaS services, APIs, databases, your file system, and more directly into your pages using [GraphQL](https://graphql.org/). 
- **[Netlify](https://www.netlify.com/)** : Later I deployed this website making it publicly available using [Netlify](https://www.netlify.com/). Netlify's free tier service gives following which is sufficient for any blogger.
    - free for  one team member
    - continuous deployment upto 300 build minutes/month. 
    - simple integration with any version control like Bitbucket, GitHub etc.
    - free HTTPS on all sites, including automatic certificate creation and renewal. Why HTTPS is essential is separate topic of discussion but other than security reasons, we definitely want HTTPS as Google prioritize sites with HTTPS enabled in its search result. 

    You can check the [pricing](https://www.netlify.com/pricing/). You can choose any CI/CD tool and services like [AWS S3](https://aws.amazon.com/s3/) or CDNs like [AWS Cloufront](https://aws.amazon.com/cloudfront/), [Cloudfare](https://www.cloudflare.com/) etc. 

- **[Github](https://github.com/)**: I have made the repository for this website public. You can check the whole source clicking [here](https://github.com/santoshdahal12/howsthere.com).

#### Prerequisites

You must already know at least following things to some extent:

- **React**
- **[ES6](/es6-syntax-and-feature-overview/) syntax**
- **[npm](https://www.npmjs.com/)**
- **Genral familiarity of Markdown Syntax**: You might already have written README.md files for your application or libraries. We will be using md files as source of data for Gatsby. You can look at this [cheetsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for general usage. Also, you can go to github repository of this website and click on Edit for any md files to see the usage.    
- **Little [GraphQL](https://graphql.org/) is required**:  Gatsby uses GraphQL to query data. A very surfacial knowledge is sufficient about how we query data is suffifcient.  

##### What we will do
- Build a website locally. I will be talking about data pulling from markdown, creating pages, applying theme, SEO etc. in next blog.  
- Deploy and host it in Netlify

## Get Started

Its very important to check what versions of packages/tools we have. While writing this blog on April 11, 2020, I have the following package-versions
- Node 11.2.0
- npm 6.14.4
- gatsby 2.19.7
- gatsby-cli 2.11.7

##### Make sure you have Node 
By this time you should have Node.js installed. npm comes along with Node.js. To check, open terminal and run the following command: 

```bash
node -v &&  npm -v
```
If the above command does not give versions, follow this [link](https://www.npmjs.com/get-npm) for installations.

##### Install Gatsby and create project
Enter the following command to install gatsby-cli globally.

```bash
npm install -g gatsby-cli
```

##### Create project
Lest create a project with gatsby called myproject.
```bash
gatsby new myproject
```

This creates a Gatsby project with all the boilerplates required for static websites. This should give you the following message at the end of process.
```
Your new Gatsby site has been successfully bootstrapped. Start developing it by running:
cd myproject
gatsby develop
```

Let's follow the step as said in the above message. Once you cd into the folder and run gatsby develop it will run the build and spin up dev server at port 8000 by default. You can see default page by going to localhost:8000/. At the same time you can also see GraphQL explorer running at localhost:8000/___graphql. Go into 

In the next blog post, we will talk about reading content from markdown files, build different pages, applying themes and different plugins related to SEO.

##### Deploy to Netlify
First push you code to github repository.  Now go to [Netlify](https://www.netlify.com/) and click on **Get started for free**. Signup with GitHub or you may choose other options. It will ask you to sign in with github creds. Next steps are as follows: 

 - Click on **new site from Git**.
 - to link to your repository, in next screen click on **GitHub**
 - Now you need to Authorize Netlify . Click on **Authorize Application** so that Netlify and GitHub agree to talk to each other. 
 - Choose your repo from the list you will see. 
 - Now next step you can configure different settings to choose which branch you want to build. 
 - Click on deploy to finally deploy your application.
 - You can play with Domain management to provide the custom domains and enable HTTPS.

 ##### Final note
 Hope you have successfully deployed and hosted your first website by this time. Though it is nothing, but you already have created a basic structure for your blog. Next blog will be more interesting. We have not seen how we can simply write markdown files and pages will be built automatically for us. We will look how we can apply different gatsby plugins, themes, images etc. 
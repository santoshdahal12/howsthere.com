---
path: "/updating-to-latest-versions"
date: "2023-12-14"
title: "gatsby version upgrade for this website??"
featuredImage: trail-starts-here.jpg
featuredImgAlt: "Second step in staircase"
featuredImgSrc: |
    Photo by <a href="https://www.freeimages.com/photographer/kristajo-40637">Krista Johanson</a> from <a href="https://freeimages.com">FreeImages</a>
keyWords: ['Gatsby', 'React', 'Frontend']
tags: ['Software', 'Node']
excerpt: "Thought of adding one page to this blog, had to upgrade entire dependencies."
---

This website just had 1 page about how I build this blog post using `gatsby`plugin, `ReactJs` and some integrations with `SEO`, `Netlify`, `Disqus`. This was was created I had some day off and I was switching from Mobile and Micro-front-end team to Data platform team. I thought I will still do some front-end work even when I focus in tools and cloud infrastructure.I build it in a way that I would have to only write only markdown file. However, lot of things have changed in 3 years.

1. My local Node in Mac is v20.6.1. Before it was possibly 8.x.x
2. React now is 18.x.x. Before it was 16.x.x
3. Gatsby itself have evolved. Lots of plugin are deprecated and not supported anymore. My first attempt was, lets just use `npm ci`. It failed complaining Node versions issues, some react dependencies mismatch etc.

So troubleshoot: First I created another local website with latest gatsby version, checked the package.json file and started upgrading all the versions. There were many plugins that were deprecated. 

In the last 3 years, beside regular software development, I have started working in Cloud, DevOps, Automations, Monitoring and Alert Management , various aspects of Software Supply Chains like Vulnerability Management, OpenSource Software License Management etc. Thus, I will continue adding new posts related to various aspects   

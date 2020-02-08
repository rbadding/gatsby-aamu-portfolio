import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from "../components/layout"

const About = ({ data }) => (
  <Layout>
    <article className="sheet">
      <div className="sheet__inner">
        <h1 className="sheet__title">{data.aamu.Pages.title}</h1>
        <p className="sheet__lead">{data.aamu.Pages.subtitle}</p>
        <div className="sheet__gallery">
          <Img fluid={data.aamu.Pages.photo.image.childImageSharp.fluid} />
        </div>
        <div
          className="sheet__body"
          dangerouslySetInnerHTML={{
            __html: data.aamu.Pages.text,
          }}
        />
      </div>
    </article>
  </Layout>
)

export default About

export const query = graphql`
  query AboutQuery {
    aamu {
      Pages(title: "About me") {
        title
        subtitle
        photo {
          url
          image {
            childImageSharp {
              id
              fluid {
                base64
                tracedSVG
                srcWebp
                srcSetWebp
                originalImg
                originalName
                presentationWidth
                presentationHeight
                aspectRatio
                src
                srcSet
                sizes
              }
            }
          }
        }
        text
      }
    }
  }
`

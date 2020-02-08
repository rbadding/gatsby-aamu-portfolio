import React from 'react'
import Slider from 'react-slick'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import Layout from "../components/layout"

export default ({data}) => (<Layout>
    <article className="sheet">
      <div className="sheet__inner">
        <h1 className="sheet__title">{data.aamu.Work.title}</h1>
        <p className="sheet__lead">{data.aamu.Work.excerpt}</p>
        <div className="sheet__slider">
          <Slider infinite={true} slidesToShow={2} arrows>
            {data.aamu.Work.gallery.map(({image}) => (
              <Img key={image.childImageSharp.id} alt="moi" fluid={image.childImageSharp.fluid} />
            ))}
          </Slider>
        </div>
        <div
          className="sheet__body"
          dangerouslySetInnerHTML={{
            __html: data.aamu.Work.description,
          }}
        />
        <div className="sheet__gallery">
          <Img alt="moi" fluid={data.aamu.Work.coverImage.image.childImageSharp.fluid} />
        </div>
      </div>
    </article>
  </Layout>
)

export const query = graphql`
  query WorkQuery($slug: String) {
      aamu {
      Work(slug: $slug) {
        title
        excerpt
        gallery {
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
        description
        coverImage {
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
      }
    }
  }
`
// export const query2 = graphql`
//   query WorkQuery($slug: String!) {
//     Work(slug: $slug) {
//       title
//       excerpt
//       gallery {
//         fluid(maxWidth: 200, imgixParams: { fm: "jpg", auto: "compress" }) {
//           src
//         }
//       }
//       description
//       coverImage {
//         url
//         fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
//           ...GatsbyDatoCmsSizes
//         }
//       }
//     }
//   }
// `

import React from 'react'
import { Link, graphql } from 'gatsby'
import Masonry from 'react-masonry-component'
import Img from 'gatsby-image'
import Layout from "../components/layout"

const IndexPage = ({data}) => (
  <Layout>
    <Masonry className="showcase">
      {data.aamu.WorkCollection.map(( work ) => {
        return (
        <div key={work.id} className="showcase__item">
          <figure className="card">
            <Link to={`/work/${work.slug}`} className="card__image">
              <Img fluid={work.coverImage.image.childImageSharp.fluid} />
            </Link>
            <figcaption className="card__caption">
              <h6 className="card__title">
                <Link to={`/work/${work.slug}`}>{work.title}</Link>
              </h6>
              <div className="card__description">
                <p>{work.excerpt}</p>
              </div>
            </figcaption>
          </figure>
        </div>
      )}
      )}
    </Masonry>
  </Layout>)

export default IndexPage

export const query = graphql`
  query IndexQuery {
    aamu {
      WorkCollection(sort: { created: DESC }) {
        id
        title
        slug
        excerpt
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
      }
    }
  }
`

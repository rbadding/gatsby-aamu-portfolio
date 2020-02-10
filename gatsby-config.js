require('dotenv').config();
const AAMU_HOST = 'https://api.aamu.app/api/v1/graphql/';

module.exports = {
  siteMetadata: {
    title: 'Gatsby Aamu.app starter',
  },
  pathPrefix: '/gatsby-contentful-starter',
  plugins: [
    `gatsby-plugin-sass`,
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/public/static`,
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        fieldName: `aamu`,
        typeName: `Aamu`,
        url: AAMU_HOST,
        headers: {
          "x-api-key": process.env.AAMU_API_KEY
        },
      }
    }
  ],
}

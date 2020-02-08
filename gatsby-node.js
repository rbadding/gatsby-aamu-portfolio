const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const remark = require('remark')
const remark_html = require('remark-html')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    graphql(`
      {
        aamu {
          WorkCollection {
            slug
          }
        }
      }
    `).then(result => {

      if (!result.data && result.errors) {
        throw result;
      }

      result.data.aamu.WorkCollection.map((work) => {
        createPage({
          path: `work/${work.slug}`,
          component: path.resolve(`./src/templates/work.js`),
          context: {
            slug: work.slug,
          },
        })
      })
      resolve()
    })
    .catch(error => {
      console.log(error);
      process.exit();
    });
  })
}

exports.createResolvers = (
  {
    actions,
    cache,
    createNodeId,
    createResolvers,
    store,
    reporter,
  },
) => {
  const { createNode } = actions;

  createResolvers({

    // Turn Aamu_BlogPost.body into html
    Aamu_Work: {
      description: {
        type: 'String',
        resolve(source, args, context, info) {
          const file = remark()
            .use(remark_html)
            .processSync(source.body);

          return String(file);
        }
      }
    },

    Aamu_Pages: {
      bio: {
        type: 'String',
        resolve(source, args, context, info) {
          const file = remark()
            .use(remark_html)
            .processSync(source.body);

          return String(file);
        }
      }
    },

    // Handle images
    Aamu_GraphQLMediaItem: {
      image: {
        type: `File`,
        resolve(source, args, context, info) {
          return createRemoteFileNode({
            url: source.url,
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
      gallery: {
        type: `[File]`,
        resolve(source, args, context, info) {
          const res = source.gallery && source.gallery.map(el => {
            return createRemoteFileNode({
              url: el.url,
              store,
              cache,
              createNode,
              createNodeId,
              reporter,
            });
          }) || [];

          return res;
        },
      },
    },

  })
}

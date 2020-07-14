import React from "react"
import { graphql } from "gatsby"

import ReactMarkdown from "react-markdown"
import Moment from "react-moment"

import Layout from "../components/layout"
import Seo from "../components/seo"


export const query = graphql`
  query ArticleQuery($slug: String!) {
    strapiArticle(slug: { eq: $slug }) {
      strapiId
      title
      content
      publishedAt
      Seo {
        metaDescription
        metaTitle
        shareImage {
          media {
            formats {
              medium {
                url
              }
            }
          }
        }
      }
      Image {
        media {
          url
        }
      }
      childStrapiArticleContent {
        childMdx {
          body
        }
      }
    }
  }
`

const Article = ({ data }) => {
  const article = data.strapiArticle
  return (
    <Layout>
    <Seo
          title={article.Seo.metaTitle}
          description={article.Seo.metaDescription}
          image={article.Seo.shareImage.media.formats.medium.url}
        />
      <div>
        <div
          id="banner"
          className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
          data-src={article.Image.media.url}
          data-srcset={article.Image.media.url}
          data-uk-img
        >
          <h1>{article.title}</h1>
        </div>

        <div className="uk-section">
          <div className="uk-container uk-container-small">
            <ReactMarkdown source={article.content} />
            <p>
              <Moment format="MMM Do YYYY">{article.published_at}</Moment>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Article

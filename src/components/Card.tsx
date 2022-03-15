import { useEffect, useState } from 'react'
import { getLinkPreview } from 'link-preview-js'

type VideosProps = {
  url: string | undefined,
  secureUrl: string | null | undefined,
  type: string | null | undefined,
  width: string | undefined,
  height: string | undefined,
}

type CardProps = {
  url: string,
  title: string,
  siteName: string | undefined,
  description: string | undefined,
  mediaType: string,
  contentType: string | undefined,
  images: string[],
  videos: VideosProps[],
  favicons: string[],
}

type Props = {
  linkUrl: string,
}

export const Card = ({ linkUrl }: Props) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<CardProps>()

  const getPreview = async () => {
    setLoading(true)
    try {
      const response: any = await getLinkPreview(linkUrl)
      setData(response)

    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getPreview()
  }, [])

  return (
    <>
      {
        loading
          ? (
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card" aria-hidden="true">
                <span className="placeholder placeholder-sm" style={{ height: 154 }} />
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-3" style={{ width: 32, height: 32 }}>
                      <span className="placeholder" style={{ width: 32, height: 32 }} />
                    </div>
                    <div className="w-75">
                      <h5 className="card-title mb-0 placeholder-glow">
                        <span className="placeholder col-9 placeholder-sm" />
                      </h5>
                      <div className="block">
                        <p className="card-text placeholder-glow">
                          <span className="placeholder col-12 placeholder-xs" />
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-7" />
                    <span className="placeholder col-4" />
                    <span className="placeholder col-4" />
                    <span className="placeholder col-6" />
                    <span className="placeholder col-8" />
                  </p>
                </div>
              </div>
            </div>
          ) : (
            data && (
              <div className="col-12 col-md-6 col-lg-4">
                <div className="card shadow rounded mb-3">
                  <img className="card-img-top" src={data?.images[0]} alt={data?.title} />
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <div className="me-3" style={{ width: 32, height: 32 }}>
                        <img className="card-img-top" src={data?.favicons[0]} alt={data?.title} />
                      </div>
                      <div className="w-auto">
                        <h5 className="card-title mb-0">{data.title}</h5>
                        <div className="block">
                          <a href={data.url} target="_blank" className="card-text fs-6 text-muted">
                            <small>{data.url}</small>
                          </a>
                        </div>
                      </div>
                    </div>
                    <small className="card-text text-muted">{data?.description}</small>
                  </div>
                </div>
              </div>
            )
        )
      }
    </>
  )
}

import { Card } from './components/Card'
import { sites } from './sites'

export const App = () => (
  <>
    <div className="p-3 mb-4 bg-dark text-white">
      <div className="container-fluid container-xxl py-5">
        <h1 className="display-5 fw-bold">Nossos portfolios</h1>
        <p className="col-md-8 fs-4">Abaixo os sites dos devs da sumemo</p>
      </div>
    </div>
    <div className="container-fluid container-xxl">
      <div className="row">
        {
          sites?.map((site) => (
            <Card key={site} linkUrl={site}  />
          ))
        }
      </div>
    </div>
  </>
)
